// @ts-ignore
let EXPERIMENT = Nof1;
let MJ = MathJax;
console.log("dummy");
function graph_dictionary_function() {
    let result = {};
    for (let g of EXPERIMENT.graph_repository) {
        // let diff_string = diff_class_string(g);
        let num_divs = g.number_of_divisions();
        if (result[num_divs] == undefined) {
            result[num_divs] = {};
        }
        if (result[num_divs][g.number_of_direction_changes()] == undefined) {
            result[num_divs][g.number_of_direction_changes()] = [];
        }
        result[num_divs][g.number_of_direction_changes()].push(g);
    }
    return result;
}


    let experiment_configuration_function = (writer) => { return {

        experiment_name: "TestExperiment",
        seed: "42",

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
            writer.convert_string_to_html_string(
                "In this experiment, you will be asked to manually compute the result of an mathematical term.\n\nDon't worry, the terms are not too complex.")
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the training phase."
            )),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase.\n\n"
        )),

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string(
                "Almost done. Next, the experiment data will be downloaded. Please, send the " +
                "downloaded file to the experimenter.\n\nAfter sending your email, you can close this window.\n\nMany thanks for participating in the experiment."
                )
            )
        ],

        post_questionnaire: [
            EXPERIMENT.free_text("Name","What's your name?"),
            EXPERIMENT.free_text("Age","How old are you?"),
            EXPERIMENT.alternatives("Status","What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),
            EXPERIMENT.free_text("Experience","How many years of working experience in software industry to you have?"),
            EXPERIMENT.free_text("LoC","How many lines of code do you think you write each day on average?"),
        ],

        layout: [
            { variable: "Representation",  treatments: ["Code", "Math"]},
            { variable: "direction_changes",  treatments: ["0", "4"]}
        ],
        repetitions: 7,

        measurement: EXPERIMENT.Time_to_finish(EXPERIMENT.text_input_experiment),

        task_configuration:    (t) => {
            let changes = parseInt(t.treatment_combination[1].value);
            // let diff_group = parseInt(t.treatment_combination[2].value);
            // @ts-ignore
            let graph_dictionary = graph_dictionary_function();
            let possible_graphs = graph_dictionary[5][changes];

            let solution_tree = null;
            while(solution_tree==null) {
                let e = EXPERIMENT.random_array_element(possible_graphs);
                solution_tree = e.create_random_solution_tree();
            }

            t.do_print_task = () => {
                writer.clear_stage();
                let debug_string = " r = " + solution_tree.result + " v = " + solution_tree.math_node.number_of_direction_changes();
                debug_string="";
                if(t.treatment_combination[0].value==="Code") {
                    writer.print_html_on_stage(solution_tree.generate_source_code_string() + " = ?" + debug_string);
                } else {
                    writer.print_html_on_stage("\\(" + solution_tree.generate_mathjax_code_string() + " = ?\\)" + debug_string);
                    // @ts-ignore
                    MJ.typeset();
                }
            };

            t.expected_answer = "" + solution_tree.result;

            t.accepts_answer_function = (given_answer) => {
                return given_answer == "" + solution_tree.result;
            };

            t.do_print_error_message = (given_answer) => {
                solution_tree.math_node.number_of_direction_changes();
                t.print_task();
                writer.print_on_input_response(given_answer);
                writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "</h1>");
                writer.set_focus_on_input();
            };

            t.do_print_after_task_information = () => {
                let next_task_kind = (t.next_task()!=null)?"The next task is shown as " + t.next_task().treatment_combination[0].value + ".":"";
                writer.clear_stage();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Correct.\n\n" +
                    "Please, take a short break of at least 5 seconds.\n\n" +
                    "Press [Enter] to go on. " + next_task_kind));
            }

        }
    }};

    EXPERIMENT.BROWSER_EXPERIMENT(experiment_configuration_function);
