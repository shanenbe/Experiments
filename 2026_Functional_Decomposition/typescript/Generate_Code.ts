import {do_random_array_sort} from "./Nof1/modules/Experimentation/Experimentation.js";

export abstract class Term {
    abstract print_into(array: string[], indentation_depth: number, indentation_size: number);
    abstract print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number);

    print_string(indentation_size: number) {
        let arr = [];
        this.print_into(arr, 0, indentation_size);
        return arr.join("");
    }

    print_string_with_extra_lines(indentation_size: number) {
        let arr = [];
        this.print_into_with_extra_lines(arr, 0, indentation_size);
        return arr.join("");
    }
}

export class Return extends Term {

    return_value: number;

    constructor(return_value: number) {
        super();
        this.return_value = return_value;
    }

    print_into(array: string[], indentation_depth: number, indentation_length: number) {
        array.push(" " + this.return_value + "\n");
        // array.push(" ".repeat(indentation_length*indentation_depth) + "return " + this.return_value + ";\n");
    }

    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number) {
        array.push(" " + this.return_value + "\n");
    }
}

export class Nested_Ifs extends  Term {
    condition_string: string;
    then_branch: Term;
    else_branch: Term;

    print_into(array: string[], indentation_depth: number, indentation_length: number) {
        array.push(" ".repeat(indentation_length*indentation_depth) + "if(" + this.condition_string + ") {\n");
        if(this.then_branch instanceof Return) {
            array.push(" ".repeat(indentation_length*indentation_depth + indentation_length) + "//" + this.then_branch.return_value + "\n");
        } else {
            this.then_branch.print_into(array, indentation_depth + 1, indentation_length);
        }
        array.push(" ".repeat(indentation_length*indentation_depth) + "}");
        this.else_branch.print_into(array, indentation_depth + 1, indentation_length);
        // array.push(" ".repeat(indentation_length*indentation_depth) + "}\n");
    }


    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_length: number) {
        array.push(" ".repeat(indentation_length*indentation_depth) + "if(" + this.condition_string + ") {\n");
        if(this.then_branch instanceof Return) {
            array.push(" ".repeat(indentation_length*indentation_depth + indentation_length) + "//" + this.then_branch.return_value + "\n");
        } else {
            this.then_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
        }
        array.push(" ".repeat(indentation_length*indentation_depth) + "}");
        this.else_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
        // array.push(" ".repeat(indentation_length*indentation_depth) + "}\n");

    }

    target_condition_string(target_number: number): string {
        if(target_number == 1) {
            return this.condition_string;
        } else {
            if(this.then_branch instanceof Return)
                throw "ASDASD";
            return (this.then_branch as Nested_Ifs).target_condition_string(target_number-1);
        }
    }

    return_string(target_number: number): string {
        if(target_number == 1) {
            return (this.else_branch as Return).return_value.toString();
        } else {
            return (this.then_branch as Nested_Ifs).return_string(target_number-1);
        }
    }
}

export function generate_If_Statement(indentation_depth, nesting_depth): Nested_Ifs {

    let returns = [];
    let conditions = [];
    for (let i = 1; i <= nesting_depth ; i++) {
        returns.push(i);
        conditions.push(String.fromCharCode("a".charCodeAt(0)+i-1));
    }
    returns.push(nesting_depth + 1);

    returns = do_random_array_sort(returns);
    conditions = do_random_array_sort(conditions);

    let deepest_if = new Nested_Ifs();
    deepest_if.condition_string  =   conditions.pop();
    deepest_if.then_branch = new Return(0);
    deepest_if.else_branch = new Return(returns.pop());

    let then_if = deepest_if;


    for(let counter= 1; counter < nesting_depth; counter++) {
        let new_if = new Nested_Ifs();
        new_if.condition_string  =   conditions.pop();
        new_if.then_branch       =   then_if;
        new_if.else_branch       =   new Return(returns.pop());
        then_if = new_if;
    }

    return then_if;
}