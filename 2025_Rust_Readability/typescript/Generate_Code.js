import { Nouns } from "../../N-of-1-Experimentation/modules/Words/Nouns.js";
import { random_array_element, random_array_element_and_remove, random_integer_up_to_excluding } from "../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import { iterate, repeat_ } from "../../N-of-1-Experimentation/modules/utils/loops/loop.js";
function init_vector(vector) {
    repeat_(7).times((_) => {
        vector.push(random_integer_up_to_excluding(100));
    });
}
class Main_Function {
    constructor(number_of_mutabilities, error_half) {
        this.vector = [];
        this.target_functions = [];
        init_vector(this.vector);
        repeat_(number_of_mutabilities).times((index) => {
            let target_function = new Target_Function(true, false, index);
            this.target_functions.push(target_function);
        });
        this.set_error_function(number_of_mutabilities, error_half);
        this.fill_rest_methods();
        iterate(this.target_functions).do(element => element.create_body());
    }
    fill_rest_methods() {
        let NUMBER_OF_CALLS = 8;
        let methods_left = NUMBER_OF_CALLS - this.target_functions.length;
        let counter = this.target_functions.length;
        repeat_(methods_left).times(() => {
            let random_position = random_integer_up_to_excluding(this.target_functions.length);
            let target_function = new Target_Function(false, false, 42);
            target_function.function_no = counter++;
            this.target_functions.splice(random_position, 0, target_function);
        });
        for (let i = 0; i < 8; i++) {
            this.target_functions[i].function_no = i + 1;
        }
    }
    set_error_function(number_of_mutabilities, error_half) {
        let is_even = (number_of_mutabilities % 2) == 0;
        let upper_bound;
        if (is_even) {
            upper_bound = number_of_mutabilities / 2;
        }
        else {
            upper_bound = Math.floor(number_of_mutabilities / 2) + 1;
        }
        let random_choice = random_integer_up_to_excluding(upper_bound);
        let faulty_element;
        if (error_half == 1) {
            faulty_element = random_choice;
        }
        else {
            faulty_element = upper_bound + random_choice;
        }
        if (faulty_element > this.target_functions.length - 1) {
            faulty_element = this.target_functions.length - 1;
        }
        this.target_functions[faulty_element].is_faulty = true;
    }
    as_html_java_code() {
        let m = "<span id='main'>" + "<br><br><br>" + "</span>\n" +
            "public static void main(String[] args) {<br>" +
            "&nbsp;&nbsp;var vector = Vector.new(" + this.vector.join((", ")) + ");<br>\n";
        iterate(this.target_functions).do((e) => m += e.as_html_java_call());
        m += "&nbsp;&nbsp;// ERROR: OUT OF BOUNDS<br>\n";
        m += "&nbsp;&nbsp;var vec_value_7 = vector.get(6);<br>\n" +
            "}<br>\n";
        iterate(this.target_functions).do((e) => m += e.as_java_html_function());
        return m;
    }
    as_html_Rust_code() {
        let this_object = this;
        let m = "<span id='main'>" + "<br><br><br>" + "</span>\n" +
            "fn main() {<br>" +
            "&nbsp;&nbsp;let mut vector = vec![" + this.vector.join((", ")) + "];<br>\n";
        iterate(this.target_functions).do((e) => m += e.as_html_Rust_call());
        m += "&nbsp;&nbsp;// ERROR: OUT OF BOUNDS<br>\n";
        m += "&nbsp;&nbsp;let vec_value_7 = vector[6];<br>\n" +
            "}<br>\n";
        iterate(this.target_functions).do((e) => m += e.as_rust_html_function());
        return m;
    }
    index_of_error_function() {
        for (let c = 0; c < this.target_functions.length; c++) {
            if (this.target_functions[c].is_faulty) {
                return c + 1;
            }
        }
        throw "something is wrong here";
    }
}
class Target_Function {
    constructor(is_mutable, is_faulty, function_no) {
        this.function_no = -1;
        this.is_mutable = false;
        this.is_faulty = false;
        this.lines = [];
        this.function_no = function_no;
        this.is_mutable = is_mutable;
        this.is_faulty = is_faulty;
    }
    create_body() {
        let _lines = [];
        let _possible_aliases = ["v_start"];
        let _forbidden_lines = [];
        let _forbidden_aliases = [];
        let nouns = new Nouns();
        let set_name_function = () => "v_" + nouns.pull_random_word();
        if (this.is_faulty) {
            let first_ref = new Alias(set_name_function(), "v_start");
            first_ref.is_mutable == true;
            _lines.push(first_ref);
            let second_ref = new Alias(set_name_function(), first_ref.variable_name);
            second_ref.is_mutable == true;
            _lines.push(second_ref);
            this.clear_variable = second_ref.variable_name;
            _possible_aliases = [];
            _forbidden_aliases = [first_ref.variable_name, second_ref.variable_name];
            _forbidden_lines = [first_ref, second_ref];
        }
        else {
            let first_ref;
            if (random_integer_up_to_excluding(2) == 1) {
                first_ref = new New_Vector("v_" + nouns.pull_random_word());
                _possible_aliases = ["v_start"];
            }
            else {
                first_ref = new Clone(set_name_function(), "v_start");
                _possible_aliases = [];
            }
            first_ref.is_mutable == true;
            _lines.push(first_ref);
            let second_ref = new Alias(set_name_function(), first_ref.variable_name);
            _lines.push(second_ref);
            _forbidden_lines = [first_ref, second_ref];
            _forbidden_aliases = [first_ref.variable_name, second_ref.variable_name];
            this.clear_variable = second_ref.variable_name;
            if (this.clear_variable == "v_produce")
                console.log("dummy");
        }
        _lines.push(new Alias(set_name_function(), null));
        repeat_(5)._do(() => _lines.push(new Clone(set_name_function(), null)));
        repeat_(2)._do(() => _lines.push(new New_Vector(set_name_function())));
        if (this.clear_variable == "v_produce")
            console.log("dummy");
        let counter = 0;
        while (this.lines.length < 10) {
            counter++;
            let next_line = random_array_element_and_remove(_lines);
            let is_valid_element = false;
            if (_possible_aliases.length > 0) {
                if (next_line instanceof Clone) {
                    let clone = next_line;
                    // if(clone.target_variable="v_crime")
                    //     console.log("dummy")
                    if (next_line.requires_target()) {
                        let target_identifier = random_array_element(_possible_aliases);
                        clone.target_variable = target_identifier;
                        is_valid_element = true;
                    }
                    else if (_possible_aliases.indexOf(clone.target_variable) != -1) {
                        is_valid_element = true;
                    }
                    else if (next_line.target_variable = "v_start") {
                        is_valid_element = true;
                    }
                }
                else if (next_line instanceof Alias) {
                    let alias = next_line;
                    // if(alias.variable_name=="v_steel")
                    //     console.log("debug");
                    if (next_line.requires_target()) {
                        let target_identifier = random_array_element_and_remove(_possible_aliases);
                        if (_forbidden_aliases.indexOf(target_identifier) == -1) {
                            alias.target_variable = target_identifier;
                            is_valid_element = true;
                        }
                        else {
                            _possible_aliases.push(target_identifier);
                        }
                    }
                    else if (_forbidden_aliases.indexOf(alias.target_variable) != -1) {
                        if (_forbidden_aliases.indexOf(alias.variable_name) == 0 || (this.lines.indexOf(_forbidden_lines[0]) != -1)) {
                            is_valid_element = true;
                        }
                    }
                    else if (alias.target_variable == "v_start") {
                        is_valid_element = true;
                    }
                }
                else if (next_line instanceof New_Vector) {
                    is_valid_element = true;
                }
                if (is_valid_element) {
                    if (_forbidden_aliases.indexOf(next_line.variable_name) == -1) {
                        _possible_aliases.push(next_line.variable_name);
                        if (next_line instanceof Alias) {
                            if (_possible_aliases.indexOf(next_line.target_variable) == -1) {
                                _possible_aliases.splice(_possible_aliases.indexOf(next_line.target_variable), 1);
                            }
                        }
                    }
                    else {
                        if (next_line instanceof Alias) {
                            if (_possible_aliases.indexOf(next_line.target_variable) != -1) {
                                _possible_aliases.splice(_possible_aliases.indexOf(next_line.target_variable), 1);
                            }
                        }
                    }
                    this.lines.push(next_line);
                }
                else {
                    _lines.push(next_line);
                }
            }
            else if (next_line instanceof New_Vector) {
                if (_forbidden_aliases.indexOf(next_line.variable_name) == -1) {
                    _possible_aliases.push(next_line.variable_name);
                }
                this.lines.push(next_line);
            }
            else if (next_line instanceof Clone && next_line.target_variable == "v_start") {
                _possible_aliases.push(next_line.variable_name);
                this.lines.push(next_line);
            }
            else {
                _lines.push(next_line);
            }
        }
        this.set_muts_and_refs();
    }
    set_muts_and_refs() {
        let reference = ["v_start"];
        iterate(this.lines)
            .do(line => {
            if ((line instanceof Alias) && (reference.includes(line.target_variable))) {
                reference.push(line.target_variable);
                line.is_reference = true;
            }
        });
        let mutables = [this.clear_variable];
        iterate([...this.lines].reverse())
            .do(line => {
            if (mutables.includes(line.variable_name)) {
                line.is_mutable = true;
            }
            if ((line instanceof Alias) && (mutables.includes(line.target_variable))) {
                mutables.push(line.target_variable);
                line.is_mutable = true;
            }
        });
    }
    as_html_java_call() {
        let function_name = "function_" + this.function_no;
        return "&nbsp;&nbsp;<a href='#" + function_name + "'>" + function_name + "</a>(vector);<br>\n";
    }
    as_html_Rust_call() {
        let function_name = "function_" + this.function_no;
        if (this.is_mutable)
            return "&nbsp;&nbsp;<a href='#" + function_name + "'>" + function_name + "</a>(&mut vector);<br>\n";
        else
            return "&nbsp;&nbsp;<a href='#" + function_name + "'>" + function_name + "</a>(&vector);<br>\n";
    }
    as_java_html_function() {
        let function_name = "function_" + this.function_no;
        let ret = "<br><br><br><span id='" + function_name + "'><br><br><br></span>void " + function_name + "(Vector v_start) {" + " <br>\n";
        iterate(this.lines).do((line) => {
            ret += line.as_java_line();
        });
        ret += "<br>";
        ret += "&nbsp;&nbsp;" + this.clear_variable + ".clear();<br>";
        ret += "} // <a href='#main'>Back to main</a><br><br>";
        return ret;
    }
    as_rust_html_function() {
        let function_name = "function_" + this.function_no;
        let ret = "<br><br><br><span id='" + function_name + "'><br><br><br></span>fn " + function_name + "(v_start: &" + "Vec&lt;i32&gt;) {"
            + "//" + this.is_faulty + "<br>\n";
        iterate(this.lines).do((line) => {
            ret += line.as_rust_line();
        });
        ret += "<br>";
        ret += "&nbsp;&nbsp;" + this.clear_variable + ".clear();<br>";
        ret += "} // <a href='#main'>Back to main</a><br><br>";
        return ret;
    }
}
class Variable {
    constructor(variable_name) {
        this.is_mutable = false;
        this.is_reference = false;
        this.variable_name = variable_name;
    }
    requires_target() {
        return false;
    }
    as_java_line() {
        return "&nbsp;&nbsp;var " + this.variable_name;
    }
    as_rust_line() {
        return "&nbsp;&nbsp;let " + (this.is_mutable ? "mut " : "") + this.variable_name;
    }
}
class Alias extends Variable {
    constructor(variable_name, target_variable) {
        super(variable_name);
        this.target_variable = target_variable;
    }
    requires_target() {
        return this.target_variable == null;
    }
    set_target(variable_name) {
        this.target_variable = variable_name;
    }
    as_java_line() {
        return super.as_java_line() + " = " + this.target_variable + ";<br>";
    }
    as_rust_line() {
        return super.as_rust_line() + " = " + this.target_variable + ";<br>";
    }
}
class Clone extends Alias {
    constructor(variable_name, target_variable) {
        super(variable_name, target_variable);
    }
    as_java_line() {
        return "&nbsp;&nbsp;var " + this.variable_name + " = " + this.target_variable + ".clone();<br>";
    }
    as_rust_line() {
        return "&nbsp;&nbsp;let " + this.variable_name + " = " + this.target_variable + ".clone();<br>";
    }
}
class New_Vector extends Variable {
    constructor(variable_name) {
        super(variable_name);
        this.vector = [];
        init_vector(this.vector);
    }
    as_java_line() {
        return super.as_java_line() + " = Vector.new(" + this.vector.join(", ") + ");<br>";
    }
    as_rust_line() {
        return super.as_rust_line() + " = vec![" + this.vector.join(", ") + "];<br>";
    }
    set_target(variable_name) { }
}
function generate_main_function(number_of_mutabilities, error_half) {
    let main_function = new Main_Function(number_of_mutabilities, error_half);
    return main_function;
}
export function generate_code(number_of_mutabilities, error_half) {
    let main_function = generate_main_function(number_of_mutabilities, error_half);
    let error_index = main_function.index_of_error_function();
    return {
        main_function: main_function,
        solution_index: error_index,
        target_functions: null
    };
}
//# sourceMappingURL=Generate_Code.js.map