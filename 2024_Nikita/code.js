let SEED = "42";

document.set_seed(SEED);

function generate_list() {
    let names = ["Stefan", "Nikita", "Volker", "Klaus", "Amen", "Bastian", "Serina"];
    let ret = [];
    for(let i= 0; i<=3; i++) {
        ret.push(names[document.new_random_integer(names.length)]);
    }
    return ret;
}

function generated_cc() {
    return generate_list().join("");
}

function generate_us() {
    return generate_list().join("_");
}


// Das hier ist die eigentliche Experimentdefinition
document.experiment_definition(
    {
        experiment_name:"NikitasExperiment",
        seed:"42",
        introduction_pages:["Hi, this is Nikita's real, real experiment",

                            "Do identifier stuff.\n\n" +
                            "Press [Return] to enter the training phase."],

        pre_run_instruction:"Be prepared - experimentation starts soon.",

        finish_pages:["Thanks for participating. Send me your csv file - Nikita"],
        layout:[
            {variable:"Notation",treatments:["cc", "us"]}
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1","2","3", "4", "5", "6", "7", "8", "9"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            if (t.treatment_combination[0].value=="cc") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = generated_cc();
            else
                t.code = generate_us();

            t.expected_answer = "0";

            t.after_task_string = ()=>"The correct answer for the code was: " + t.expected_answer;
        }
    }
);
function next_random_int_0_to_9() {
    return document.new_random_integer(10);
}
