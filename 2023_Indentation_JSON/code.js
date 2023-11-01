document.set_seed('42');
let words = [];

function random_noun() {
    let element = document.new_random_integer(document.nouns.words.length);
    return document.nouns.words[element];
    // return "dummy";
}


function create_nodes(max, Fs) {
    let res = [];
    create_node(res, "", "", max, Fs);
    return res;
}

function create_node(result, pre, post, max, Fs) {
    if((pre.length + post.length) > max)
        return;

    let res = [];

    for (let counter = 1;
         (pre.length + post.length - counter < max) && (counter <= Fs);
         counter++)
    {
        create_F(res, pre + "F".repeat(counter), post, max, Fs);
    }
    create_O(res, pre, post, max, Fs);

    for(let i=0; i < res.length; i++) {
        create_node(res, res[i], "", max, Fs)
    }
    // }
}

function create_F(result, pre, post, max, Fs) {
    let word = (pre + post);
    if(word.length==max && (word.match(/F/g) || []).length == Fs && (word.match(/FFF/g) || []).length == 0)  {
        words.push(word);
        // console.log(word);
    }
    if(word.length<max && (word.match(/FFF/g) || []).length ==  0)
        result.push(word);
}

function create_O(result, pre, post, max, Fs) {
    if((pre.length+ post.length) > max)
        return;
    create_node(result, pre + "{" , post + "}", max, Fs);
}

class JSON_Root{}

class JSON_Object extends JSON_Root {
    fields = [];
    parse(string_array) {
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
        let ret = 3;
        for(let c=0; c<this.fields.length;c++) {
            ret = ret + this.fields[c].value.read_NI_depth(depth+1);
        }
        return ret;
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
        }

        result.push("\n" + indentationString.repeat(level) + "}");
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



let nodes = create_nodes(24, 8);
// o = parse_word(words[255]);
// console.log(o.source_code("    "));

let classified_words = {}

for (let i = 0; i < words.length; i++) {
    let JSON = parse_word(words[i]);
    let read_i = JSON.read_I();
    // console.log(read_i);
    let read_ni = JSON.read_NI();
    if(classified_words[""+read_i]==undefined)
        classified_words[""+read_i]={};
    if(classified_words[""+read_i]["" + read_ni]==undefined) {
        classified_words["" + read_i]["" + read_ni] = [];
    }
    classified_words["" + read_i]["" + read_ni].push(JSON);
}

console.log("init done");

document.experiment_definition(
    {
        experiment_name:"Indentation_JSON",
        seed:"42",
        introduction_pages:["Thanks for participating in the experiment on indentation in source code.\n\n" +
        "Running the experiment takes about 15 minutes.\n\n" +
        "In the following, JSON objects will be shown to you.\n" +
        "The question for each object is, how many field it has (i.e. the uppermost object). " +
        "For example, if you see the following statement\n\n" +
        "  {\n" +
        "    \"test:\" \"box\",\n" +
        "    \"blue:\" \"{\"\n" +
        "      \"node:\" \"dummy\"\n" +
        "    }\n" +
        "  }\n" +
        "the answer will be 2, i.e. you have to press the button [2].\n\n",

            "The experiment consists of a training phase an an experiment phase.\n\n" +
            "The training phase is only for you to get familiar with the " +
            "questions and the experiment itself." +
            "You can cancel the training session whenever you like.\nAs long " +
            "you do not cancel the training, new code snippets will be shown to you.\n\n" +
            "When the you see the first task in the training session, please increase/decrease the font " +
            "in the browser so that you can see all lines of code (plus some additional lines).\n" +
            "Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] " +
            "or [CTRL] + [.].\n\n" +
            "Press [Return] to enter the training phase."],
        pre_run_instruction:"Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.",
        finish_pages:["Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
        "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de."],
        layout:[
            {variable:"Indentation",treatments:["indented", "non-indented"]},
            {variable:"Read_I",treatments:["4", "5", "6", "7", "8"]},
        ],
        repetitions:10,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1","2","3", "4", "5", "6", "7", "8", "9"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            let possible_statements =
                classified_words[t.treatment_combination[1].value][35];

            let statement = possible_statements[document.new_random_integer(possible_statements.length)];

            if (t.treatment_combination[0].value=="indented") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = statement.source_code("    ");
            else
                t.code = statement.source_code("");

            t.expected_answer = "" + statement.fields.length;

            t.after_task_string = ()=>"The correct answer was: " + t.expected_answer;
        }
    }
);
