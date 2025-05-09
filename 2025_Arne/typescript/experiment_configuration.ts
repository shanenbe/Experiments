import {BROWSER_EXPERIMENT} from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, keys, random_array_element, Reaction_Time,
    SET_SEED
} from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import {Task} from "../../N-of-1-Experimentation/modules/Experimentation/Task.js";


let SEED = "42";

SET_SEED(SEED);

function generated_version_1(guard_executed: boolean) {
    let ws2 = "&nbsp;".repeat(2);
    let ws4 = "&nbsp;".repeat(4);


    let ret = "";
    if(guard_executed) {
        ret = "let guard_cond = true;<br>"
    } else {
        ret = "let guard_cond = false;<br>"
    }



    ret = ret + "function f(param) {<br>" +
        ws2 + "if(contidion)&nbsp;<br>" +
        ws4 + "blbalbalb<br>";


    return ret;
}



function generated_version_2(guard_executed: boolean) {
    return "function f(param) {<br>" +
    "&nbsp;&nbsp;isNull(asdfsadf) {...asdfsadff};<br></br>" +
    "&nbsp;blbalbalb";
}


let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "Nikita",
    seed: SEED,

    introduction_pages:                 [
                                            ()=>writer.print_string_on_stage("This is your hello world experiment.")
                                        ],

    pre_run_training_instructions:      writer.string_page_command(
                                            "You entered the training phase. You can skip the training by pressing [Esc]."
                                        ),

    pre_run_experiment_instructions:    writer.string_page_command(
                                            "You entered the experiment phase."
                                        ),

    post_questionnaire           :      [
                                            alternatives(
                                                            "Age",
                                                            "What's your age??",
                                                            [
                                                                "younger than 18",                  "between 18 and (excluding) 25",        "between 25 and (excluding) 30",
                                                                "between 30 and (excluding) 35",    "between 35 and (excluding) 40",        "40 or older"
                                                            ]
                                            ),

                                            alternatives(
                                                            "Status",
                                                            "What is your current working status?",
                                                             [
                                                                 "Undergraduate student (BSc not yet finished)",        "Graduate student (at least BSc finished)",         "PhD student",
                                                                 "Professional software developer",                     "Teacher",                                          "Other"
                                                             ]
                                            ),

                                            alternatives(
                                                            "Studies",
                                                            "In case you study, what's your subject?",
                                                            [
                                                                "I do not study",                       "Computer science",     "computer science related (such as information systems, aka WiInf)",
                                                                "something else in natural sciences",   "something else"
                                                            ]
                                            ),

                                            alternatives(
                                                            "YearsOfExperience",
                                                            "How many years of experience do you have in software industry?",
                                                            [
                                                                "none",                                                 "less than or equal 1 year",    "more than 1 year, but less than or equal 3 years",
                                                                "more than 3 years, but less than or equal 5 year",     "more than 5 years"
                                                            ]
                                            ),

                                            alternatives(
                                                            "impression",
                                                            "What statement describes best your impression \n\ of the experiment?",
                                                            [
                                                                    "I do not think that there was a difference between the notations",
                                                                    "The inference notation made it slightly easier for me",
                                                                    "Java made it slightly easier for me",
                                                                    "The inference notation made it much easier for me",
                                                                    "Java made it much easier for me",
                                                            ]
                                            )
    ],

    training_configuration: {
        can_be_cancelled: true,
        can_be_repeated: true
    },

    finish_pages: [
                        writer.string_page_command(
                            "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
                            "Please, send the " +
                            "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
                            "<p>By sending that mail, you agree that " +
                            "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
                            "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
                            "<a href='https://github.com/shanenbe/Experiments/blob/main/2024_TypeSystems_ConstructorCall_Flat/Agreement.pdf' target='_blank'>here</a>. " +
                            "Note, that it it no longer necessary to send a signed version of the agreement to the experimenter.<br><br>" +
                            "After sending your email, you can close this window.</p>" +
                            "<p>Many thanks for your participation.<br>" +
                            "-Stefan Hanenberg</p>"
                        )
                    ],

    layout: [
        { variable: "Version",  treatments: ["1", "2"]},
        { variable: "Answer",  treatments: ["0", "1"]},
    ],

    repetitions: 10,

    measurement: Reaction_Time(keys(["0", "1"])),

    task_configuration:    (t:Task) => {


        // generate_code(   t.treatment_value("Version")
        //                  t.treatment_value("Answer")
        // )/
        let string_to_show = "";

        let guard_executed: boolean = t.treatment_value("Answer") == "1";

        if(t.treatment_value("Version") == "1")
            string_to_show = generated_version_1(guard_executed);
        else if(t.treatment_value("Version") == "2")
            string_to_show = generated_version_1(guard_executed);
        else
            throw "does not work";

        t.expected_answer = "42";
        t.do_print_task = () => {
            writer.clear_stage();
            writer.print_html_on_stage(
                "<div class='sourcecode'>" + string_to_show + "<div>"
            );
        };

        t.accepts_answer = (s) => true;

        t.do_print_after_task_information = () => {
            writer.print_error_string_on_stage(writer.convert_string_to_html_string(
                "The correct answer was: " + t.expected_answer + "\n\n" +
                "In case, you feel not concentrated enough, make a short break.\n\n" +
                "Press [Enter] to go on. "));
        }
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
