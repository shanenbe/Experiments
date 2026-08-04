import { intro_pages, pre_run_training_instructions, pre_run_experiment_instructions, finish_pages } from "./Experiment_Definition_Text.js";
import {BROWSER_EXPERIMENT} from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, keys, random_array_element, random_integer_up_to_excluding, Reaction_Time,
    SET_SEED, Standard_Post_Questionnaire
} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Task} from "./Nof1/modules/Experimentation/Task.js";


let SEED = "42";

SET_SEED(SEED);

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Function_Decomposition",
    seed: SEED,
    introduction_pages              :   [writer.string_page_command(intro_pages())],
    pre_run_training_instructions   :   writer.string_page_command(pre_run_training_instructions()),
    pre_run_experiment_instructions :   writer.string_page_command(pre_run_experiment_instructions()),
    post_questionnaire              :   Standard_Post_Questionnaire(),
    training_configuration:             {   can_be_cancelled: true, can_be_repeated: true },
    finish_pages:                       [writer.string_page_command(finish_pages())],

    layout: [
        { variable: "Style",        treatments: ["Inline",  "Function(Good identifier)", "Function(Sufficient identifier)", "Function (Bad identifier)"] },
        { variable: "Difficulty",   treatments: ["Trivial", "Easy", "Medium", "Hard"] },
    ],

    repetitions: 5,

    measurement: Reaction_Time(keys(["1", "2", "3", "4", "5", "6", "7", "8", "9"])),

    task_configuration:   (t:Task):void => {

        let style = t.treatment_index_value("Style");
        let level = t.treatment_index_value("Difficulty");


        console.log("hallo");
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
