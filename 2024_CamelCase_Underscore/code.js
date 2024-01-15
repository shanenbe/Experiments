// @ts-ignore

// @ts-ignore
document.nof1.set_seed('42');

let vocals = ['a', 'e', 'i', 'o', 'u'];

function is_vocal(letter) {
    for(let a_vocal of vocals) {
        if(letter === a_vocal)
            return true;
    }
    return false;
}

function random_word(collection) {
    return collection[document.nof1.new_random_integer(collection.length)];
}

function change_vocal(vocal) {
    let new_vocal = vocal;
    while(new_vocal===vocal) {
        new_vocal = vocals[document.nof1.new_random_integer(vocals.length)];

    }
    return new_vocal;
}

function change_consonant(consonant) {
    let new_consonant = consonant;
    while(new_consonant===consonant) {
        new_consonant = String.fromCharCode(96 + document.nof1.new_random_integer(27));
    }
    return new_consonant;
}

function generate_word(length) {
    let word = [];
    for(let i = 1; i<=length; i++) {
        word.push(random_word(document.nof1.nouns.words));
    }
    return word;
}

function change_letter(letter) {
    if(is_vocal(letter))
        return change_vocal(letter);
    else
        return change_consonant(letter);
}
function change_position(word, position) {
    let replacement_letter = change_letter(word[position]);
    let ret = word.slice(0, position) + replacement_letter + word.slice(position+1, word.length);
    return ret;
}

function change_word(word) {
    let random_position = document.nof1.new_random_integer(word.length);
    let new_word = change_position(word, random_position);
    return new_word;
}

function change_identifier(word) {
    let ret = [];
    let random_position = document.nof1.new_random_integer(word.length);
    for(let i = 0; i<random_position; i++) {
        ret.push(word[i]);
    }
    ret.push(change_word(word[random_position]));

    for(let i = random_position+1; i<word.length; i++) {
        ret.push(word[i]);
    }
    return ret;
}

function word_to_uppercase(wordArray) {
    let ret = [wordArray[0]];
    for(let i = 1; i < wordArray.length; i++) {
        ret.push((wordArray[i][0]).toUpperCase() + wordArray[i].slice(1, wordArray[0].length));
    }
    return ret;
}

function word_to_camelCase(wordArray) {
    let ret_array = word_to_uppercase(wordArray);
    return ret_array.join("");
}

function word_to_snake_case(wordArray) {
    let ret_array = word_to_uppercase(wordArray);
    return ret_array.join("_");
}

function shuffle_collection(collection) {
    let ret = [];
    while(collection.length>0) {
        let index = document.nof1.new_random_integer(collection.length);
        ret.push(collection[index]);
        collection.splice(index, 1);
    }
    return ret;
}
function generate_camelCase_task(num_matches) {
        return generate_task(num_matches, word_to_camelCase);
}

function generate_snake_case_task(num_matches) {
    return generate_task(num_matches, word_to_snake_case);
}


function generate_task(num_matches, f) {
    let target_type = f(generate_word(3 + document.nof1.new_random_integer(2)));
    let target_identifier = generate_word(3);
    let first_line = "TYPE" + target_type + "    " + f(target_identifier) + "    =    42;\n";

    let matches = [];
    for(let match = 1; match <= num_matches; match++) {
        if (document.nof1.new_random_integer(2)==1) {
            matches.push(f(change_identifier(target_identifier)) + "  =  " + f(target_identifier) + ";");
        } else {
            matches.push(f(target_identifier) + "  =  " + f(change_identifier(target_identifier))+ ";");
        }
    }

    for(let unmatch = num_matches; unmatch <3 ; unmatch++) {
        if (document.nof1.new_random_integer(2)==1) {
            matches.push(f(change_identifier(target_identifier)) + "  =  " + f(change_identifier(target_identifier))+ ";");
        } else {
            matches.push(f(change_identifier(target_identifier)) + "  =  " + f(change_identifier(target_identifier))+ ";");
        }
    }

    matches = shuffle_collection(matches);

    let result = [first_line];
    for(let i = 0; i<matches.length; i++) {
        result.push(matches[i]);
    }

    return result.join("\n");
}


// let ccWord = generate_camelCase_task(3);
// let scWord = generate_snake_case_task(3);
// console.log(scWord);
// console.log(ccWord);
// console.loc("dummy");

// @ts-ignore
document.nof1.experiment_definition(
    {
        experiment_name: "N_of_1 Template",
        seed: "123456",
        introduction_pages: [
                                "Running the experiment (without training) takes between 5 and 10 minutes.\n\n" +
                                "\n\nThe experiment consists of a training phase and an experiment phase.\n\n" +
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
                                "Note: you can always make a pause between two tasks, when you pressed a button and the correct result will be shown."
                            ],
        pre_run_instruction:
                                "Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.\n" +
                                "\n Count, how often the variable in the first line is used.",
        finish_pages: [
                        "Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                        "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de. \n\n" +
                        "Additionally to the experiment data, it is necessary that you send the signed \n" +
                        "information sheet to the same mail address. You can download the information sheet at:\n\n" +
                        "https://github.com/shanenbe/Experiments/blob/main/2023_Indentation_JSON/Aufklaerungsbogen.pdf\n\n" +
                        "Please write additionally on the information sheet, how many years of working experience as a software developer you have.\n\n" +
                        "Again, thanks for participating.\n\n" +
                        "Stefan"
                      ],
        layout: [
            {variable: "Notation", treatments: ["CamelCase", "Snake_Case"]},
            {variable: "Occurances", treatments: ["1", "2", "3"]},
        ],
        repetitions: 15,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses: ["1", "2", "3"],

        // Note that t.task_number_in_execution is not yet set!
        task_configuration: (t) => {
            let  answer = parseInt(t.treatment_combination[1].value);
            if(t.treatment_combination[0].value==="CamelCase") {
                t.code_string(generate_camelCase_task(answer));
            } else {
                t.code_string(generate_snake_case_task(answer));
            }

            t.expected_answer = t.treatment_combination[1].value;
            t.after_task_string_constructor(() => "The correct answer was: " + t.expected_answer + "\n\n" +
                                             "The given answer was" + t.given_answer + "\n\n" +
                                             "press [ENTER] to start with the next task");

        }
    }
);

