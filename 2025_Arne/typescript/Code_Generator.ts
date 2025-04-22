import {Nouns} from "../../N-of-1-Experimentation/modules/Words/Nouns.js";
import {random_integer_up_to_excluding} from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";

export function generate_string(list_length: number, camel_case:boolean, new_line: boolean): string {
    let list = generate_identifier_list(list_length);
    let formatted_list = format_identifier_list(
                                                    list,
                                                    (new_line?"\n": " "),
                                                    camel_case
                                                );
    return formatted_list;
}

function generate_identifier_list(number_of_identifiers:number) {
    let identifier_list = [];

    for (let i=0; i < number_of_identifiers; i++) {
        let num_subidentifiers = 2 + random_integer_up_to_excluding(3);
        identifier_list.push(generator_word(num_subidentifiers));
    }

    return identifier_list;
}

function generator_word(number_of_subwords: number) {
    let subwords = [];
    let nouns = new Nouns();
    for(let i = 0; i < number_of_subwords; i++) {
        subwords.push(nouns.pull_random_word());
    }
    return subwords;
}

function format_identifier_list(    identifier_list: string[][],
                                    separator:string,
                                    as_camelcase:boolean)
{
    let result = [];
    for(let unformatted_identifier of identifier_list) {
        let formatted_identifier;
        if(as_camelcase) {
            formatted_identifier = unformatted_identifier.join("");
        } else {
            formatted_identifier = unformatted_identifier.join("_")
        }
        result.push(formatted_identifier)
    }
    return result.join("," + separator);
}

let list = generate_identifier_list(3);
let formatted_list = format_identifier_list(list, " ", false);
console.log(formatted_list);