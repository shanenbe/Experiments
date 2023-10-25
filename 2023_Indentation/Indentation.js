function next_random_int_0_to_9() {
    return 9;
}

function create_return() {
    return new ReturnStatement(next_random_int_0_to_9());
}
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

console.log(statements.length);
console.log(all_statements_with_condition.length);