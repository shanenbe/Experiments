import {
    Addition,
    Assignment,
    Operation,
    Scalar,
    Subtraction,
    Term,
    Return,
    Statement,
    Expression
} from "./Experiment_Data_Structures.js";
import {
    do_random_array_sort_on_clone,
    random_array_element,
    random_integer_up_to_excluding
} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Nouns} from "./Nof1/modules/Words/Nouns.js";
import {Words} from "./Nof1/modules/Words/Words.js";

/**
 * Splits the integer into an addition or subtraction
 * All operators are generated and one randomly chosen
 */
export function split(integer: number)
    : Operation {

    let ret = [];

    for (let i = integer; i > 1; i--) {
        // if (integer - i != 0)
        ret.push(new Addition(new Scalar(i), new Scalar(integer - i)));
    }

    for (let i = 9; i > integer; i--) {
        // if (integer + i != 0)
        ret.push(new Subtraction(new Scalar(i), new Scalar(i - integer)));
    }

    return random_array_element(ret);
}

/**
 * Decomposes the integer into a number of additions or subtractions.
 */
export function decompose_integer(     integer                 :   number,
                                number_of_operators     :   number      )
    :Expression {

    if (number_of_operators == 0) {
        return new Scalar(integer)
    }

    let root = split(integer);
    let current: Operation = root;

    for (let i = 0; i < number_of_operators - 1; i++) {
        current.left = split(current.left.result());
        current = current.left as Operation;

    }

    return root;
}

/**
 * Generates for an integer such as 3 an identifier depending on the style:
 *  style 0: _3
 *  style 1: two_plus_one_plus_one_minus_one (random natural text of three operators)
 *  style 2: knug (random string with length between 4 and 12)
 */
export function generate_identifier_for_integer(integer: number, style: number) {
    if (style == 0)
        return "_" + integer;
    if (style == 1) {
        let term = decompose_integer(integer, 2);
        let name = term.natural_word_string();
        return name.replace(/\s/g, "_");
    }
    if (style == 2) {
        let identifier_length = 4 + random_integer_up_to_excluding(9)
        return Words.random_letter_combination(identifier_length);
    }
    if (style == 3) {
        return null;
    }
    throw "invalid style: " + integer;
}

export function generate_procedure_body_for_decomposed_integer_for_given_variables(term,
                                                                                   variables: string[])
    : Statement[] {
    if (term.number_of_operations() == 0) {
        return [new Return(term as Scalar)];
    }

    let assignments: Assignment[] = [];

    term.generate_assignments(variables, assignments);

    return assignments;
}


export function generate_assignments_for_decomposed_integer(term): Statement[] {
    return generate_procedure_body_for_decomposed_integer_for_given_variables(term,
        new Nouns().pull_n_random_words(term.number_of_operations() + 1));
}


export function generate_body_for_decomposed_integer_containing_identifier(term           : Term,
                                                                           procedure_name : string
): Statement[] {

    let identifiers: string[] = [];

    if (procedure_name != null) {
        identifiers = new Nouns().pull_n_random_words(term.number_of_operations()-1);
        identifiers.push(procedure_name);
        identifiers = do_random_array_sort_on_clone(identifiers);
    } else {
        identifiers = new Nouns().pull_n_random_words(term.number_of_operations());
    }

    return generate_procedure_body_for_decomposed_integer_for_given_variables(term, identifiers);
}

