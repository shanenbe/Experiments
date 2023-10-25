document.set_seed('42');

function next_random_int_0_to_9() {
    return document.new_random_integer(10);
}

function create_return() {
    return new ReturnStatement(next_random_int_0_to_9());
}

// This function creates all nested if-statements consisting of numIfs of such statements.
// The statements will be store in the results array (that should be probably empty when you
// call the function
function create_statements(numIfs, results) {
    if (numIfs==0) {
        results.push(create_return());
        return;
    } else if (numIfs==1) {
        results.push(new IfStatement(null, create_return(), create_return()));
        return;
    } else {
        for(let then_counter= 0; then_counter < numIfs; then_counter++) {
            let diff = numIfs - then_counter - 1;
            let then_branches = [];
            let else_branches = [];
            create_statements(then_counter, then_branches);
            create_statements(diff, else_branches);
            for(let then_branch=  0;  then_branch < then_branches.length; then_branch++) {
                for(let else_branch=0;  else_branch < else_branches.length; else_branch++) {
                    results.push(new IfStatement(null, then_branches[then_branch], else_branches[else_branch]));
                }
            }
        }
    }
}

class Statement {
    diff() {
        return this.read_non_indent() - this.read_indent();
    }
}

class IfStatement extends Statement{
    condition = false;
    then_branch;
    else_branch;

    constructor(condition, then_branch, else_branch) {
        super();
        this.condition = condition;
        this.then_branch = then_branch;
        this.else_branch = else_branch;
    }

    clone() {
        return new IfStatement(this.condition, this.then_branch.clone(), this.else_branch.clone());
    }

    create_all_condition_trees(result) {
        let all_then_condition_trees =  [];
        let all_else_condition_trees =  [];
        this.then_branch.create_all_condition_trees(all_then_condition_trees);
        this.else_branch.create_all_condition_trees(all_else_condition_trees);

        for(let then_branch=  0;  then_branch < all_then_condition_trees.length; then_branch++) {
            for(let else_branch=0;  else_branch < all_else_condition_trees.length; else_branch++) {
                result.push(new IfStatement(true, all_then_condition_trees[then_branch], all_else_condition_trees[else_branch]));
                result.push(new IfStatement(false, all_then_condition_trees[then_branch], all_else_condition_trees[else_branch]));
            }
        }
    }

    read_indent() {
        if(this.condition)
            return 1 + this.then_branch.read_indent();
        else
            return 1 + 1 + this.else_branch.read_indent();
    }

    read_non_indent() {
        if(this.condition)
            return 1 + this.then_branch.read_non_indent();
        else
            return 1 + this.then_branch.read_non_indent() + 1 + this.else_branch.read_non_indent();
    }

    indented_code(level) {
        return "  ".repeat(level) + "if (" + this.condition + ") {\n" +
            this.then_branch.indented_code(level+1) +
            "  ".repeat(level) + "} else {\n" + this.else_branch.indented_code(level + 1) +
            "  ".repeat(level) + "}\n";
    }

    non_indented_code() {
        return "if (" + this.condition + ") {\n" +
            this.then_branch.non_indented_code() +
            "} else {\n" + this.else_branch.non_indented_code() +
            "}\n";
    }

    correct_answer() {
        if(this.condition)
            return this.then_branch.correct_answer();
        else
            return this.else_branch.correct_answer();
    }
}

class ReturnStatement extends Statement {
    value;

    constructor(value) {
        super();
        this.value = value;
    }

    clone() {
        return new ReturnStatement(this.value);
    }

    create_all_condition_trees(result) {
        result.push(this.clone());
    }

    read_indent() {
        return 1;
    }

    read_non_indent() {
        return 1;
    }

    indented_code(level) {
        return "  ".repeat(level) + "return " + this.value + ";\n";
    }

    non_indented_code() {
        return "return " + this.value + ";\n";
    }

    correct_answer() {
        return this.value;
    }
}

let all_statements_with_condition = [];
let statements = [];
create_statements(7, statements);

for(let statement_counter = 0; statement_counter < statements.length; statement_counter++) {
    let all_true_false_trees = [];
    statements[statement_counter].create_all_condition_trees(all_true_false_trees);
    for(let true_fals_tree_counter=0; true_fals_tree_counter < all_true_false_trees.length; true_fals_tree_counter++) {
        all_statements_with_condition.push(all_true_false_trees[true_fals_tree_counter]);
    }
}

let read_indents_diffs = {};

for(let c=0; c<all_statements_with_condition.length; c++) {
    let statement = all_statements_with_condition[c];
    let read_indent = statement.read_indent();
    let diff = statement.diff();
    if (read_indents_diffs[""+read_indent]==undefined)
        read_indents_diffs[""+read_indent] = {};
    if(read_indents_diffs[""+read_indent][""+diff]==undefined)
        read_indents_diffs[""+read_indent][""+diff] = [];
    read_indents_diffs[""+read_indent][""+diff].push(statement);
}

// Das hier ist die eigentliche Experimentdefinition
document.experiment_definition(
    {
        experiment_name:"Stefan First Trial",
        seed:"42",
        introduction_pages:["Thanks for participating in the experiment about indentation.\n\n" +
                            "Running the experiment should take about 20 minutes.\n\n" +
                            "In the following, (nested) if-statements will be shown to you. " +
                            "The question is for each if-statement, what it returns. " +
                            "For example, if you see the following statement\n\n" +
                            "  if (true) {\n" +
                            "    return 1;\n" +
                            "  } else {\n" +
                            "    return 2;\n" +
                            "  }\n\n" +
                            "the answer will be 1, i.e. you have to press the button [1].\n\n",

                            "The experiment consists of a training phase an an experiment phase.\n" +
                            "The training phase is only for you to get familiar with the " +
                            "questions shown to you and to get familiar with the webpage.\n" +
                            "You can cancel the training session whenever you like. As long " +
                            "you do not cancel the training, new code snippets will be shown to you.\n\n" +
                            "When the you see the first task in the training session, please increase/decrease the font" +
                            "in the browser so that you can see all lines of code (plus some additional lines)\n" +
                            "Depending on your browser and your machine, this could be done by pressing [CTRL] + [+] " +
                            "or [CTRL] + [.].\n\n" +
                            "Press [Return] to enter the training phase."],
        pre_run_instruction:"Please put your fingers on the number buttons.\n\nWhen you press [Enter] the first task will be shown.",
        finish_pages:["Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                      "If you want to contribute to research, you can send the downloaded file to stefan.hanenberg@uni-due.de."],
        layout:[
            {variable:"Indentation",treatments:["indented", "non-indented"]},
            {variable:"Read_Indent",treatments:["3", "5", "7"]},
            {variable:"Diff",treatments:["0", "2", "4"]}
        ],
        repetitions:5,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses:["0", "1","2","3", "4", "5", "6", "7", "8", "9"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        task_configuration:(t)=>{

            let possible_statements = read_indents_diffs[t.treatment_combination[1].value][t.treatment_combination[2].value];
            let this_statement = possible_statements[document.new_random_integer(possible_statements.length)];

            if (t.treatment_combination[0].value=="indented") // fragt, ob die erste Variable (die einzige) den Wert "indented" hat
                t.code = this_statement.indented_code(0);
            else
                t.code = this_statement.non_indented_code();

            t.expected_answer = this_statement.correct_answer();

            t.after_task_string = ()=>"The correct answer for the code was: " + t.expected_answer;
        }
    }
);