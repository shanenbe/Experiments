import {
    all_array_combinations,
    all_different_x_tupel
} from "../../../N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js";
import {Task} from "../../../N-of-1-Experimentation/modules/Experimentation/Task";

function WS(num) {
    return "&nbsp;".repeat(num);
}

abstract class Rule {
    abstract do_writer_on(writer: Code_Writer, bool_or_number: string, position: number): void;

    equals(that:Rule):boolean {
        return (this.constructor.name === that.constructor.name);
    }

    abstract type_name(param: Feature_Term_with_Typing_rules):string;
}

abstract class Code_Writer {

    arr:any[];
    constructor(arr: any[]) { this.arr = arr;}

    protected write(a:string) {
        this.arr.push(a);
    }
    protected writeln(a:string) {
        this.arr.push(a+"<br>");
    }


    write_rules(rules: Rules, left_type_name: string) {
        for(let c = 0; c < 3; c++) {
            rules.x_y_z[c].do_writer_on(this, left_type_name, c);
        }
    }

    write_function_rule(bool_or_number: string, position: number):void {}
    write_left_outer_rule(type: string, position: number):void {}
    write_right_outer_rule(type: string, position: number):void {}
}

class Feature_Type_Writer_Code extends Code_Writer {

    constructor(arr: any[]) {
        super(arr);
    }

    write_rules(rules: Rules, left_type_name: string) {
        this.write("<td colspan='3' style='border: 1px solid black;'>");
        this.writeln("class feature extends LTerm {<br>");
        this.writeln(WS(2) +"LTerm t1 t2 t3;<br>");
        this.writeln(WS(2) +"Type type_of(Environment e) {");
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.writeln(WS(4) + "if(ft.left.equals(type_left) && ft.right.equals(type_right)){");
        this.writeln(WS(6) + "return BOOL;");
        this.writeln(WS(4) + "}");
        this.writeln(WS(2) + "}");
        this.writeln("}");
        this.write("</td>");
    }

    write_function_rule(bool_or_number: string, position: number):void {
        this.writeln(WS(4) +"Function_Type ft = (Function_Type) t" + (position+1) + ".type_of(e);");
    }

    write_left_outer_rule(type:string, position:number) {
        this.writeln(WS(4) +"Type type_left = t" + (position + 1) + ".type_of(e);");
    }

    write_right_outer_rule(type:string, position:number) {
        this.writeln(WS(4) +"Type type_right = t" + (position + 1) + ".type_of(e);");
    }

}

class Feature_Literal_Type_Writer_Inference extends Code_Writer {

    constructor(arr: any[]) {
        super(arr);
    }

    write_rules(rules: Rules, left_type_name: string) {
        this.arr.push("$");
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        this.arr.push("$<br><br><br>$");
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        this.arr.push("$<br><br><br>$");
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.arr.push("$<br><br><br>");
    }

    write_function_rule(bool_or_number: string, position: number):void {
        let left = bool_or_number;
        let right = (bool_or_number=="BOOL"?"NUMBER":"BOOL");
        this.writeln("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{" + left + "}\\rightarrow\\mathrm{" + right + "}");
    }

    write_left_outer_rule(type:string, position:number) {
        this.write("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\mathrm{" + type + "}");
    }

    write_right_outer_rule(type:string, position:number) {
        this.write("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\mathrm{" + (type=="BOOL"? "NUMBER":"BOOL") + "}");
    }

}

class Feature_Type_Writer_Inference extends Code_Writer {

    constructor(arr: any[]) {
        super(arr);
    }

    write_rules(rules: Rules, left_type_name: string) {
        this.write("$\\Large{\\frac{")
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        this.write("\\,\\,\\,\\,\\,\\,\\,\\,\\,");
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        this.write("\\,\\,\\,\\,\\,\\,\\,\\,\\,");
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.write("}{\\mathrm{E}\\,\\vdash\\,\\mathrm{feature(\\,\\mathrm{t}_{\\mathrm{1}}\\,\\,\\mathrm{t}_{\\mathrm{2}}\\,\\,\\mathrm{t}_{\\mathrm{3}}\\,)}:\\,\\mathrm{BOOL}}}$");
    }

    write_function_rule(bool_or_number: string, position: number):void {
        let left = bool_or_number;
        let right = (bool_or_number=="BOOL"?"NUMBER":"BOOL");
        this.writeln("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{left}}\\rightarrow\\mathrm{T}_{\\mathrm{right}}");
    }

    write_left_outer_rule(type:string, position:number) {
        this.write("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{left}}");
    }

    write_right_outer_rule(type:string, position:number) {
        this.write("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{right}}");
    }

}

/**
 * Writes types of expressions as Java Source Code
 */
class Term_Type_Writer_Code extends Code_Writer {


    constructor(arr: any[]) {
        super(arr);
    }

    private write_code(position, infix) {
        this.write("<td style='border: 1px solid black;'>");
        this.writeln("class " + "exp_" + (position + 1) + " extends LTerm {");
        this.writeln("&nbsp;&nbsp;Type type_of(Environment e) {&nbsp;&nbsp;");
        this.writeln(infix);
        this.writeln("&nbsp;&nbsp;}");
        this.writeln("}");
        this.write("</td>");
    }

    write_function_rule(bool_or_number: string, position: number):void {
        this.write_code(
                            position,
                            "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(" + bool_or_number + ", " + (bool_or_number=="BOOL"?"NUMBER":"BOOL") + ");&nbsp;&nbsp;"
                       );
    }

    write_outer_rule(type:string, position:number):void {
        this.write_code(
                            position,
                            "&nbsp;&nbsp;&nbsp;&nbsp;return " + type + ";"
                       );
    }

    write_left_outer_rule(type: string, position: number) {
        this.write_outer_rule(type, position);
    }
    write_right_outer_rule(type: string, position: number) {
        this.write_outer_rule((type=="BOOL")?"NUMBER":"BOOL", position);
    }

}

class Function_Rule extends Rule {
    type_name(param: Feature_Term_with_Typing_rules):string {
        return param.first_type_in_function + " -> " + (param.second_type_in_function())
    }
    do_writer_on(writer: Term_Type_Writer_Code, bool_or_number: string, position: number) {
        writer.write_function_rule(bool_or_number, position);
    }
}

class Left_Rule extends Rule {
    type_name(param: Feature_Term_with_Typing_rules):string {
        return param.first_type_in_function;
    }
    do_writer_on(writer: Code_Writer, bool_or_number: string, position: number) {
        writer.write_left_outer_rule(bool_or_number, position);
    }
}

class Right_Rule extends Rule {
    type_name(param: Feature_Term_with_Typing_rules): string {
        return param.second_type_in_function();
    }
    do_writer_on(writer: Code_Writer, bool_or_number: string, position: number) {
        writer.write_right_outer_rule(bool_or_number, position);
    }
}

class Rules {

    x_y_z:Rule[];

    constructor(x_y_z:Rule[]) {
        this.x_y_z = x_y_z;
    }

    apply_writer(writer: Code_Writer, left_type_name: string) {
        writer.write_rules(this, left_type_name);
    }
}

export class Feature_Term_with_Typing_rules {
    first_type_in_function:string;
    term_typing_output_ordering: number[];
    feature_term: Rules;
    typing_rules: Rules;

    constructor(order:number[], first_type_in_function: string, feature_term: Rules, typing_rules: Rules) {
        this.term_typing_output_ordering = order;
        this.first_type_in_function = first_type_in_function;
        this.feature_term = feature_term;
        this.typing_rules = typing_rules;
    }

    typing_rules_as_code_html_string() {
        let term_type_writer = new Term_Type_Writer_Code([]);

        term_type_writer.arr.push("<table style='border: 1px solid black;'>");

        term_type_writer.arr.push("<tr style='vertical-align:top'>");
        this.feature_term.apply_writer(term_type_writer, this.first_type_in_function);
        term_type_writer.arr.push("</tr>");

        term_type_writer.arr.push("<tr style=\"vertical-align:top\">");
        let feature_writer = new Feature_Type_Writer_Code(term_type_writer.arr);
        this.typing_rules.apply_writer(feature_writer, this.first_type_in_function);
        term_type_writer.arr.push("</tr>");

        term_type_writer.arr.push("<tr style=\"vertical-align:top\">");
        term_type_writer.arr.push("<td colspan='3' style='border: 1px solid black;'>");

        term_type_writer.arr.push("feature("  +
                                                "  exp_" + (this.term_typing_output_ordering[0] + 1) +
                                                "  exp_" + (this.term_typing_output_ordering[1] + 1) +
                                                "  exp_" + (this.term_typing_output_ordering[2] + 1) + " )<br>")


        term_type_writer.arr.push("</td>");
        term_type_writer.arr.push("</tr>");

        term_type_writer.arr.push("</table>");
        return term_type_writer.arr.join("");
    }

    inference_rules_as_html_string() {

        let literal_types_writer = new Feature_Literal_Type_Writer_Inference([]);
        this.feature_term.apply_writer(literal_types_writer, this.first_type_in_function);

        let term_type_writer = new Feature_Type_Writer_Inference(literal_types_writer.arr);
        this.typing_rules.apply_writer(term_type_writer, this.first_type_in_function);

        term_type_writer.arr.push("<br><br>$<br><br>\\mathrm{feature("  +
            "  exp_" + (this.term_typing_output_ordering[0] + 1) +"\\,\\," +
            "  exp_" + (this.term_typing_output_ordering[1] + 1) +"\\,\\," +
            "  exp_" + (this.term_typing_output_ordering[2] + 1) + " )}$<br>")

        return term_type_writer.arr.join("");
    }

    error_position(): number {

        // let ordered_terms = this.ordered_terms();
        let ordered_term_types:string[] = [];
        for(let c = 0; c <= 2; c++) {
            ordered_term_types.push(this.type_string_of_term_no(c));
        }

        for(let c = 0; c <= 2; c++) {
            if(
                (this.typing_rules.x_y_z[c] instanceof Function_Rule) &&
                !(this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Function_Rule)
            ) {
                return c + 1;
            }
        }

        for(let c = 0; c <= 2; c++) {
            if(
                (
                    (this.typing_rules.x_y_z[c] instanceof Left_Rule) &&
                    (this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Right_Rule)
                ) || (
                    (this.typing_rules.x_y_z[c] instanceof Right_Rule) &&
                    (this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Left_Rule)
                )
              ) {
                for(let function_type_rule_position = 0; function_type_rule_position <= 2; function_type_rule_position++) {
                    if(this.typing_rules.x_y_z[function_type_rule_position] instanceof Function_Rule) {
                        if (function_type_rule_position > c) {
                            return function_type_rule_position + 1;
                        } else {
                            return c + 1;
                        }
                    }
                }
            }
        }

        return 0;

    }

    private type_string_of_term_no(c: number):string {
        let term:Rule = this.feature_term.x_y_z[this.term_typing_output_ordering[c]];
        if(term instanceof Left_Rule)
            return this.first_type_in_function;
        if(term instanceof Right_Rule)
            return (this.first_type_in_function==="BOOL"?"NUMBER":"BOOL");
        if(term instanceof Function_Rule)
            return (this.first_type_in_function + "->" + (this.first_type_in_function==="BOOL"?"NUMBER":"BOOL"));
        throw "Something is strange";
    }

    second_type_in_function() {
        return (this.first_type_in_function==="BOOL"? "NUMBER": "BOOL");
    }

    ordered_terms():Rule[] {
        let ret = [
            this.feature_term.x_y_z[this.term_typing_output_ordering[0]],
            this.feature_term.x_y_z[this.term_typing_output_ordering[1]],
            this.feature_term.x_y_z[this.term_typing_output_ordering[2]],
        ];
        return ret;
    }


    response_text() {
        let ret = "";
        ret = ret + "The correct response is: " + this.error_position() + "\n\n";
        return ret;

    }

    debug_help(t: Task) {
        if(t.task_number_in_execution==5) {
            console.log()
        }
        this.error_position();
    }
}

export function create_tasks_grouped_by_error_position() {

    let TYPE_CONSTRUCTORS = [new Function_Rule(), new Left_Rule(), new Right_Rule()];


    let BOOL_NUM = ["BOOL", "NUMBER"];
    let all_numbers = [0, 1, 2];
    let all_number_combinations: any[];

    all_number_combinations = all_different_x_tupel(3, all_numbers);
    let ret= {1:[], 2:[], 3:[], 0:[]};

    all_array_combinations([all_number_combinations, BOOL_NUM, all_number_combinations, all_number_combinations],
        (a) => {
            let typing_rule_array = a[3];
            let typing_rule = new Rules([TYPE_CONSTRUCTORS[typing_rule_array[0]], TYPE_CONSTRUCTORS[typing_rule_array[1]], TYPE_CONSTRUCTORS[typing_rule_array[2]]]);

            let term_rule_array = a[2];
            let term_rule = new Rules([TYPE_CONSTRUCTORS[term_rule_array[0]], TYPE_CONSTRUCTORS[term_rule_array[1]], TYPE_CONSTRUCTORS[term_rule_array[2]]]);

            let order_array = a[0];
            let first_type = a[1];

            let term = new Feature_Term_with_Typing_rules(order_array, first_type, term_rule, typing_rule);

            ret["" + term.error_position()].push(term);
        });



    return ret;
};


