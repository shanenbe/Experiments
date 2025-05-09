import { BROWSER_EXPERIMENT } from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
import { alternatives, keys, Reaction_Time, SET_SEED } from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import { generate_code } from "./Generate_Code.js";
let intro_pages = [null, null, null, null, null];
intro_pages[0] =
    "<p>Thank you for participating in the experiment.</p>" +
        "<p>This experiment is about the language constructs immutability/mutability and ownership, constructs that appear for example in the programming language Rust.</p>" +
        "<p>On the following pages, you will receive a short tutorial to this experiment. Please, read the tutorial carefully.</p>";
let ws = (n) => "&nbsp;".repeat(n);
intro_pages[1] =
    "<p>If you pass in Rust a variable to a different function, the calling function looses its ownership and the variable cannot be used in the calling function for a second time." + "</p>" +
        "<p>The following (wrong!) code shows a main method where a variable v (which is a vector) is passed to a function f. </p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = vec![0, 3, 8];<br>" +
        "&nbsp;&nbsp;f(v);" + ws(20) + "// Here, the variable v is passed to the function f (main looses the ownership of v).<br>" +
        "&nbsp;&nbsp;println!(\"{}\", v[1]);&nbsp;&nbsp;&nbsp;&nbsp;// This is wrong, because the variable v is no longer owned by the main function.<br>" +
        "}<br><br>" +
        "fn f(v_start: Vec&lt;i32&gt;){}" +
        "</div>" +
        "<p>When the vector is passed, main function does no longer own the variable v. Hence, the main function cannot print out the vector at the second position (via v[1]).</p>" +
        "<p>One way to keep the ownership is to pass a reference. I.e., the vector v must be defined as a reference to a vector. The function that receives the vector must " +
        "declare the parameter as a reference as well.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = &vec![0, 3, 8];" + ws(5) + "// Definition of the vector as a reference via the token &<br>" +
        "&nbsp;&nbsp;f(v);" + ws(23) + "// Here, the variable v is passed as a reference to f (ownership of v is kept).<br>" +
        "&nbsp;&nbsp;println!(\"{}\", v[1]);" + ws(7) + "// This is now valid, because the reference v is passed (and kept in the calling function).<br>" +
        "}<br><br>" +
        "fn f(v_start: &Vec&lt;i32&gt;){}" +
        "</div>" +
        "<p>Alternatively, one can also pass the explicit reference to a function.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = vec![0, 3, 8];" + ws(5) + "// Definition of the vector as a reference via the token &<br>" +
        "&nbsp;&nbsp;f(&v);" + ws(23) + "// Here, the variable v is passed as a reference to f (ownership of v is kept).<br>" +
        "&nbsp;&nbsp;println!(\"{}\", v[1]);" + ws(7) + "// This is now valid, because the reference v is passed (and kept in the calling function).<br>" +
        "}<br><br>" +
        "";
intro_pages[2] =
    "<p>Another issue in Rust is mutability. You can change only variables that are declared as mutable (mut). For example, the following code is not valid, because" +
        " the vector v (respectively the reference) is not mutable.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = &vec![0, 3, 8];<br>" +
        "&nbsp;&nbsp;v[0]=3;" + ws(20) + "// Invalid change, because v is not mutable.<br>" +
        "}<br>" +
        "</div>" +
        "<p>To change the code in a compilable version, one needs to declare the vector v as mutable.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = &mut vec![0, 3, 8];" + ws(3) + "// Definition of the vector as a mutable reference via tokens &mut<br>" +
        "&nbsp;&nbsp;v[0]=3;" + ws(23) + "// Now, the vector can be changed.<br>" +
        "}<br>" +
        "</div>" +
        "<p>Mutability is also required, if a function receives a reference that it wants to change. Thereto, a variable has to be declared as mutable." +
        "</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let v = &mut vec![0, 3, 8];" + ws(3) + "// Definition of the vector as a mutable reference via tokens &mut<br>" +
        "&nbsp;&nbsp;f(v);" + ws(25) + "// The vector can be passed without losing the ownership.<br>" +
        "}<br><br>" +
        "fn f(v_start: &mut Vec&lt;i32&gt;){ &nbsp;// function requires mutable vector<br>" +
        "&nbsp;&nbsp;v_start[1]=2;" + ws(16) + "// Changes the second element of the vector<br>" +
        "}" +
        "</div>" +
        "</div>" +
        "<p>Alternatively, the variable is marked as mutable reference when it is passed.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let mut v = vec![0, 3, 8];" + ws(3) + "// Definition of the vector as mutable<br>" +
        "&nbsp;&nbsp;f(&mut v);" + ws(23) + "// Passing the vector as mutable reference.<br>" +
        "}<br><br>" +
        "fn f(v_start: &mut Vec&lt;i32&gt;){ &nbsp;// function requires mutable vector<br>" +
        "&nbsp;&nbsp;v_start[1]=2;" + ws(16) + "// Changes the second element of the vector<br>" +
        "}" +
        "</div>";
;
intro_pages[3] =
    "<p>In the present experiment, code will be given to you in the programming languages Java and the programming language Rust. " +
        "The code consists of a main function where a vector is defined and passed to eight other functions. The last line of the" +
        "main function contains a runtime-error: the vector is accessed at a position that does not exist. I.e., one of the invoked " +
        "functions must have accidentally changed the vector.</p>" +
        "<p>The following code snipped illustrates an example of the Rust function. Note, that only methods that receive a mutable reference can change the variable.</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "fn main() {<br>" +
        "&nbsp;&nbsp;let mut vector = vec![48, 50, 57, 21, 32, 82, 82];<br>" +
        "&nbsp;&nbsp;function_1(&mut vector);<br>" +
        "&nbsp;&nbsp; ... // seven more calls to function_2 up to function_8.<br>" +
        "&nbsp;&nbsp;// ERROR: OUT OF BOUNDS<br>" +
        "&nbsp;&nbsp;let vec_value_7 = vector[6];<br>" +
        "}<br><br></div>" +
        "<p>The following code snipped illustrates an example of the Java function (in the experiment, we do not show the whole class definition, but only the relevant Java methods).</p>" +
        "<div style=\"font-family:'Courier New'\">" +
        "public static void main(String[] args) {<br>" +
        "&nbsp;&nbsp;var vector = Vector.new(41, 33, 63, 85, 75, 54, 81);<br>" +
        "&nbsp;&nbsp;function_1(vector);<br>" +
        "&nbsp;&nbsp; ... // seven more calls to methods function_2 up to function_8.<br>" +
        "&nbsp;&nbsp;// ERROR: OUT OF BOUNDS<br>" +
        "&nbsp;&nbsp;var vec_value_7 = vector[6];<br>" +
        "}<br><br></div>" +
        "<p>In the experiment, there is a link from the function calls to the function definitions. I.e. you can click on a function call in order to see the function definition.</p>";
intro_pages[4] =
    "<p>All functions looks similar. There, a number of variables is declared that are either initialized by a different variable, by a clone of a variable, or via a new vector, i.e., each variable" +
        "is a representation of a vector. The incoming parameter always has the name v_start. The last line of each function is a call of the function clear on a vector, i.e., the content of the vector is deleted. </p>" +
        "<p>The following code is an example of a Java method." +
        "<div style=\"font-family:'Courier New'\">" +
        "void function_6(Vector v_start) {<br>" +
        "&nbsp;&nbsp;var v_birds = Vector.new(59, 59, 53, 26, 96, 91, 38);<br>" +
        "&nbsp;&nbsp;var v_chess = v_birds.clone();<br>" +
        "&nbsp;&nbsp;var v_coat = v_chess.clone();<br>" +
        "&nbsp;&nbsp;var v_effect = v_birds;<br>" +
        "&nbsp;&nbsp;var v_shoes = Vector.new(99, 15, 17, 3, 15, 11, 37);<br>" +
        "&nbsp;&nbsp;var v_level = v_start.clone();<br>" +
        "&nbsp;&nbsp;var v_burst = v_chess.clone();<br>" +
        "&nbsp;&nbsp;var v_love = v_level;<br>" +
        "&nbsp;&nbsp;var v_popcorn = v_coat.clone(); <br>" +
        "&nbsp;&nbsp;var v_wash = v_popcorn.clone();<br>" +
        "&nbsp;&nbsp;<br><br>" +
        "&nbsp;&nbsp;v_love.clear();<br>" +
        "}  // Back to main <br>" +
        "</div><br>" +
        "<p>In the example, the method does not change the content of the incoming vector, because clear is invoked on the variable v_love, which is an alias of the variable v_level, which itself" +
        " is a clone (i.e., a copy) of the incoming variable v_start. I.e., the function does not change v_start but a copy of the vector (which means that the effect cannot be seen in" +
        " a calling method).</p>" +
        " Please, read the code above carfully (because you will have to read such code in the experiment). In the experiment, the last comment (back to main) is a link that navigates back to the main function.";
intro_pages[5] =
    "<p>The following code shows an example of a Rust function." +
        "<div style=\"font-family:'Courier New'\">" +
        "fn function_8(v_start: &mut Vec<i32>) {<br>" +
        "&nbsp;&nbsp;let v_stop = vec![15, 61, 47, 72, 73, 48, 91];<br>" +
        "&nbsp;&nbsp;let v_guitar = v_stop.clone();<br>" +
        "&nbsp;&nbsp;let v_front = v_guitar;<br>" +
        "&nbsp;&nbsp;let v_rice = v_start;<br>" +
        "&nbsp;&nbsp;let v_tub = v_stop.clone();<br>" +
        "&nbsp;&nbsp;let v_circle = v_stop.clone();<br>" +
        "&nbsp;&nbsp;let mut v_night = v_rice;<br>" +
        "&nbsp;&nbsp;let v_profit = v_stop.clone();<br>" +
        "&nbsp;&nbsp;let v_apparatus = v_profit.clone();<br>" +
        "&nbsp;&nbsp;let v_brother = vec![85, 25, 51, 58, 50, 99, 42];<br><br>" +
        "&nbsp;&nbsp;v_night.clear();<br>" +
        "} // Back to main" +
        "</div>" +
        "<p>The code above changes the incoming variable, because the variable v_nights is an alias of the variable v_rice, which is an alias of the incoming variable.</p>";
intro_pages[6] =
    "<p>The experiment shows you Java code or Rust code and it is the participant's task to decide, what function changes the content of the vector defined in the main. If you" +
        "found that function, just press the button of the function's number (e.g. press [2] if the second function changes the content of the vector).</p>" +
        "<p>The experiment starts with a training phase. Please, use this training phase in order to get used to the experiment and the shown code. The training is repeated until you explicitly start the experiment phase (by pressing [ESC].</p>" +
        "</p>";
"<p>The experiment phase consists of 32 tasks.</p>" +
    "<p>Again, thank you for participating.</p>" +
    "";
let SEED = "42";
SET_SEED(SEED);
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Rust_Readability",
        seed: SEED,
        introduction_pages: [
            () => writer.print_html_on_stage(intro_pages[0]),
            () => writer.print_html_on_stage(intro_pages[1]),
            () => writer.print_html_on_stage(intro_pages[2]),
            () => writer.print_html_on_stage(intro_pages[3]),
            () => writer.print_html_on_stage(intro_pages[4]),
            () => writer.print_html_on_stage(intro_pages[5])
        ],
        pre_run_training_instructions: writer.string_page_command("You entered the training phase. You can skip the training by pressing [Esc]."),
        pre_run_experiment_instructions: writer.string_page_command("You entered the experiment phase."),
        post_questionnaire: [
            alternatives("Age", "What's your age??", [
                "younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30",
                "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"
            ]),
            alternatives("Status", "What is your current working status?", [
                "Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student",
                "Professional software developer", "Teacher", "Other"
            ]),
            alternatives("Studies", "In case you study, what's your subject?", [
                "I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)",
                "something else in natural sciences", "something else"
            ]),
            alternatives("YearsOfExperience", "How many years of experience do you have in software industry?", [
                "none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years",
                "more than 3 years, but less than or equal 5 year", "more than 5 years"
            ]),
            alternatives("impression", "What statement describes best your impression \n\ of the experiment?", [
                "I do not think that there was a difference between the notations",
                "The inference notation made it slightly easier for me",
                "Java made it slightly easier for me",
                "The inference notation made it much easier for me",
                "Java made it much easier for me",
            ])
        ],
        training_configuration: {
            can_be_cancelled: true,
            can_be_repeated: true
        },
        finish_pages: [
            writer.string_page_command("<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
                "Please, send the " +
                "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
                "<p>By sending that mail, you agree that " +
                "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
                "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
                "<a href='https://github.com/shanenbe/Experiments/blob/main/2025_Rust_Readability/Agreement.pdf' target='_blank'>here</a>. " +
                "Note, that it is not necessary to send a signed version of the agreement to the experimenter.<br><br>" +
                "After sending your email, you can close this window.</p>" +
                "<p>Many thanks for your participation.<br>" +
                "-Stefan Hanenberg</p>")
        ],
        layout: [
            { variable: "Group", treatments: [
                    "Rust 2",
                    "Rust 5",
                    "Rust 8",
                    "Java 8"
                ] },
            { variable: "Area", treatments: ["1st half", "2nd half"] }
        ],
        repetitions: 4,
        measurement: Reaction_Time(keys(["1", "2", "3", "4", "5", "6", "7", "8"])),
        task_configuration: (t) => {
            let number_of_mutables = parseInt(t.treatment_value("Group")[t.treatment_value("Group").length - 1]);
            let error_half = t.treatment_value("Group") == "1st half" ? 1 : 2;
            let code_tree = generate_code(number_of_mutables, error_half);
            let code;
            if (t.treatment_value("Group").startsWith("Java"))
                code = code_tree.main_function.as_html_java_code();
            else
                code = code_tree.main_function.as_html_Rust_code();
            t.expected_answer = code_tree.solution_index;
            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<div class='sourcecode'>"
                    + code
                    + "</div>");
            };
            t.accepts_answer = (s) => true;
            t.do_print_after_task_information = () => {
                writer.clear_stage();
                writer.print_error_string_on_stage(writer.convert_string_to_html_string("The correct answer was: " + t.expected_answer + "\n\n" +
                    "In case, you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on. "));
            };
        }
    };
};
BROWSER_EXPERIMENT(experiment_configuration_function);
//# sourceMappingURL=experiment_configuration_.js.map