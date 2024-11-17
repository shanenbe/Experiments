// import {BROWSER_EXPERIMENT} from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
// import {
//     alternatives,
//     Experiment_Output_Writer, free_text, information, keys, random_array_element, Reaction_Time,
//     SET_SEED
// } from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
// import {Task} from "../../N-of-1-Experimentation/modules/Experimentation/Task.js";
//
// let SEED = "42";
//
// SET_SEED(SEED);
//
// let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {
//
//     experiment_name: "TypeSystems-ConstructorCalls-Hierarchical",
//     seed: SEED,
//
//     introduction_pages: [
//         ()=>{writer.print_string_on_stage("hi");},
//         ()=>{writer.print_string_on_stage("" +
//             "$\\scriptsize{\\mathrm{somethingelse:NUMBER}\\rightarrow\\mathrm{BOOL}}$<br><br>"
//
//         );// @ts-ignore
//             MathJax.typesetPromise().then(()=> {
//                 console.log("MathJax rendering complete");
//             });
//             // MathJax.typeset();
//     }
//     ],
//
//     pre_run_training_instructions: writer.string_page_command(
//         writer.convert_string_to_html_string(
//             "You entered the experiment phase."
//         )),
//
//     pre_run_experiment_instructions: writer.string_page_command(
//         writer.convert_string_to_html_string(
//             "You entered the experiment phase."
//         )),
//
//     post_questionnaire           :   [
//         alternatives("Age","What's your age??",
//             ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"])
//     ],
//
//     finish_pages: [
//         writer.string_page_command(
//             "done"
//         )
//     ],
//
//     layout: [
//         { variable: "Notation",  treatments: ["inference", "code"]},
//     ],
//
//     repetitions: 1,
//
//     measurement: Reaction_Time(keys(["0", "1", "2", "3"])),
//
//     task_configuration:    (t:Task) => {
//
//         t.do_print_task = () => {
//             writer.clear_stage();
//             let html_string = "$\\\\scriptsize{\\\\mathrm{myterm:BOOL}}$<br>";
//             writer.print_html_on_stage(html_string);
//             // @ts-ignore
//             window.MathJax.typeset();
//         };
//
//         t.expected_answer = "1";
//
//         t.do_print_after_task_information = () => {
//         }
//     }
// }};
//
// BROWSER_EXPERIMENT(experiment_configuration_function);

// @ts-ignore

document.getElementById("STAGE").innerHTML = "<p>" +
"$\\scriptsize{\\mathrm{somethingelse:NUMBER}\\rightarrow\\mathrm{BOOL}}$";
// @ts-ignore
MathJax.typeset();