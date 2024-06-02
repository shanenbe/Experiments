function random_int() {
    return 42;
}

function random_bool() {
    return true;
}

function create_statement(depth) {
    if(depth==1) {
        return new Return(random_int());
    } else if (depth==2) {
        let if_statement = new IfStatement();
        if_statement.condition = random_bool();
        if_statement.then_branch = new Return(random_int())
        if_statement.else_branch = new Return(random_int());
        return if_statement;

    } else if (depth > 2) {
        let if_statement = new IfStatement();
        if_statement.condition = random_bool();
        if_statement.then_branch = create_statement(depth-1);
        if_statement.else_branch = create_statement(depth-1)        ;
        return if_statement;
    }

    throw "Sollte nicht sein";
}


class Statement {
    indented_code(indentation_level) {}
    non_indented_code() {}

    return_value() {}
}

class Return extends Statement {
    value;
    constructor(value) {
        super();
        this.value=value;
    }

    indented_code(indentation_level) {
        let ret = "    ".repeat(indentation_level);
        ret = ret + "return " + this.value + "\n";
        return ret;
    }

    non_indented_code() {
        let ret = "return " + this.value + "\n";
        return ret;
    }

    return_value() {
        return this.value;
    }
}
class IfStatement extends Statement {
    condition;
    then_branch;
    else_branch;

    indented_code(indentation_level) {
        let ret = "    ".repeat(indentation_level);
        ret = ret + "if (" + this.condition + ") {\n";
        indentation_level = indentation_level + 1;
        ret = ret + this.then_branch.indented_code(indentation_level);
        indentation_level = indentation_level - 1;
        ret = ret + "    ".repeat(indentation_level) + "} else {\n"
        indentation_level = indentation_level + 1;
        ret = ret + this.else_branch.indented_code(indentation_level);
        indentation_level = indentation_level - 1;
        ret = ret + "    ".repeat(indentation_level) + "}\n"
        return ret;
    }

    non_indented_code() {
        let ret = "";
        ret = ret + "if (" + this.condition + ") {\n";
        ret = ret + this.then_branch.non_indented_code();
        ret = ret + "} else {\n"
        ret = ret + this.else_branch.non_indented_code();
        ret = ret + "}\n"
        return ret;
    }

    return_value() {
        if(this.condition==true)
            return this.then_branch.return_value();
        return this.else_branch.return_value();
    }

}

let stmt = create_statement(3);
console.log(stmt.non_indented_code(0));