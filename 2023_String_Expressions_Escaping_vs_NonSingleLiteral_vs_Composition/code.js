try {
        document.set_seed('42');
} catch (e) {
}

function random_number(n) {
    try {
        return document.new_random_integer(n);
    } catch (e) {
        return Math.floor(Math.random() * n);
    }
}

function random_boolean() {
    return random_number(2)>0;
}

function create_random_abstract_expression(length) {
    let ret = ["?I?=?I?"];

    for (let i = 0; i <= length; i++) {
        ret.push("B");
        ret.push(ret[0]);
    }
    return ret.join("");
}

function masked_string(string, mask) {
    let target = string.split("?");

    let result = [];
    for(let i=0; i < target.length; i++) {
        result.push(target[i] + ((mask % 2 == 1)?"?":""));
        mask = Math.floor(mask/2);
    }
    return result.join("");
}

function closing_string_position(a_string, position) {
    while(position < a_string.length) {
        if(a_string[position]=="?")
            return position;
        else
            position++;
    }
    return -1;
}


/**
 * I really know that this implementation sucks  - I am really sorry.
 */
function error_position(a_string) {
    let result = generated_concrete_syntax(a_string).join("")
    // let has_open_string = false;
    // let read_position = scan(a_string, 0, result);
    // let res_string = result.join("");

    // this is how a correct string should look like: (I|S)O(I|S) (B(I|S)O(I|S))*
    for (let position = 0; position < a_string.length;) {

        if(a_string[position]=="?") {
            let closing_position = closing_string_position(a_string, position+1);
            if(closing_position == -1 )
                return a_string.length;
            else
                position = closing_position + 1;
        } else if (a_string[position]=="I") {
            position = position + 1;
        } else {
            return position;
        }

        if(position >= a_string.length)  return a_string.length;

        if(a_string[position]!="=")
            return position ;
        else {
            position++;
            if(a_string[position]=="?") {
                let closing_position = closing_string_position(a_string, position+1);
                if(closing_position == -1 )
                    return a_string.length;
                else
                    position = closing_position + 1;
            } else if (a_string[position]=="I") {
                position = position + 1;
            } else {
                return position;
            }
        }

        if(position >= a_string.length)  return -1;

        if(a_string[position]!="B")
            return position;
        else {
            position++;
        }
    }

    return -1;
}

function generated_concrete_syntax(a_string) {
    let res=[];
    for (let i = 0; i < a_string.length; i++) {
        if(a_string[i]=='I')
            res.push("X");
        if(a_string[i]=='=')
            res.push(" = ");
        if(a_string[i]=='B')
            res.push([" AND ", " OR "][random_number(2)]);

        if(a_string[i]=='?')
            res.push('?');
    }

    return res;
}

/**
 * Creates a random string and returns whether the string is a valid
 **/
function target_string(num_operators, error_position_quartile) {

    let pos;
    let ms;

    do {
        let target = create_random_abstract_expression(num_operators);
        let num_questionmarks = target.match(/\?/g).length;
        let mask = random_number(Math.pow(2, num_questionmarks));
        ms = masked_string(target, mask);

        pos = error_position(ms);
    } while( (pos >= (ms.length / 4)*(error_position_quartile) || pos < (ms.length / 4)*(error_position_quartile - 1)) && !(error_position_quartile==-1 && pos==-1))

    let result_string = generated_concrete_syntax(ms).join("");


    return {string: result_string, error_pos: pos};
}

function random_expression(num_operators, read_quartile, separation_string) {
    let ret = target_string(num_operators, read_quartile);
    return {string: ret.string.split("?").join(separation_string), error_pos: ret.error_pos};
}

function composed_string(num_operators, read_quartile) {
    let ret = random_expression(num_operators, read_quartile, "\" + QUOTE + \"");
    if (ret.string.startsWith("\" + QUOTE"))
        if(ret.string.endsWith("QUOTE + \""))
            return {string: ret.string.slice(4, ret.string.length - 4), error_pos: ret.error_pos};
        else
             return {string: ret.string.slice(4) + '"', error_pos: ret.error_pos};
    return {string: '"' + ret.string + '"', error_pos: ret.error_pos};
}

function contained_string(num_operators, read_quartile) {
    let ret = random_expression(num_operators, read_quartile, '"');
    return {string: "'" + ret.string + "'", error_pos: ret.error_pos};
}

function backslashed(num_operators, read_quartile) {
    let ret = random_expression(num_operators, read_quartile, '\\"');
    return {string: '"' + ret.string + '"', error_pos: ret.error_pos};
}

function test(b, text) {
    console.log(text);
    if(b) return;
    throw text;
}

test(error_position("I?=?I?") == 1, "1");
test(error_position("I?=?I?B?I?") == 1, "2");
test(error_position("?I?=?I?") == -1, "3");

// console.log(contained_string(5, 4));

try {
    document.experiment_definition(
        {
            experiment_name: "String_Expression_Escaping_Composition_Containment",
            seed: "42",
            introduction_pages: [
                "Running the experiment (without training) takes between 5 and 10 minutes.\n\n" +
                "In the following, a string it shown whose content might or might not be a valid expression." +
                "The question you have to answer for each string is, whether is is a valid expression [1] or not [0].\n\n" +
                "The following strings represent valid expressions:\n\n" +
                "  X=X AND X=\"X\" AND \"X\"=\"X\"     (the value a is compared to itself, then to a string, then two strings are compared)\n" +
                "  \"X=X AND X=X AND X\"=\"X\"     (a long string is compared to the string \"X\")\n" +
                "  X=\"X AND X=X AND X=X\"     (X is compared to a long string)\n\n\n" +

                "The following strings represent invalid expressions:\n\n" +
                "  X=X AND X=\"X AND \"X=X     (after the string \"X AND\" the variable X appears)\n" +
                "  \"X=X\" AND X=X     (the string \"X =X\" cannot be compared with the Operator AND)\n" +
                "  X=\"X AND X\"=X AND X=X (after the string \"X AND X\" appears the token=)\n\n\n" +

                "Sometimes, the strings are written in a composed way where the Variable QUOTE represents a quotation mark.\n\n" +


                "The experiment consists of a training phase and an experiment phase.\n\n" +
                "The training phase is only for you to get familiar with the " +
                "questions and the experiment. Please traing before running the experiment!\n\n" +
                "You can cancel the training session whenever you like and whenever you feel\n" +
                "that there is no longer any need for you to practice.\nAs long " +
                "you do not cancel the training, new code snippets will be shown to you.\n\n" +
                "When the you see the first task in the training session, please increase/decrease the font " +
                "in the browser so that you can see all lines of code (plus some additional lines).\n\n" +
                "Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] " +
                "or [CTRL] + [.].\n\n" +
                "Press [Return] to enter the training phase.\n\n" +
                "Note: you can always make a pause between two tasks, when you pressed a button and the correct result will be shown."],
            pre_run_instruction: "Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.",
            finish_pages: ["Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
            "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de. \n\n" +
            "Additionally to the experiment data, it is necessary that you send the signed \n" +
            "information sheet to the same mail address. You can download the information sheet at:\n\n" +
            "https://github.com/shanenbe/Experiments/blob/main/2023_Indentation_JSON/Aufkl%C3%A4rungbogen%20und%20Einverst%C3%A4ndniserkl%C3%A4rung%20zur%20Teilnahme%20an%20der%20Studie.pdf\n\n" +
            "Please write additionally on the information sheet, how many years of working experience as a software developer you have.\n\n" +
            "Again, thanks for participating.\n\n" +
            "Stefan"],
            layout: [
                {variable: "Representation", treatments: ["composed", "contained", "backslashed"]},
                {variable: "Read_Position_quartile",       treatments: ["2", "3", "-1"]},
            ],
            repetitions: 4,                    // Anzahl der Wiederholungen pro Treatmentcombination
            accepted_responses: ["1", "0"],

            task_configuration: (t) => {
                let this_quartile = parseInt(t.treatment_combination[1].value);


                let s;
                if (t.treatment_combination[0].value == "composed") {
                    s = composed_string(1, this_quartile);
                } else if (t.treatment_combination[0].value == "contained") {
                    s = contained_string(1, this_quartile);
                } else if (t.treatment_combination[0].value == "backslashed") {
                    s = backslashed(1, this_quartile);
                }
                t.code = s.string;
                t.expected_answer = (s.error_pos==-1?1:0);

                t.after_task_string = () => "The correct answer was: " + t.expected_answer + "\n\npress [ENTER] to start with the next task";
            }
        }
    );
} catch (ex) {

}
