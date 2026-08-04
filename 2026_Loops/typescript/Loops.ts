import {BROWSER_EXPERIMENT} from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, keys, random_array_element, random_integer_up_to_excluding, Reaction_Time,
    SET_SEED, Standard_Post_Questionnaire
} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Task} from "./Nof1/modules/Experimentation/Task.js";
import {convert_string_to_html_string} from "./Nof1/modules/utils/Utils.js";
import {
    finish_pages,
    intro_pages,
    pre_run_experiment_instructions,
    pre_run_training_instructions
} from "./Experiment_Text.js";
import {Nouns} from "./Nof1/modules/Words/Nouns.js";

let SEED = "43";

SET_SEED(SEED);

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Loops",
    seed: SEED,
    introduction_pages              :   [writer.string_page_command(intro_pages())],
    pre_run_training_instructions   :   writer.string_page_command(pre_run_training_instructions()),
    pre_run_experiment_instructions :   writer.string_page_command(pre_run_experiment_instructions()),
    post_questionnaire              :   Standard_Post_Questionnaire(),

    finish_pages:                       [writer.string_page_command(finish_pages())],

    layout: [
        {   variable: "Variant",      treatments: ["for", "while", "do", "8"]                },
        {   variable: "Question",     treatments: ["Start", "End", "Number", "Invariant"]    },
        {   variable: "Feedback",     treatments: ["_to_be_written_"]                        }
    ],

    training_configuration: {
        fixed_treatments: [],
        can_be_cancelled: true,
        can_be_repeated: false
    },

    repetitions: 3,

    measurement: Reaction_Time(keys(["1", "0"])),
    task_feedback: ["y", "n"],

    task_configuration:    (t:Task) => {

        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_string_on_stage("<div class='sourcecode'>" + "Hello World" + "</div>");

        };

        t.print_feedback = () => {
            writer.clear_stage();
            writer.print_string_on_stage("<p> Should this task be considered or were you not concentrated enough (\"y\"= everthing fine, \"n\"= something went wrong)</p>");
        }

        t.do_print_pre_task = () => {
            writer.clear_stage();
            writer.print_html_on_stage("<h1>" +  target_condition_string + "</h1>");
        }

        t.accepts_answer = (s) => {
            return true;
        }

        // t.requires_task_feedback = () => true;

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
