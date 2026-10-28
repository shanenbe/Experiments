import {
    do_random_array_sort_on_this,
    Experiment_Output_Writer, random_array_element,
    random_integer_up_to_excluding
} from "./Nof1/modules/Experimentation/Experimentation.js";

import {Task}                                                           from "./Nof1/modules/Experimentation/Task.js";
import {Nouns}                                                          from "./Nof1/modules/Words/Nouns.js";

import {
    decompose_integer,
    generate_assignments_for_decomposed_integer,
    generate_body_for_decomposed_integer_containing_identifier,
    generate_identifier_for_integer
}                                                                       from "./Experiment_Integer_To_Assignments.js";
import {
    Expression,
    Procedure,
    Procedure_Call,
    Procedures,
    Statement,
} from "./Experiment_Data_Structures.js";
import {Return}                                                         from "./Experiment_Data_Structures.js";
import {
    integer_partitions_of_fix_length,
    integer_partitions_of_fix_length_with_constraint
} from "./Nof1/modules/numeric/integer_partition.js";
import {for_all}                                                        from "./Nof1/modules/utils/Loops.js";

/*
        { variable: "Code difficulty",                  treatments:     ["trivial",         "medium"                    ,   "difficult" ] },
        { variable: "Abstraction",                      treatments:     ["inline",          "procedural abstraction"                    ],
        { variable: "Meaningfulness",                   treatments:     ["perfect",          "acceptable",            "meaningless",    "inline"] }
        { variable: "Navigatability",                   treatments:     ["easy",             "hard"                                     "inline"] },


        ["perfect",         "acceptable",   "meaningless",     "inline"    ] },

Jamovi Filter:
1.
Meaningfulness != "inline"
  => ANOVA auf Code "Abstraction", "difficulty", "Navigatability"

2.
Abstraction != "perfect"
Abstraction != "acceptable"
   => ANOVA auf Code difficulty", "Abstraction", "Navigatability"

3.
Meaningfulness != "meaningless"
=> ANOVA auf Code difficulty", "Meaningfulness"
*/

const LOC = 300;
const number_of_additional_procedures = 20;
let max_ops_per_function = 14;

export function configure_task(writer: Experiment_Output_Writer) {
    return (t:Task):void => {

        let style: number = Number(t.treatment_index_value("Meaningfulness"));
        let navigation = t.treatment_value("Navigatability")=="easy";

        // Drop all unnecessary treatment combinations
        //   keep only for onlined functions
        if(t.treatment_value("Abstraction")=="inline" ) {
            if(t.treatment_value("Meaningfulness") != "inline"
                    || t.treatment_value("Navigatability") != "inline" ) {
                t.drop = true;
                return;
            }

            style = 3;
            navigation = false;
        } else {
            if(t.treatment_value("Meaningfulness") == "inline"
                || t.treatment_value("Navigatability") == "inline" ) {
                t.drop = true;
                return;
            }

        }

        let number_of_operators_in_target = Number(t.treatment_index_value("Code difficulty")) * 4;

        // Random result
        let result: number = random_integer_up_to_excluding(10);

        t.expected_answer = String(result);

        let procedures = generate_procedures(   result,
                                                           style,
                                                           number_of_additional_procedures,
                                                           number_of_operators_in_target,
                                                           LOC                                  );

        t.print_task = () => {
            writer.clear_stage();
            let procedure_string = procedures.to_html_string(navigation);
            writer.print_html_on_stage("<p><div class='sourcecode'>" + procedure_string + "</div></p>")
        }

        t.do_print_after_task_information = () => {
            writer.clear_stage();
            writer.print_html_on_stage("<p>The correct answer was: " + t.expected_answer + "</p>" +
                                       "<p>In case you use the mouse or the touchpad, move the mouse pointer to the top left of the screen.</p>" +
                                       "<p>In case you need a break, you can do it now. " +
                                           "Otherwise, the next task will be given to you after you press [Enter].</p>")
        }
    }
}





/**
 * Creates a single procedure with the number of operations whose result is the given integer
 * @param procedure_name
 * @param integer
 * @param number_of_operations
 */
function generate_procedure_returning_number(                   procedure_name          :       string,
                                                                integer                 :       number,
                                                                number_of_operations    :       number,
                                            ) {

    let term = decompose_integer(integer, number_of_operations );

    let body = generate_body_for_decomposed_integer_containing_identifier(  term,
                                                                                        procedure_name );

    return new Procedure(procedure_name, body);

}


/**
 * Creates a single procedure with the (a) number of operations, (b) whose result is the given integer,
 *   and (c) which contains the passed integer als local variable
 * @param procedure_name
 * @param integer
 * @param number_of_operations
 * @param identifier
 */
function generate_procedure_returning_number_with_contained_identifier(    procedure_name          :  string,
                                                                           integer                 :  number,
                                                                           number_of_operations    :  number,
                                                                           identifier              : string      )
                                                           : Procedure
{
        let term   : Expression     = decompose_integer(integer, number_of_operations );
        let body   : Statement[]   = generate_body_for_decomposed_integer_containing_identifier(  term,
                                                                                                            identifier  );
        return new Procedure(   procedure_name,
                                body              );
}



function generate_procedure_containing_identifier_as_local_variable(          procedure_name          : string ,
                                                                   number_of_operations    : number ,
                                                                   identifier              : string )
                                             : Procedure {

      let       result  :   number   = random_integer_up_to_excluding    (10);
      return    generate_procedure_returning_number_with_contained_identifier(  procedure_name,
                                                                                result,
                                                                                number_of_operations,
                                                                                identifier              );
}


function generate_procedures_with_contained_identifier(             number_of_functions      :   number,
                                                                    operators_in_all_procedures    :   number,
                                                                    identifier              :   string
)                                               :  Procedure[] {

    let   functions         : Procedure[]   =   [];
    let   procedure_names   : string []     =   new Nouns().pull_n_random_words(number_of_functions);

    let operations_array: number[] = []

    let ops = operators_in_all_procedures;
    let num_f = number_of_functions;

    let partition_length = 4; // Can be fixed

    let ops_per_partition = partition_length * max_ops_per_function;

    while(num_f >= partition_length && ops >= ops_per_partition) {
        let int_part = integer_partitions_of_fix_length_with_constraint(
            30, partition_length, n => n < max_ops_per_function
        );
        let random_int_partition = random_array_element(int_part);

        operations_array.push(...random_int_partition);
        num_f = num_f - partition_length;
        ops = ops - ops_per_partition
    }

    if (num_f > 0) {
        let int_partitions = integer_partitions_of_fix_length_with_constraint(ops, num_f, n => n < max_ops_per_function)

        if (int_partitions.length == 0)
            throw "Invalid stuff here";

        let random_int_partition = random_array_element(
                                                    int_partitions
                                            );

        operations_array.push(...random_int_partition);
    }
    let v = operations_array.reduce((total, num) => total + num, 0);

    for_all(operations_array, (number_of_ops:number) => {
        let f = generate_procedure_containing_identifier_as_local_variable(procedure_names.shift(),
            number_of_ops,
            identifier)
        functions.push(f);
    })

    return functions;
}


function generate_procedures_except_main(   result                          : number ,
                                            style_number                    : number  ,
                                            number_of_functions             : number  ,
                                            number_of_operators_in_target   : number,
                                            expected_LOC                    : number)
         : {  target_identifier: string,
              target:    Procedure  ,
              procedures:Procedure[] }   {

    // at least
    let operators_in_all_procedures = expected_LOC - number_of_functions;

    // If inlines, two more lines are needed
    if (style_number == 3) {
                               operators_in_all_procedures = operators_in_all_procedures + 2;
                               number_of_operators_in_target
                           }




    let identifier: string = (style_number != 3)?  generate_identifier_for_integer(result,style_number)
                                                :  null;


    let target_procedure    :   Procedure    =     generate_procedure_returning_number( identifier           ,
                                                                                        result               ,
                                                                                        number_of_operators_in_target  );

    let procedures          :  Procedure[]   =     generate_procedures_with_contained_identifier(   number_of_functions  ,
                                                                                                    operators_in_all_procedures  ,
                                                                                                    identifier           );
    if (style_number != 3) {
        let procedure_1 = procedures.shift();
        let procedure_2 = procedures.shift();

        procedures.push(target_procedure);

        do_random_array_sort_on_this(procedures);

        procedures.unshift(procedure_1);
        procedures.push(procedure_2);
    }

    return {    target_identifier: identifier,
                target      : target_procedure   ,
                procedures  : procedures         };

}

function generate_main_procedure(      body: Statement[]    )
                      : Procedure {

    return new Procedure("main", body);

}

function generate_procedures(       result                          : number  ,
                                      identifier_style              : number  ,
                                    number_of_additional_function   : number  ,
                                      number_of_operators_in_target : number  ,
                                    expected_LOC_in_procedures      : number      )
                 : Procedures
{

    let number_of_additional_functions_to_generate = number_of_additional_function;

    // If the target is a procedure, one procedure less is required
    if (identifier_style != 3)
        number_of_additional_functions_to_generate--;

    // remove header and closing bracket from LOC
    expected_LOC_in_procedures = expected_LOC_in_procedures
                                    - (2 * number_of_additional_functions_to_generate) // each function has 2 LOC more
                                    - (number_of_operators_in_target + 3)             // remove LOC from target + target header
                                    - 3;                                              // three lines for main()
    if (identifier_style == 3) {
        expected_LOC_in_procedures++;
    }

    let other_procedures = generate_procedures_except_main(  result,
                                                                                            identifier_style,
                                                                                            number_of_additional_functions_to_generate,
                                                                                            number_of_operators_in_target,
                                                                                            expected_LOC_in_procedures
                                                            );

    let main_body: Statement[];

    if (identifier_style == 3) {
        main_body = other_procedures.target.body;
        other_procedures.target = null;

    } else {
        main_body = [new Return(new Procedure_Call(other_procedures.target_identifier))];
    }

    let main_procedure = generate_main_procedure(main_body)

    return new Procedures(main_procedure, other_procedures.target, [...other_procedures.procedures]);
}



/***************************************
 ***************************************
 */
//
// let result = 2 ; // random_integer_up_to_excluding(10);
// let style_number = 1;
//
// let number_of_functions = 20 ; // random_integer_up_to_excluding(10);
// let number_of_operators =  12; // random_integer_up_to_excluding(10);
// let expected_LOC = 300;
//
// let procedures = generate_procedures(
//         result                  ,
//         style_number            ,
//         number_of_functions     ,
//         number_of_operators     ,
//         expected_LOC
//     );
//
//
// procedures.log_html();
//
//
