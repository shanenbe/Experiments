import {BROWSER_EXPERIMENT} from "../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js";
import {
    alternatives,
    Experiment_Output_Writer, free_text, information, keys, random_array_element, Reaction_Time,
    SET_SEED,
    text_input_experiment,
    Time_to_finish
} from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import {Task} from "../../N-of-1-Experimentation/modules/Experimentation/Task.js";
import {create_tasks_grouped_by_error_position, Feature_Term_with_Typing_rules} from "./code/Feature.js";

let SEED = "42";

SET_SEED(SEED);

let tasks = create_tasks_grouped_by_error_position();

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name: "TypeSystems-ConstructorCalls-Hierarchical",
    seed: SEED,

    introduction_pages: [

        ()=>writer.print_string_on_stage("Thank you for participating in the experiment. This experiment compares the possible effect of different\nnotations on readability in the context of programming language design.<br<br>" +
            "<p>Before doing the experiment, please start your browser in full-screen mode (probably by pressing <code>[F11]</code>).</p>" +
            "<p>In the experiment, a typing rule for the programming language construct called <code>feature</code> is given. The rule consists of three types: one function type and two types that refer to the left or right side of that " +
            "function type. The typing rules are either described using an inference notation or using Java.<br><br>" +
            "The next page introduces the inference language."),


        ()=>{writer.print_string_on_stage("There are simple rules that say that a given literal <code>myterm</code> has the type <code>BOOL</code>, that a term <code>otherterm</code> has the type <code>NUMBER</code>, or that <code>somethingelse</code> " +
            "is a function that maps a <code>NUMBER</code> to a <code>BOOL</code>. They look as follows:<br><br>" +
            "$\\scriptsize{\\mathrm{myterm:BOOL}}$<br>" +
            "$\\scriptsize{\\mathrm{otherterm:NUMBER}}$<br>" +
            "$\\scriptsize{\\mathrm{somethingelse:NUMBER}\\rightarrow\\mathrm{BOOL}}$<br><br>" +

            "The left hand side of a rule describes the terminal (such as <code>myterm</code>, the right hand side describes the type (such as <code>BOOL</code>).<br><br>" +
            "Type systems describe rules that are slightly more complex than the definition of types for literals. In such rules, some context is required that is represented by an environment variable which is traditionally called in " +
            "type systems <code>E</code>. Furthermore, there is an operator $\\vdash$ that described that some type relationship can be derived from an environment (actually, in the present study, we do not do anything with the environment - we just mention it " +
            "for reasons of completeness). For example, the rule " +
            "$\\scriptsize{\\mathrm{E}\\,\\vdash\\,\\mathrm{t}:\\mathrm{T}}$ " +
            "describes that it can be inferred from an environment that the term <code>t</code> has the type <code>T</code>. Additionally, there are type rules where some type relationship depends on " +
            "some preconditions, where the preconditions are above a fractional line and the actual rule is below the fractional line. For example the rule<br><br>" +
            "$\\frac{\\mathrm{E}\\,\\vdash\\,\\mathrm{t1}:\\,\\mathrm{T1}\\,\\,\\,\\mathrm{E}\\,\\vdash\\,\\mathrm{t2}:\\mathrm{\\,T2}}{\\mathrm{E}\\,\\vdash\\,\\mathrm{newconstruct(t1\\,\\,t2)}:\\,\\mathrm{T1}}$<br><br>" +
            "says that the type of the new language construct <code>newconstruct</code>, that requires two further terms t1 and t2, has the same type as the first term. Hence, if we combine this with the typing rule above, a term such as<br><br>" +
            "$\\scriptsize{\\mathrm{newconstruct(\\,myterm\\,\\, otherterm) }}$<br><br>" +
            "has a valid type, and that type is <code>Bool</code> (because the first parameter has the type <code>Bool</code>, while the second parameter has the type <code>Number</code>): the type of <code>newconstruct</code> is the " +
            "same as the type of the first parameter. In principle, that's all you need to know for the experiment.<br><br>" +
            "Let's see on the next page how such type systems can be represented using ordinary Java code."

        );// @ts-ignore
            document.update_mathjax();},

        ()=>{writer.print_string_on_stage("We assume in the given experiment, that (in a language implementation) each language construct is defined in it's own class (extending some root class LTerm) and that this class has a method <code>Type type_of(Environment e) {...}</code> " +
            "that returns the type of the given language construct. For the type <code>BOOL</code> and <code>NUMBER</code> we assume the existence of corresponding constants.<br><br>" +
            "Likewise to the previous examples, the following code says that a given literal <code>myterm</code> has the type <code>BOOL</code>, that a term <code>otherterm</code> has the type <code>NUMBER</code>, or that <code>somethingelse</code> " +
            "is a function that maps a <code>NUMBER</code> to a <code>BOOL</code>.<br><br>" +
            "<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +

            "<td style='border: 1px solid black;'><code>class myterm extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class otherterm extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return NUMBER;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class somethingelse extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(NUMBER, BOOL);<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "</tr></table><br><br>" +
            "In order to implement a rule that also has some preconditions, we ask each term for its type (that we might have to cast) and check, whether the types in the preconditions hold. For example, the following code " +
            "checks for the language construct <code>newconstruct</code> the type of the terms t1 and t2 and then returns t1's type (i.e., the return type is the same as the one for t1).<br><br>" +

            "<table style='border: 1px solid black;'><tr style='vertical-align:top'><td style='border: 1px solid black;'>" +
            "<code>class newconstruct extends LTerm {<br>" +
            "&nbsp;&nbsp;LTerm t1, t2;<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type t1_type = t1.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type t2_type = t2.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return t1_type;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +
            "</tr></table><br><br>" +
            "Before starting the experiment, let's see some examples on the next pages."

        );// @ts-ignore
            document.update_mathjax();},

        ()=>{writer.print_string_on_stage("The experiment asks, in what position in a given expression (with given type rules) a type error appears - and possibly there is no type error. " +
            "In the experiment, there are two different literals (that have the type <code>BOOL</code> or <code>NUMBER</code>) and one additional literal that has a function type (either <code>BOOL->NUMBER</code> or <code>NUMBER->BOOL</code>)." +
            "One expression for the language construct <code>feature</code> (with three literals as parameters) is given. The task is to answer, at what parameter a type errors" +
            "appears in the expression. Possible answers are: 0 (no error), 1 (error in the first parameter), 2, and 3. You give an answer by clicking [0], [1], [2], or [3]." +
            "<br><br>" +
            "Let's see the following code that could appear in the experiment."+

            "<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +

            "<td style='border: 1px solid black;'><code>class exp_1 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_2 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return NUMBER;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_3 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(NUMBER, BOOL);<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'>" +
            "<code>class feature extends LTerm {<br>" +
            "&nbsp;&nbsp;LTerm t1, t2, t3;<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_left = t1.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Function_Type ft = (FunctionType) t2.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_right = t3.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;if(ft.left.equals(type_left) && ft.right.equals(type_right) <br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;throw RuntimeException(\"Invalid Type\");<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +
            "</tr>" +
            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'><code>" +
            "feature(exp_2 exp_1 exp_3)" +
            "</code></td>" +
            "</tr>" +
            "</table><br>" +
            "The first term <code>exp_2</code> has the type <code>NUMBER</code> (which does not lead to an error),<br>" +
            "The second term <code>exp_1</code> has the type <code>BOOL</code>, however, it must be a function type. I.e., there a type error occurs (and the right answer is 2).<br>" +
            "Let's take a look at another example."

        );// @ts-ignore
            window.MathJax.typeset();},

        ()=>{writer.print_string_on_stage(

            "<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +

            "<td style='border: 1px solid black;'><code>class exp_1 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_2 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(NUMBER, BOOL);<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_3 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return NUMBER;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'>" +
            "<code>class feature extends LTerm {<br>" +
            "&nbsp;&nbsp;LTerm t1, t2, t3;<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Function_Type ft = (FunctionType) t1.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_left = t2.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_right = t3.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;if(ft.left.equals(type_left) && ft.right.equals(type_right) <br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;throw RuntimeException(\"Invalid Type\");<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +
            "</tr>" +
            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'><code>" +
            "feature(exp_2 exp_1 exp_3)" +
            "</code></td>" +
            "</tr>" +
            "</table><br>" +
            "The first term <code>exp_2</code> has the type <code>NUMBER->BOOL</code> (which is fine),<br>" +
            "The second term <code>exp_1</code> has the type <code>BOOL</code>, but it is assumed to have the left type of the function type (which is <code>NUMBER</code>), hence, exp_1 leads to an error (and the right answer is 2).<br>" +
            "Let's take a look at another example."

        );// @ts-ignore
            window.MathJax.typeset();},
        ()=>{writer.print_string_on_stage(

            "<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +

            "<td style='border: 1px solid black;'><code>class exp_1 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(BOOL, NUMBER);<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_2 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return NUMBER;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<td style='border: 1px solid black;'><code>class exp_3 extends LTerm {<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +

            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'>" +
            "<code>class feature extends LTerm {<br>" +
            "&nbsp;&nbsp;LTerm t1, t2, t3;<br>" +
            "&nbsp;&nbsp;Type type_of(Environment e) {<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_right = t1.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Type type_left = t2.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;Function_Type ft = (FunctionType) t3.type_of(e);<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;if(ft.left.equals(type_left) && ft.right.equals(type_right) <br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return BOOL;<br>" +
            "&nbsp;&nbsp;&nbsp;&nbsp;throw RuntimeException(\"Invalid Type\");<br>" +
            "&nbsp;&nbsp;}<br>" +
            "}</code></td>" +
            "</tr>" +
            "<tr style='vertical-align:top'><td colspan='3' style='border: 1px solid black;'><code>" +
            "feature(exp_3 exp_2 exp_1 )" +
            "</code></td>" +
            "</tr>" +
            "</table><br>" +
            "The first term <code>exp_3</code> has the type <code>BOOL</code> (which is fine),<br>" +
            "The second term <code>exp_2</code> has the type <code>NUMBER</code> (which is fine as well),<br>" +
            "The third term <code>exp_1</code> has the type <code>BOOL->NUMBER</code> but it assumes that the first parameter has the right type of the function. Hence, it causes an error and the right answer is 3.<br>" +
            "Let's see the same examples now with type inference rules."

        );// @ts-ignore
            window.MathJax.typeset();},

        ()=>{writer.print_string_on_stage(

            "$\\small{ \\mathrm{ exp_1:\\,BOOL}}$<br><br>" +
            "$\\small{ \\mathrm{ exp_2:\\,NUMBER}}$<br><br>" +
            "$\\small{ \\mathrm{ exp_3: \\, NUMBER \\rightarrow BOOL}}$<br><br>" +
            "$\\large{\\frac{" +
            "\\mathrm{E\\,\\vdash\\,t_1:\\,T_{left}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_2:\\,T_{left}\\rightarrow\\,T_{right}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_3:\\,T_{right}}" +
            "}{" +
            "\\mathrm{E}\\,\\vdash\\,\\mathrm{feature(t_1\\,\\,t_2\\,\\,t_3):\\,BOOL}" +
            "}}$<br><br>" +
            "$\\small{ \\mathrm{ feature( \\,exp_2 \\,\\,\\, exp_1 \\,\\,\\, exp_3 \\, )}}$<br><br>" +
            "The first term $\\scriptsize{\\mathrm{exp_2}}$ has the type <code>NUMBER</code> (which does not lead to an error),<br>" +
            "The second term $\\scriptsize{\\mathrm{exp_1}}$ has the type <code>BOOL</code>, however, it must be a function type. I.e., there a type error occurs (and the right answer is 2).<br><br>" +
            "Let's take a look at another example."

        );// @ts-ignore
            window.MathJax.typeset();},

        ()=>{writer.print_string_on_stage(

            "$\\small{ \\mathrm{ exp_1:\\,BOOL}}$<br><br>" +
            "$\\small{ \\mathrm{ exp_2:\\,NUMBER \\rightarrow BOOL}}$<br><br>" +
            "$\\small{ \\mathrm{ exp_3: \\, NUMBER}}$<br><br>" +
            "$\\large{\\frac{" +
            "\\mathrm{E\\,\\vdash\\,t_1:\\,T_{left}\\rightarrow\\,T_{right}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_2:\\,T_{left}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_3:\\,T_{right}}" +
            "}{" +
            "\\mathrm{E}\\,\\vdash\\,\\mathrm{feature(t_1\\,\\,t_2\\,\\,t_3):\\,BOOL}" +
            "}}$<br><br>" +
            "$\\small{ \\mathrm{ feature( \\,exp_2 \\,\\,\\, exp_1 \\,\\,\\, exp_3 \\, )}}$<br><br>" +
            "The first term <code>exp_2</code> has the type <code>NUMBER->BOOL</code> (which is fine),<br>" +
            "The second term <code>exp_1</code> has the type <code>BOOL</code>, but it is assumed to have the left type of the function type (which is <code>NUMBER</code>), hence, exp_1 leads to an error (and the right answer is 2).<br><br></br>" +
            "Let's take a look at the final example."

        );// @ts-ignore
            window.MathJax.typeset();},

        ()=>{writer.print_string_on_stage(

            "$\\small{ \\mathrm{ exp_1:\\,BOOL \\rightarrow NUMBER}}$<br><br>" +
            "$\\small{ \\mathrm{ exp_2:\\,NUMBER }}$<br><br>" +
            "$\\small{ \\mathrm{ exp_3: \\, BOOL}}$<br><br>" +
            "$\\large{\\frac{" +
            "\\mathrm{E\\,\\vdash\\,t_1:\\,T_{right}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_2:\\,T_{left}}\\,\\,\\," +
            "\\mathrm{E\\,\\vdash\\,t_3:\\,T_{left}\\rightarrow\\,T_{right}}" +
            "}{" +
            "\\mathrm{E}\\,\\vdash\\,\\mathrm{feature(t_1\\,\\,t_2\\,\\,t_3):\\,BOOL}" +
            "}}$<br><br>" +
            "$\\small{ \\mathrm{ feature( \\,exp_3 \\,\\,\\, exp_2 \\,\\,\\, exp_1 \\, )}}$<br><br>" +
            "The first term <code>exp_3</code> has the type <code>BOOL</code> (which is fine),<br>" +
            "The second term <code>exp_2</code> has the type <code>NUMBER</code> (which is fine as well),<br>" +
            "The third term <code>exp_1</code> has the type <code>BOOL->NUMBER</code> but it assumes that the first parameter has the right type of the function " +
            "(which is not the case, because the first parameter has the type <code>NUMBER</code>, not <code>BOOL</code>. Hence, it causes an error and the right answer is 3.<br><br>" +
            "Ok, you are now ready to start with the training phase (that you enter by pressing <code>[Enter]</code>)." +
            ""
        );// @ts-ignore
            window.MathJax.typeset();},

    ],

    pre_run_training_instructions: writer.string_page_command(
            "You entered the training phase. In the training phase, you get a random set of tasks, either as Java code or as inference rules.<br><br>" +
            "Please, run the training until you feel familiar with the experiment. This could be - for example - the case when you correctly answered the tasks 10 times.<br><br>" +
            "You can interrupt the training phase by pressing [ESC]. Otherwise, the training phase will be repeated.<br><br>" +
            "<b>Note that you can see that you are in the training phase (top, right of the screen says <code>Training</code>)</b><br><br>" +
            "Note that you give a response to a question by pressing [0], [1], [2], or [3]."
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
            ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"]),

        alternatives("impression", "What statement describes " +
            "                       best your impression \n\ of the experiment?", [
                                                                                "I do not think that there was a difference between the notations",
                                                                                "The inference notation made it slightly easier for me",
                                                                                "Java made it slightly easier for me",
                                                                                "The inference notation made it much easier for me",
                                                                                "Java made it much easier for me",
                                                                              ])
    ],

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
        { variable: "Notation",  treatments: ["inference", "code"]},
        { variable: "Error_position",  treatments: ["0", "1", "2", "3"]},
        { variable: "Terms_to_read",  treatments: ["computed variable"]}
    ],

    repetitions: 4,

    measurement: Reaction_Time(keys(["0", "1", "2", "3"])),

    task_configuration:    (t:Task) => {

        let task:Feature_Term_with_Typing_rules = random_array_element(tasks["" + t.treatment_value("Error_position")]);
        t.set_computed_variable_value("Terms_to_read", ((task.error_position()==0)?"3":("" + task.error_position())));
        t.treatment_combination.treatment_combination[2]

        t.do_print_task = () => {
            writer.clear_stage();

            let html_string;

            if(t.treatment_value("Notation")==="inference") {
                html_string = task.typing_rules_as_code_html_string();
            } else {
                html_string = task.inference_rules_as_html_string();
            }

            writer.clear_stage();
            writer.print_html_on_stage(html_string);
            // @ts-ignore
            window.MathJax.typeset();
        };

        t.expected_answer = "" + task.error_position();

        t.do_print_after_task_information = () => {
            let error_msg = task.response_text();

            writer.print_error_string_on_stage(writer.convert_string_to_html_string(
                error_msg + "\n\n" +
                "In case, you feel not concentrated enough, make a short break.\n\n" +
                "Press [Enter] to go on. "));

            task.debug_help(t);
        }
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);
