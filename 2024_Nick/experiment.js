let SEED = "666";
Nof1.SET_SEED(SEED);
// let graphs = Nof1.create_catalan_graphs(10);
// for(let g of graphs) {
//     console.log(g.source_string());
// }



let experiment_configuration_function = (writer) => { return {

    experiment_name: "NicksExperiment",
    seed: SEED,

    introduction_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string(
            "Do this experiment")
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
                "Thanks for the fish."
            )
        )
    ],

    layout: [
        { variable: "Indentation",  treatments: ["indented", "nonindented"]},
    ],

    repetitions: 2, //CATALAN_GRAPHS.length,

    measurement: Nof1.Time_to_finish(Nof1.text_input_experiment),

    task_configuration:    (t) => {

        t.do_print_task = () => {
            writer.clear_stage();
            if(t.treatment_combination[0]=="indented")
                writer.print_html_on_stage("indented");
            else
                writer.print_html_on_stage("non-indented");
        };

        t.expected_answer = "abc";

        t.accepts_answer_function = (given_answer) => {
            return given_answer===t.expected_answer;
        };

        t.do_print_error_message = (given_answer) => {
            writer.clear_error();
            writer.print_html_on_error("<h1>Invalid answer: " + given_answer + "");
        };

        t.do_print_after_task_information = () => {
            writer.clear_error();
            writer.print_string_on_stage(writer.convert_string_to_html_string(
                "Correct.\n\n" +
                "In case, you feel not concentrated enough, make a short break.\n\n" +
                "Press [Enter] to go on. "));
        }
    }
}};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
