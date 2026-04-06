import {BROWSER_EXPERIMENT} from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import {
    Experiment_Output_Writer, keys, random_array_element, random_integer_up_to_excluding, Reaction_Time,
    SET_SEED, Standard_Post_Questionnaire
} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Task} from "./Nof1/modules/Experimentation/Task.js";
import {generated_code} from "./Generate_Code.js";
import {convert_string_to_html_string} from "./Nof1/modules/utils/Utils.js";
import {Nouns} from "./Nof1/modules/Words/Nouns.js";

let SEED = "42";

SET_SEED(SEED);

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Indirection",
    seed: SEED,
    introduction_pages              :   [writer.string_page_command("<h1>Indirection</h1><p>What's the result of the code? You should run the browser in full screen mode.</p>")],
    pre_run_training_instructions   :   writer.string_page_command("<p>This starts training. Press [Esc] to abandon training. Press [Return] to continue.</p>"),
    pre_run_experiment_instructions :   writer.string_page_command("<p>Experiment starts. Be concentrated. Press [Return].</p>"),
    training_configuration:             {   can_be_cancelled: true, can_be_repeated: true },
    finish_pages:                       [writer.string_page_command("<p>Done. Press [Return] to get csv.</p>")],

    layout: [
        { variable: "Separator",  treatments: ["NewLine", "InLine"]},
        { variable: "Length",  treatments: ["3", "4", "5"]}
    ],

    repetitions: 3,

    measurement: Reaction_Time(keys(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])),

    task_configuration:    (t:Task) => {
        let separator = t.treatment_value("Separator");
        let length = parseInt(t.treatment_value("Length"));

        let arr = [];

        for (let i = 0; i < length; i++) {
            let nouns = new Nouns();
            let new_word = "\"";
            new_word = new_word + nouns.pull_n_random_words(3).join("\\\",")
            new_word = new_word + "\"";
            arr.push(new_word);
        }

        let show_string = "";

        if(separator == "NewLine")
            show_string = arr.join(",<br>");
        else
            show_string = arr.join(",");

        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_string_on_stage("<div class='sourcecode'>" + show_string + "</div>");
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
