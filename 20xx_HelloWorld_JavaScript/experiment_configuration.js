let SEED = "42";
Nof1.SET_SEED(SEED);



let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "HelloWorld_JavaScript",
        seed: SEED,

        introduction_pages: [
            () => writer.print_string_on_stage("Hello, world. Press [Return] to enter the training phase.")
        ],

        pre_run_training_instructions: writer.string_page_command(
            "You entered the training phase. Press [Enter] to start training."
        ),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase. Press [Enter] to start the experiment."
            )),

        post_questionnaire: [
            Nof1.alternatives("Age", "What's your age??",
                ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"]),

            Nof1.alternatives("Status", "What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),

            Nof1.alternatives("Studies", "In case you study, what's your subject?",
                ["I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)", "something else in natural sciences", "something else"]),

            Nof1.alternatives("YearsOfExperience", "How many years of experience do you have in software industry?",
                ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"])
        ],

        finish_pages: [
            writer.string_page_command(
                "Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                "Please send your data to the experimenter.\n\n")],

        layout: [
            {variable: "MainVariable", treatments: ["TreatmentA", "TreatmentB"]},
            {variable: "HelperVariable", treatments: ["X", "Y"]}
        ],

        repetitions: 2,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        measurement: Nof1.Reaction_time(Nof1.keys(["0", "1", "2", "3"])),

        task_configuration: (task) => {

            task.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("Say Hello, " + task.treatment_value("MainVariable"));
            };

            task.do_print_after_task_information = () => {
                writer.print_error_string_on_stage(
                    writer.convert_string_to_html_string("Ok, there was something wrong. Dont mind."));
            }
        }
    }
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);