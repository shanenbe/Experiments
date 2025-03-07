import {
    do_random_array_sort,
    random_array_element, random_array_element_and_remove,
    random_array_elements_without_repetitions,
    random_integer_up_to_excluding,
    random_lower_case_letter_except,
    random_upper_case_letter_except,
    SET_SEED
} from "../../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import {repeat, repeat_, repeat_n_times} from "../../../N-of-1-Experimentation/modules/utils/loops/loop.js";
import {
    integer_partitions_of_fix_length,
    integer_partitions_of_fix_length_with_constraint
} from "../../../N-of-1-Experimentation/modules/numeric/integer_partition.js";
import {RefObject} from "../../../N-of-1-Experimentation/modules/utils/Utils.js";

let number_of_projections = 2;
let DEBUG_ERROR = false;
export function set_DEBUG_ERROR(b) {
    DEBUG_ERROR = b;
}

export function set_number_of_projections(n: number) {
    number_of_projections = n;
}

export function generate_query(tables: Table[], forbidden_names:string[], number_of_subqueries: number):Query_with_Explicit_Projections {
    if(number_of_subqueries==1) {
        return new Single_Table_Query(random_array_element_and_remove(tables), number_of_projections)
    } else {
        let left_name = random_upper_case_letter_except(forbidden_names);
        forbidden_names.push(left_name);

        let right_name = random_upper_case_letter_except(forbidden_names);
        forbidden_names.push(right_name);

        let partitions = random_array_element(integer_partitions_of_fix_length_with_constraint(number_of_subqueries, 2, a_number => a_number >= 1));

        let left_from   =   new Subquery(left_name, generate_query(tables, forbidden_names, partitions[0]));
        let right_from  =   new Subquery(right_name, generate_query(tables, forbidden_names, partitions[1]));


        let ret         =   new Join_On_Query(left_from, right_from);
        ret.init_position_with      (   new RefObject(0)    );
        ret.init_position_subquery  (   new RefObject(0)    );

        return ret;
    }
}


export function generate_tables(number_of_tables: number, number_of_attributes: number): Table[] {

    let tables:Table[] = [];
    repeat_(number_of_tables)._times(
        () => tables.push(generate_table(tables.map(t=>t.name), number_of_attributes))
    );
    return tables;
}


class Table {
    name:string;
    attributes: string[];

    constructor(name: string, attributes: string[]) {
        this.name = name;
        this.attributes = attributes;
    }

    random_qualified_attribute_string(): string {
        return this.name + "." + random_array_element(this.attributes);
    }

    random_qualified_attribute_strings_without_repetition(number_of_attributes: number): string[] {
        let atts = this.random_attribute_strings_without_repetition(number_of_attributes);
        return atts.map(e=> this.name + "." + e);
    }

    random_attribute_strings_without_repetition(number_of_attributes: number): string[] {
        let atts = random_array_elements_without_repetitions(this.attributes, number_of_attributes);
        return atts;
    }


}


abstract class Query {

    position_subquery: number;
    position_with: number;

    abstract random_attribute_strings(num: number):string[];
    abstract write_into_array_with_subqueries(arr, indentation_depth);
    abstract collect_sub_queries(subqueries: Subquery[]);
    abstract accessible_field_names():string[];

    query_string_with_subqueries() {
        let ret = [];
        this.write_into_array_with_subqueries(ret, 0);
        return ret.join("");
    }

    inject_error(target_line:number, notation: string) {}

    abstract init_position_with(current_position: RefObject<number>);

    abstract init_position_subquery(counter: RefObject<number>);

    query_string_with_WITH():string {
        let arr:string[] = [];
        let subqueries: Subquery[] = [];
        this.collect_sub_queries(subqueries);
        this.write_subqueries(arr, subqueries);
        this.write_main_query_for_with(arr);

        return arr.join("");
    }

    private write_subqueries(arr:string[], subqueries: Subquery[]) {
        let is_first = true;
        arr.push("WITH ");
        for(let subquerie of subqueries) {
            if(!is_first) {
                arr.push("\n" + " ".repeat(10) + "),\n" + " ".repeat(5));
            }
            is_first = false;
            arr.push(subquerie.name + " AS (\n");
            subquerie.query.write_into_with(arr, 12 );
        }
        arr.push("\n" + " ".repeat(10) + "),\n");

    }

    abstract write_main_query_for_with(arr: string[]);
}

class Subquery extends Query {
    accessible_field_names(): string[] {
        return this.query.accessible_field_names().map(e => this.name + "." + e[e.length-1]);
    }

    init_position_with(current_position: RefObject<number>) {
        this.query.init_position_with(current_position);
    }

    name:string;
    query: Query_with_Explicit_Projections;

    init_position_subquery(counter: RefObject<number>)  {
        this.query.init_position_subquery(counter);
    }

    inject_error(target_line:number, notation: string):void {
        this.query.inject_error(target_line, notation);
    }


    constructor(name: string, query: Query_with_Explicit_Projections) {
        super();
        this.name = name;
        this.query = query;
    }

    random_attribute_strings(num: number) {
        return this.query.random_attribute_strings(num).map(e => this.name + "." + e);
    }

    write_into_array_with_subqueries(arr:string[], indentation_depth:number) {
        arr.push("(\n");
        this.query.write_into_array_with_subqueries(arr, indentation_depth + 4);
        arr.push(" ".repeat(indentation_depth));
        arr.push(") " + this.name + "\n");
    }

    collect_sub_queries(arr: Subquery[]) {
        this.query.collect_sub_queries(arr);
        arr.push(this);
    }

    write_main_query_for_with(arr: string[]) {
        throw "should never be called";
    }

}

class Projection {
    qualified_string: string;
    rename: string;

    constructor(qualified_string: string, rename: string) {
        this.qualified_string = qualified_string;
        this.rename = rename;
    }
}

abstract class Query_with_Explicit_Projections extends Query {
    explicit_projections: Projection[];

    constructor(projections: string[]) {
        super();
        this.explicit_projections = this.create_projections(projections);
    }

    write_into_array_with_subqueries(arr:string[], indentation_depth:number) {
        arr.push(" ".repeat(indentation_depth));
        arr.push("SELECT ");
        arr.push(this.explicit_projections.map(e => e.qualified_string + " AS " + e.rename).join(", ") + "\n");
    }

    create_projections(qualified_strings: string[]): Projection[] {
        let forbidden_names = [];
        let new_projections: Projection[] = [];
        for(let qualified_string of qualified_strings) {
            let new_name = random_lower_case_letter_except(forbidden_names);
            forbidden_names.push(new_name);
            new_projections.push(new Projection(qualified_string, new_name));
        }
        return new_projections;
    }

    abstract write_into_with(arr: string[], length: number);

    inject_error_into_selection():void {
        throw "'inject_error_into_selection' not implemented";
    }
}

class Single_Table_Query extends Query_with_Explicit_Projections {
    accessible_field_names(): string[] {
        return this.explicit_projections.map(e=>this.from.name + "." +  e.rename);
    }

    inject_error(target_line: number, notation: string):void {
        if(notation=="With") {
            if(this.position_with == target_line) {
                this.inject_error_into_selection();
            }
        } else if (notation=="Subquery") {
            if(this.position_subquery == target_line) {
                this.inject_error_into_selection();
            }
        }
    }

    inject_error_into_selection():void {
        let unknown_attribute = random_lower_case_letter_except(this.from.attributes);
        let random_target_projection = random_array_element(this.explicit_projections);
        random_target_projection.qualified_string =
            (DEBUG_ERROR?"XXXXX":"") +
            unknown_attribute;

    }

    init_position_with(counter: RefObject<number>) {
        this.position_with = ++counter.value;
    }
    init_position_subquery(counter: RefObject<number>)  {
        this.position_subquery = ++counter.value
    }

    write_main_query_for_with(arr: string[]) {
        throw new Error("Method not implemented.");
    }

    write_into_with(arr: string[], offset: number) {
        arr.push(" ".repeat(offset));
        arr.push("SELECT ");
        arr.push(this.explicit_projections.map(e => e.qualified_string + " AS " + e.rename).join(", ") + "\n");
        arr.push(" ".repeat(offset));
        arr.push("FROM ");
        arr.push(this.from.name);
    }

    from: Table;
    constructor(from: Table, number_of_projections: number) {
        super(from.random_attribute_strings_without_repetition(number_of_projections));
        this.from = from;
    }

    random_attribute_strings(num: number): string[] {
        return random_array_elements_without_repetitions(this.explicit_projections.map(p => p.rename), num);
    }

    write_into_array_with_subqueries(arr:string[], indentation_depth:number) {
        super.write_into_array_with_subqueries(arr, indentation_depth);
        arr.push(" ".repeat(indentation_depth));
        arr.push("FROM ");
        arr.push(this.from.name + "\n");
    }

    collect_sub_queries(subqueries: Subquery[]) {}



}

class Join_On_Query extends Query_with_Explicit_Projections {

    accessible_field_names(): string[] {
        return this.left_query.accessible_field_names().concat(this.right_query.accessible_field_names());
    }

    inject_error_into_selection():void {
        let this_fieldnames = this.accessible_field_names();
        let projection_to_change = random_array_element(this.explicit_projections);
        projection_to_change.qualified_string =
            (DEBUG_ERROR?"XXXXX":"") +
            projection_to_change.qualified_string[0] + "." + random_lower_case_letter_except(this_fieldnames.filter(e => e[0]==(projection_to_change.qualified_string[0])).map(e => e[e.length-1]));
    }

    inject_error_into_on():void {
        let this_fieldnames = this.accessible_field_names();
        let should_change_left = (random_integer_up_to_excluding(2)==1);

        if(should_change_left) {
            this.on_left =
                            (DEBUG_ERROR?"XXXXX":"") +
                            this.on_left[0] + "." + random_lower_case_letter_except(this_fieldnames.filter(e => e[0]==(this.on_left[0])).map(e => e[e.length-1]));
        } else {
            this.on_right =
                            (DEBUG_ERROR?"XXXXX":"") +
                            this.on_right[0] + "." + random_lower_case_letter_except(this_fieldnames.filter(e => e[0]==(this.on_right[0])).map(e => e[e.length-1]));
        }
    }

    inject_error(target_line: number, notation: string):void {
        if(notation=="With") {
            if(this.position_with == target_line) {
                this.inject_error_into_selection();
                return;
            } else if (this.position_with_on == target_line) {
                this.inject_error_into_on();
                return;
            }
        } else if (notation=="Subquery") {
            if(this.position_subquery == target_line) {
                this.inject_error_into_selection();
                return;
            } else if (this.position_subquery_on == target_line) {
                this.inject_error_into_on();
                return;
            }
        }

        this.left_query.inject_error(target_line, notation);
        this.right_query.inject_error(target_line, notation);

    }

    init_position_with(counter: RefObject<number>) {
        this.left_query.init_position_with(counter);
        this.right_query.init_position_with(counter);
        this.position_with = ++counter.value;
        this.position_with_on = ++counter.value
    }

    position_subquery_on: number;
    position_with_on: number;

    init_position_subquery(counter: RefObject<number>)  {
        this.left_query.init_position_subquery(counter);
        this.right_query.init_position_subquery(counter);
        this.position_subquery_on = ++counter.value
        this.position_subquery = ++counter.value;
    }

    write_main_query_for_with(arr: string[]) {
        arr.push("SELECT ")
        arr.push(this.explicit_projections.map(e => e.qualified_string + " AS " + e.rename).join(", ") + "\n");
        arr.push("FROM " + this.left_query.name + " JOIN " + this.right_query.name + "\n");
        arr.push(" ".repeat(5) + "ON (" + this.on_as_string() + ")");
    }
    write_into_with(arr: string[], offset: number) {
        arr.push(" ".repeat(offset) + "SELECT ");
        arr.push(this.explicit_projections.map(e => e.qualified_string + " AS " + e.rename).join(", ") + "\n");
        arr.push(" ".repeat(offset));
        arr.push("FROM " + this.left_query.name + " JOIN " + this.right_query.name + "\n");
        arr.push(" ".repeat(offset));
        arr.push("ON (" + this.on_as_string() + ")");
    }

    collect_sub_queries(subqueries: Subquery[]) {
        this.left_query.collect_sub_queries(subqueries);
        this.right_query.collect_sub_queries(subqueries);
    }

    left_query: Subquery;
    right_query: Subquery;
    on_left: string;
    on_right: string;

    constructor(left_query: Subquery, right_query: Subquery) {
        super([]);
        this.left_query = left_query;
        this.right_query = right_query;
        this.explicit_projections = this.create_random_projections(number_of_projections);
        this.on_left = this.left_query.random_attribute_strings(1)[0];
        this.on_right = this.right_query.random_attribute_strings(1)[0];
    }

    create_random_projections(num: number): Projection[] {
        let partitions = random_array_element(integer_partitions_of_fix_length(num, 2));
        let left_elements = this.left_query.random_attribute_strings(partitions[0]);
        let right_elements = this.right_query.random_attribute_strings(partitions[1]);
        return this.create_projections(do_random_array_sort(left_elements.concat(right_elements)));
    }

    random_attribute_strings(
                num: number): string[] {
        return do_random_array_sort(random_array_elements_without_repetitions(this.explicit_projections, num)).map(e=> e.rename);
    }

    write_into_array_with_subqueries(
                arr                  :string[],
                indentation_depth    :number
                                    ): void     {
                                                    super.write_into_array_with_subqueries(arr, indentation_depth);
                                                    arr.push(" ".repeat(indentation_depth));
                                                    arr.push("FROM ");
                                                    this.left_query.write_into_array_with_subqueries(arr, indentation_depth + 5);
                                                    arr.push(" ".repeat(indentation_depth ));
                                                    arr.push("JOIN ")
                                                    this.right_query.write_into_array_with_subqueries(arr, indentation_depth + 5);
                                                    arr.push(" ".repeat(indentation_depth ));
                                                    arr.push("ON (" + this.on_as_string() + ")\n"  );
                                                }


    private on_as_string(
                        ):string    {
                                return this.on_left + " = " + this.on_right;
                                    }


}

function generate_table(forbidden_names:string[], number_of_attributes: number) {

    let table = new Table(
                            random_upper_case_letter_except(forbidden_names),
                            []
                         );

    repeat_(number_of_attributes)._times(
                                            () => table.attributes.push(random_lower_case_letter_except(table.attributes))
                                        );
    return table;
}

export function tables_as_string(tables: Table[]):string {
    let arr = [];
    for (let table of tables) {
        arr.push(table.name + "(");
        arr.push(table.attributes.join(", "));
        arr.push(")\n");
    }
    return arr.join("");
}

let tables = generate_tables(5, 3);
let forbidden_names = tables.map(e => e.name);

repeat(5,
    (number)=> {
        let query:Query = generate_query([...tables], forbidden_names, 3);
        if(number==1) {
            // console.log("NUMBER " + number + "************************************************")
            // console.log(query.query_string_with_subqueries());

            //
            // console.log("dummy");
            query.inject_error(4, "With");
            console.log(query.query_string_with_WITH());
            console.log("************************************************")
            console.log("dummy");
            // console.log("************************************************")
        }
    }
);




