import { intro_pages, pre_run_training_instructions, pre_run_experiment_instructions, finish_pages } from "./Experiment_Definition_Text.js";
import { BROWSER_EXPERIMENT } from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import { keys, Reaction_Time, SET_SEED, Standard_Post_Questionnaire } from "./Nof1/modules/Experimentation/Experimentation.js";
import { configure_task } from "./Experiment_Code.js";
let SEED = "42";
SET_SEED(SEED);
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Identifier_Size",
        seed: SEED,
        introduction_pages: intro_pages().map((p) => writer.string_page_command(p)),
        pre_run_training_instructions: writer.string_page_command(pre_run_training_instructions()),
        pre_run_experiment_instructions: writer.string_page_command(pre_run_experiment_instructions()),
        post_questionnaire: Standard_Post_Questionnaire(),
        training_configuration: { can_be_cancelled: true, can_be_repeated: true },
        finish_pages: [writer.string_page_command(finish_pages())],
        layout: [
            { variable: "Indentation_Size", treatments: ["2", "4", "6", "8", "12", "dynamic"] },
            { variable: "If_Position", treatments: ["1", "2", "3", "4", "5"] },
            { variable: "Indent_Guides", treatments: ["with", "without"] },
        ],
        repetitions: 5,
        measurement: Reaction_Time(keys(["1", "2", "3", "4", "5"])),
        task_configuration: configure_task(writer)
    };
};
BROWSER_EXPERIMENT(experiment_configuration_function);
//# sourceMappingURL=Experiment_Definition.js.map