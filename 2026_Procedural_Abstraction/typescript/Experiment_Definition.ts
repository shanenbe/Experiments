import {  intro_pages,
          pre_run_training_instructions,
          pre_run_experiment_instructions, finish_pages } from "./Experiment_Definition_Text.js";
import {  BROWSER_EXPERIMENT}                             from "./Nof1/modules/Experimentation/Browser_Output_Writer.js";
import {  Experiment_Output_Writer, keys,
          Reaction_Time, SET_SEED, Standard_Post_Questionnaire  } from "./Nof1/modules/Experimentation/Experimentation.js";
import {  configure_task  } from "./Experiment_Code.js";


let SEED = "666";

SET_SEED(SEED);

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Function_Decomposition",
    seed: SEED,
    introduction_pages              :   intro_pages().map((p)=> writer.string_page_command(p)),
    pre_run_training_instructions   :   writer.string_page_command(pre_run_training_instructions()),
    pre_run_experiment_instructions :   writer.string_page_command(pre_run_experiment_instructions()),
    post_questionnaire              :   Standard_Post_Questionnaire(),

    finish_pages:                       [writer.string_page_command(finish_pages())],

    layout: [
        { variable: "Abstraction",                      treatments:     ["inline",          "procedural abstraction"                    ] },
        { variable: "Code difficulty",                  treatments:     ["trivial",         "medium"                    ,   "difficult" ] },
        { variable: "Meaningfulness",                   treatments:     ["perfect",          "acceptable",            "meaningless",    "inline"] },
        { variable: "Navigatability",                   treatments:     ["easy",             "hard",                                     "inline"] },
        // JAMOVI-Filter:
        // 1. ANOVA on Meaningfulness:
    ],

    repetitions: 4,

    measurement: Reaction_Time(keys(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])),

    task_configuration:   configure_task(writer),

    training_configuration: {
        fixed_treatments:               [
            ["procedural abstraction",   "medium",    "acceptable",     "hard"],
            ["procedural abstraction",   "medium",    "meaningless",    "hard"],
            ["procedural abstraction",   "medium",    "meaningless",    "easy"],
            ["inline",                   "medium",    "inline",         "inline"],
            ["procedural abstraction",   "medium",    "acceptable",     "hard"],
            ["procedural abstraction",   "medium",    "meaningless",    "easy"],
            ["procedural abstraction",   "medium",    "meaningless",    "hard"]
        ],
        can_be_cancelled: false,
        can_be_repeated: true
    },
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
