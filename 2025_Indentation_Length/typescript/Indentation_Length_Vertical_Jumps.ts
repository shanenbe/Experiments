import {BROWSER_EXPERIMENT} from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, keys, random_array_element, random_integer_up_to_excluding, Reaction_Time,
    SET_SEED, Standard_Post_Questionnaire
} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Task} from "./Nof1/modules/Experimentation/Task.js";
import {generate_If_Statement, Nested_Ifs, Term} from "./Generate_Code.js";
import {convert_string_to_html_string} from "./Nof1/modules/utils/Utils.js";
import {
    finish_pages,
    intro_pages,
    pre_run_experiment_instructions,
    pre_run_training_instructions
} from "./Indentation_Length_Vertical_Jumps_Text.js";
import {Nouns} from "./Nof1/modules/Words/Nouns.js";

let SEED = "42";

SET_SEED(SEED);

export function set_if_conditions_on_nous_each_starting_with_different_letter(if_statement: Term) {
    let starting_letter = [];
    let nouns = new Nouns();
    while(if_statement instanceof Nested_Ifs) {
        let next_words = nouns.get_random_word();
        while(starting_letter.includes(next_words[0])) {
            next_words = nouns.get_random_word();
        }
        starting_letter.push(next_words[0]);
        if_statement.condition_string = next_words;
        if_statement = if_statement.then_branch;
    }
}

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Indentation_Length",
    seed: SEED,
    introduction_pages              :   [writer.string_page_command(intro_pages())],
    pre_run_training_instructions   :   writer.string_page_command(pre_run_training_instructions()),
    pre_run_experiment_instructions :   writer.string_page_command(pre_run_experiment_instructions()),
    post_questionnaire              :   Standard_Post_Questionnaire(),
    training_configuration:             {   can_be_cancelled: true, can_be_repeated: true },
    finish_pages:                       [writer.string_page_command(finish_pages())],

    layout: [
        { variable: "Length",  treatments: ["2", "4", "6", "8"]},
        { variable: "Level",  treatments: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]},
        { variable: "Distance_from_Center",  treatments: ["_computed_"]}
    ],

    repetitions: 5,

    measurement: Reaction_Time(keys(["1"])),

    task_configuration:    (t:Task) => {
        let center = 5;

        let nesting_depth = center * 2 - 1;

        let length = parseInt(t.treatment_value("Length"));
        let level = parseInt(t.treatment_value("Level"));
        let target_expression_number = parseInt(t.treatment_value("Level"));

        t.set_computed_variable_value("Distance_from_Center",  Math.abs(center - level).toString());

        let if_statement = generate_If_Statement(length, nesting_depth);
        set_if_conditions_on_nous_each_starting_with_different_letter(if_statement);
        let target_condition_string = if_statement.target_condition_string(target_expression_number);

        let html_string = convert_string_to_html_string(if_statement.print_string(length));
        let correct_answer = if_statement.return_string(target_expression_number);

        html_string = html_string.replace("\(" + target_condition_string + "\)", "<span style=\"background-color:red\">(" + target_condition_string + ")</span>");

        t.expected_answer = correct_answer;

        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_string_on_stage("<div class='sourcecode'>" + html_string + "</div>");
            // writer.print_html_on_stage();

        };

        t.accepts_answer = (s) => {
            return true;
        }

        t.do_print_after_task_information = () => {
            writer.clear_stage();
            writer.print_error_string_on_stage(writer.convert_string_to_html_string(
                "The correct answer was: " + t.expected_answer + "\n\n" +
                "In case, you feel not concentrated enough, make a short break.\n\n" +
                "Press [Enter] to go on. "));
        }
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
