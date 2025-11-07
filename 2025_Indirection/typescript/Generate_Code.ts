import {do_random_array_sort, random_integer_up_to_excluding} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Nouns} from "./Nof1/modules/Words/Nouns.js";
import {Verbs} from "./Nof1/modules/Words/Verbs.js";


export class Nested_Term {
    class_name: string = null;
    method_name: string = null;
    return_value: string = null;
    next_term: Nested_Term = null;

    constructor(class_name: string, method_name: string, return_value: string) {
        this.class_name = class_name;
        this.method_name = method_name;
        this.return_value = return_value;
    }

    to_class_string_array(arr:string[]) {
        let this_string = [];

        this_string.push("class " + this.class_name + "{");
        this_string.push("    int " + this.method_name + "() {");

        if(this.next_term != null) {
            this_string.push("       return new " + this.next_term.class_name + "()." + this.next_term.method_name + "();");
            this.next_term.to_class_string_array(arr);
        } else {
            this_string.push("       return " + this.return_value + ";");
        }

        this_string.push("    }");
        this_string.push("}");

        arr.push(this_string.join("\n"));


    }

    computed_return_value() {
        if(this.next_term != null)
            return this.next_term.computed_return_value();
        else
            return this.return_value;
    }
}

export function generate_terms(nesting: number, number_of_terms : number): Nested_Term[] {

    let nouns = new Nouns();
    let verbs = new Verbs();
    let new_terms: Nested_Term[] = [];

    let class_names: string[] = nouns.pull_n_random_words(number_of_terms);
    let method_names: string[] = verbs.pull_n_random_words(number_of_terms);

    for(let i = 0; i < number_of_terms - nesting; i++) {
        let new_term = new Nested_Term(class_names.pop(), method_names.pop(), random_integer_up_to_excluding(10).toString());
        new_terms.push(new_term);
    }

    let nested_term = new Nested_Term(class_names.pop(), method_names.pop(), random_integer_up_to_excluding(10).toString());
    new_terms.push(nested_term);

    for(let i = 0; i < nesting - 1; i++) {
        nested_term.next_term = new Nested_Term(class_names.pop(), method_names.pop(), random_integer_up_to_excluding(10).toString());
        nested_term = nested_term.next_term;
    }

    return new_terms;
}

export function term_strings(terms: Nested_Term[]): string[] {
    let ret:string[] = [];

    for(let term of terms) {
        term.to_class_string_array(ret);
    }

    let target = terms.pop();
    terms.push(target);

    ret.push("new " + target.class_name + "()." + target.method_name + "();");

    return ret;
}

export function generated_code(nesting: number, number_of_terms : number) {
    let gen_term = generate_terms(nesting, number_of_terms);

    let result: string = gen_term[gen_term.length - 1].computed_return_value();
    let strings = term_strings(gen_term);
    let statement = strings.pop();
    let target_class = strings.pop();
    strings = do_random_array_sort(strings);
    strings.push(target_class);
    strings.push(statement);

    return  {
        class_strings: strings.join("\n"),
        returned_value: result
    }
}
