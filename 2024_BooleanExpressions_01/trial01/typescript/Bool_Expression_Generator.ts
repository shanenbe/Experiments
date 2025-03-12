import {
    random_integer_up_to_excluding,
    random_lower_case_letter_except
} from "../../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";

export function generate_boolean_expression_as_string(treat_var_format:string, answerPos: string):string {

    let literals:string[] = [];
    let return_string = [];

    for (let c=0; c < 8; c++) {
        let next_bool = random_integer_up_to_excluding(2)==1?"true":"false";
        literals.push(next_bool);
    }

    for (let c=0; c < 6; c++) {

        let next_operator;

        if(treat_var_format == "OneLine")
            next_operator= random_integer_up_to_excluding(2)==1?" && ":" || ";
        else
            next_operator= random_integer_up_to_excluding(2)==1?" && ":"\n || ";

        return_string.push(literals[c] + next_operator);
    }

    return_string.push(literals[7]);

    return return_string.join("");
}

// let dummy = generate_boolean_expression_as_string("MultiLine");
// console.log(dummy);
