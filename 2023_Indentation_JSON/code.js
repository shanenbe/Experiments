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

function random_noun() {
    try {
        let element = document.new_random_integer(document.nouns.words.length);
        return document.nouns.words[element];
    } catch (e) {
        return "dummy";
    }
}


class JSON_Root{}

class JSON_Object extends JSON_Root {

    fields = [];
    parse(string_array) {
        this.parsed_string = "{" + string_array.join("") + "}";
        while(string_array.length > 0) {
            let e = string_array[0];
            string_array.shift();
            if(e=="F") {
                this.fields.push({name: random_noun(), value: new JSON_Value(random_noun())})
            } else if (e=="{") {
                let new_field = new JSON_Object();
                this.fields.push({name: random_noun(), value: new_field});
                new_field.parse(string_array);
            } else {
                return;
            }
        }
    }
    read_I() {
        return this.fields.length;
    }

    read_NI() {
        return this.read_NI_depth(0);
    }

    read_NI_depth(depth) {
        let ret = 1;
        for(let c=0; c<this.fields.length;c++) {
            ret = ret + this.fields[c].value.read_NI_depth(depth+1);
        }
        return 2*ret;
    }

    source_code(indentationString) {
        let ret = [];
        this._source_code(ret, indentationString, 0);
        return ret.join("");
    }
    _source_code(result, indentationString, level) {
        result.push("{\n");

        for(let counter=0; counter < this.fields.length; counter++) {
            result.push(indentationString.repeat(level+1) + '"' + this.fields[counter].name + '": ');
            this.fields[counter].value._source_code(result, indentationString, level+1);
            if(counter < this.fields.length-1)
                result.push(',\n');
            else
                result.push("\n");
        }

        result.push(indentationString.repeat(level) + "}");
    }
}
class JSON_Value extends JSON_Root {
    value;

    constructor(value) {
        super();
        this.value = value;
    }

    _source_code(result, indentationString, level) {
        result.push('"' + this.value + '"');
    }

    read_NI() {
        return 1;
    }

    read_NI_depth() {
        return 1;
    }

}

function parse_word(word) {
    let ret = new JSON_Object();
    let string_array = [];
    for(let i=0; i<word.length; i++) {
        string_array.push(word[i]);
    }
    ret.parse(string_array);
    return ret;
}
function random_shuffle(array) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function create_nodes_random(max, Fs) {
    ret = [];
    for (let i = 0; i < FS; i++) {
        ret.push("F");
    }

    for (let i = 0; i < Math.floor(max-FS,2); i++) {
        ret.push("{");
        ret.push("{");
    }


}

function create_random_JSON_Object(lengthh, FS, numObject) {
    let brute_force = create_random_JSON_Pattern(lengthh, FS);
    let o = parse_word(brute_force);
    while(o.fields.length!=numObject) {
        brute_force = create_random_JSON_Pattern(lengthh, FS);
        o = parse_word(brute_force);
    }
    return o;
}

function create_random_JSON_Pattern(lengthh, Fs) {
    let ret = [];
    let shuffeled_ret = [];
    for (let i = 0; i < Fs; i++) {
        ret.push("F");
    }
    for (let i = 0; i < (lengthh-Fs)/2; i++) {
        ret.push("{");
        ret.push("}");
    }

    let num_open_bracket = 0;
    let num_closing_bracket = 0;
    while (ret.length>0) {
        let random_num = random_number(ret.length);

        while(ret[random_num]=="}" && num_closing_bracket==num_open_bracket) {
            random_num = random_number(ret.length);
        }

        if(ret[random_num]=="}")
            num_closing_bracket++;
        if(ret[random_num]=="{")
            num_open_bracket++;

        shuffeled_ret.push(ret[random_num]);
        let ret_length_before = ret.length;
        ret.splice(random_num, 1);
        let ret_length_after = ret.length;

        if(ret_length_after!=ret_length_before-1)
            throw "does not work";
    }
    let return_string = shuffeled_ret.join("");
    let ret_string_length = return_string.length;
    return return_string;
}

document.experiment_definition(
    {
        experiment_name:"Indentation_JSON",
        seed:"42",
        introduction_pages:[
        "Running the experiment (without training) takes between 5 and 10 minutes.\n\n" +
        "In the following, JSON objects will be shown to you.\n" +
        "The question for each object is, how many field it has (i.e. the uppermost object). " +
        "For example, if you see the following statement\n\n" +
        "  {\n" +
        "    \"test:\" \"box\",\n" +
        "    \"blue:\" {\n" +
        "      \"node:\" \"dummy\"\n" +
        "    }\n" +
        "  }\n\n" +
        "the answer will be 2, i.e. you have to press the button [2].\n\n" +
        "The same JSON without indentation (with the same response) looks like:\n\n" +
        "  {\n" +
        "  \"test:\" \"box\",\n" +
        "  \"blue:\" {\n" +
        "  \"node:\" \"dummy\"\n" +
        "  }\n" +
        "  }\n\n" ,

            "The experiment consists of a training phase an an experiment phase.\n\n" +
            "The training phase is only for you to get familiar with the " +
            "questions and the experiment." +
            "You can cancel the training session whenever you like and whenever you feel\n" +
            "that there is no longer any need for you to practice.\nAs long " +
            "you do not cancel the training, new code snippets will be shown to you.\n\n" +
            "When the you see the first task in the training session, please increase/decrease the font " +
            "in the browser so that you can see all lines of code (plus some additional lines).\n\n" +
            "Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] " +
            "or [CTRL] + [.].\n\n" +
            "Press [Return] to enter the training phase.\n\n" +
            "Note: you can always make a pause between two tasks, when you pressed a button and the\n " +
            "correct result will be shown to you."],
        pre_run_instruction:"Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.",
        finish_pages:["Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
        "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de. \n\n" +
        "Additionally to the experiment data, it is necessary that you send the signed \n" +
        "information sheet to the same mail address. You can download the information sheet at:\n\n" +
        "https://github.com/shanenbe/Experiments/blob/main/2023_Indentation_JSON/Aufkl%C3%A4rungbogen%20und%20Einverst%C3%A4ndniserkl%C3%A4rung%20zur%20Teilnahme%20an%20der%20Studie.pdf\n\n" +
        "Again, thanks for participating.\n\n" +
        "Stefan"],
        layout:[
            {variable:"Indentation",treatments:["indented", "non-indented"]},
            {variable:"Number_of_fields",treatments:["1", "3", "5"]},
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{
            let int_value = parseInt(t.treatment_combination[1].value);
            let statement = create_random_JSON_Object(27, 7, int_value);

            if (t.treatment_combination[0].value=="indented") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = statement.source_code("    ");
            else
                t.code = statement.source_code("");

            t.expected_answer = "" + statement.fields.length;

            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer;
        }
    }
);
