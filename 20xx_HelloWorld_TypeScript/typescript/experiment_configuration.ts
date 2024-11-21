import {BROWSER_EXPERIMENT} from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, keys, random_array_element, Reaction_Time,
    SET_SEED
} from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import {Task} from "../../N-of-1-Experimentation/modules/Experimentation/Task.js";

let SEED = "42";

SET_SEED(SEED);


let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "TypeSystems-ConstructorCalls-Hierarchical",
    seed: SEED,

    introduction_pages: [
        ()=>writer.print_string_on_stage("Hello world."),
    ],

    pre_run_training_instructions: writer.string_page_command(
            "You entered the training phase."
    ),

    pre_run_experiment_instructions: writer.string_page_command(
        writer.convert_string_to_html_string(
            "You entered the experiment phase."
        )),

    post_questionnaire           :   [
        alternatives("Age","What's your age??",
            ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"]),

        alternatives("Status","What is your current working status?",
            ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),

        alternatives("Studies","In case you study, what's your subject?",
            ["I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)", "something else in natural sciences", "something else"]),

        alternatives("YearsOfExperience", "How many years of experience do you have in software industry?",
            ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"])
    ],

    finish_pages: [
        writer.string_page_command(
            "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
            "Please, send the downloaded file to the experimenter who will do the analysis</p>"
        )
    ],

    layout: [
        { variable: "MainVariable",  treatments: ["A", "B"]},
        { variable: "SomeOtherVariable",  treatments: ["0", "1"]},
    ],

    repetitions: 4,

    measurement: Reaction_Time(keys(["0", "1", "2", "3"])),

    task_configuration:    (t:Task) => {

        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_html_on_stage("<h1>Hello world, treatment " +  t.treatment_value("MainVariable") + "</h1");
        };

        t.expected_answer = "4";

        t.do_print_after_task_information = () => {
            writer.print_error_string_on_stage(
                writer.convert_string_to_html_string("Ok, there was something wrong. Dont mind."));
        }
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
