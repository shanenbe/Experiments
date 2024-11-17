/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./2024_LanguageTypesDSL_Readability/typescript/code/Feature.js":
/*!**********************************************************************!*\
  !*** ./2024_LanguageTypesDSL_Readability/typescript/code/Feature.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Feature_Term_with_Typing_rules: () => (/* binding */ Feature_Term_with_Typing_rules),
/* harmony export */   create_tasks_grouped_by_error_position: () => (/* binding */ create_tasks_grouped_by_error_position)
/* harmony export */ });
/* harmony import */ var _N_of_1_Experimentation_modules_utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js */ "./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js");

function WS(num) {
    return "&nbsp;".repeat(num);
}
class Rule {
    equals(that) {
        return (this.constructor.name === that.constructor.name);
    }
}
class Code_Writer {
    constructor(arr) { this.arr = arr; }
    write(a) {
        this.arr.push(a);
    }
    writeln(a) {
        this.arr.push(a + "<br>");
    }
    write_rules(rules, left_type_name) {
        for (let c = 0; c < 3; c++) {
            rules.x_y_z[c].do_writer_on(this, left_type_name, c);
        }
    }
    write_function_rule(bool_or_number, position) { }
    write_left_outer_rule(type, position) { }
    write_right_outer_rule(type, position) { }
}
class Feature_Type_Writer_Code extends Code_Writer {
    constructor(arr) {
        super(arr);
    }
    write_rules(rules, left_type_name) {
        this.write("<td colspan='3' style='border: 1px solid black;'>");
        this.writeln("class feature extends LTerm {<br>");
        this.writeln(WS(2) + "LTerm t1 t2 t3;<br>");
        this.writeln(WS(2) + "Type type_of(Environment e) {");
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.writeln(WS(4) + "if(ft.left.equals(type_left) && ft.right.equals(type_right)){");
        this.writeln(WS(6) + "return BOOL;");
        this.writeln(WS(4) + "}");
        this.writeln(WS(2) + "}");
        this.writeln("}");
        this.write("</td>");
    }
    write_function_rule(bool_or_number, position) {
        this.writeln(WS(4) + "Function_Type ft = (Function_Type) t" + (position + 1) + ".type_of(e);");
    }
    write_left_outer_rule(type, position) {
        this.writeln(WS(4) + "Type type_left = t" + (position + 1) + ".type_of(e);");
    }
    write_right_outer_rule(type, position) {
        this.writeln(WS(4) + "Type type_right = t" + (position + 1) + ".type_of(e);");
    }
}
class Feature_Literal_Type_Writer_Inference extends Code_Writer {
    constructor(arr) {
        super(arr);
    }
    write_rules(rules, left_type_name) {
        this.arr.push("$");
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        this.arr.push("$<br><br><br>$");
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        this.arr.push("$<br><br><br>$");
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.arr.push("$<br><br><br>");
    }
    write_function_rule(bool_or_number, position) {
        let left = bool_or_number;
        let right = (bool_or_number == "BOOL" ? "NUMBER" : "BOOL");
        this.writeln("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{" + left + "}\\rightarrow\\mathrm{" + right + "}");
    }
    write_left_outer_rule(type, position) {
        this.write("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\mathrm{" + type + "}");
    }
    write_right_outer_rule(type, position) {
        this.write("\\mathrm{exp}_{\\mathrm{" + (position + 1) + "}}:\\mathrm{" + (type == "BOOL" ? "NUMBER" : "BOOL") + "}");
    }
}
class Feature_Type_Writer_Inference extends Code_Writer {
    constructor(arr) {
        super(arr);
    }
    write_rules(rules, left_type_name) {
        this.write("$\\Large{\\frac{");
        rules.x_y_z[0].do_writer_on(this, left_type_name, 0);
        this.write("\\,\\,\\,\\,\\,\\,\\,\\,\\,");
        rules.x_y_z[1].do_writer_on(this, left_type_name, 1);
        this.write("\\,\\,\\,\\,\\,\\,\\,\\,\\,");
        rules.x_y_z[2].do_writer_on(this, left_type_name, 2);
        this.write("}{\\mathrm{E}\\,\\vdash\\,\\mathrm{feature(\\,\\mathrm{t}_{\\mathrm{1}}\\,\\,\\mathrm{t}_{\\mathrm{2}}\\,\\,\\mathrm{t}_{\\mathrm{3}}\\,)}:\\,\\mathrm{BOOL}}}$");
    }
    write_function_rule(bool_or_number, position) {
        let left = bool_or_number;
        let right = (bool_or_number == "BOOL" ? "NUMBER" : "BOOL");
        this.writeln("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{left}}\\rightarrow\\mathrm{T}_{\\mathrm{right}}");
    }
    write_left_outer_rule(type, position) {
        this.write("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{left}}");
    }
    write_right_outer_rule(type, position) {
        this.write("\\mathrm{E}\\,\\vdash\\,\\mathrm{t}_{\\mathrm{" + (position + 1) + "}}:\\,\\mathrm{T}_{\\mathrm{right}}");
    }
}
/**
 * Writes types of expressions as Java Source Code
 */
class Term_Type_Writer_Code extends Code_Writer {
    constructor(arr) {
        super(arr);
    }
    write_code(position, infix) {
        this.write("<td style='border: 1px solid black;'>");
        this.writeln("class " + "exp_" + (position + 1) + " extends LTerm {");
        this.writeln("&nbsp;&nbsp;Type type_of(Environment e) {&nbsp;&nbsp;");
        this.writeln(infix);
        this.writeln("&nbsp;&nbsp;}");
        this.writeln("}");
        this.write("</td>");
    }
    write_function_rule(bool_or_number, position) {
        this.write_code(position, "&nbsp;&nbsp;&nbsp;&nbsp;return new Function_Type(" + bool_or_number + ", " + (bool_or_number == "BOOL" ? "NUMBER" : "BOOL") + ");&nbsp;&nbsp;");
    }
    write_outer_rule(type, position) {
        this.write_code(position, "&nbsp;&nbsp;&nbsp;&nbsp;return " + type + ";");
    }
    write_left_outer_rule(type, position) {
        this.write_outer_rule(type, position);
    }
    write_right_outer_rule(type, position) {
        this.write_outer_rule((type == "BOOL") ? "NUMBER" : "BOOL", position);
    }
}
class Function_Rule extends Rule {
    type_name(param) {
        return param.first_type_in_function + " -> " + (param.second_type_in_function());
    }
    do_writer_on(writer, bool_or_number, position) {
        writer.write_function_rule(bool_or_number, position);
    }
}
class Left_Rule extends Rule {
    type_name(param) {
        return param.first_type_in_function;
    }
    do_writer_on(writer, bool_or_number, position) {
        writer.write_left_outer_rule(bool_or_number, position);
    }
}
class Right_Rule extends Rule {
    type_name(param) {
        return param.second_type_in_function();
    }
    do_writer_on(writer, bool_or_number, position) {
        writer.write_right_outer_rule(bool_or_number, position);
    }
}
class Rules {
    constructor(x_y_z) {
        this.x_y_z = x_y_z;
    }
    apply_writer(writer, left_type_name) {
        writer.write_rules(this, left_type_name);
    }
}
class Feature_Term_with_Typing_rules {
    constructor(order, first_type_in_function, feature_term, typing_rules) {
        this.term_typing_output_ordering = order;
        this.first_type_in_function = first_type_in_function;
        this.feature_term = feature_term;
        this.typing_rules = typing_rules;
    }
    typing_rules_as_code_html_string() {
        let term_type_writer = new Term_Type_Writer_Code([]);
        term_type_writer.arr.push("<table style='border: 1px solid black;'>");
        term_type_writer.arr.push("<tr style='vertical-align:top'>");
        this.feature_term.apply_writer(term_type_writer, this.first_type_in_function);
        term_type_writer.arr.push("</tr>");
        term_type_writer.arr.push("<tr style=\"vertical-align:top\">");
        let feature_writer = new Feature_Type_Writer_Code(term_type_writer.arr);
        this.typing_rules.apply_writer(feature_writer, this.first_type_in_function);
        term_type_writer.arr.push("</tr>");
        term_type_writer.arr.push("<tr style=\"vertical-align:top\">");
        term_type_writer.arr.push("<td colspan='3' style='border: 1px solid black;'>");
        term_type_writer.arr.push("feature(" +
            "  exp_" + (this.term_typing_output_ordering[0] + 1) +
            "  exp_" + (this.term_typing_output_ordering[1] + 1) +
            "  exp_" + (this.term_typing_output_ordering[2] + 1) + " )<br>");
        term_type_writer.arr.push("</td>");
        term_type_writer.arr.push("</tr>");
        term_type_writer.arr.push("</table>");
        return term_type_writer.arr.join("");
    }
    inference_rules_as_html_string() {
        let literal_types_writer = new Feature_Literal_Type_Writer_Inference([]);
        this.feature_term.apply_writer(literal_types_writer, this.first_type_in_function);
        let term_type_writer = new Feature_Type_Writer_Inference(literal_types_writer.arr);
        this.typing_rules.apply_writer(term_type_writer, this.first_type_in_function);
        term_type_writer.arr.push("<br><br>$<br><br>\\mathrm{feature(" +
            "  exp_" + (this.term_typing_output_ordering[0] + 1) + "\\,\\," +
            "  exp_" + (this.term_typing_output_ordering[1] + 1) + "\\,\\," +
            "  exp_" + (this.term_typing_output_ordering[2] + 1) + " )}$<br>");
        return term_type_writer.arr.join("");
    }
    error_position() {
        // let ordered_terms = this.ordered_terms();
        let ordered_term_types = [];
        for (let c = 0; c <= 2; c++) {
            ordered_term_types.push(this.type_string_of_term_no(c));
        }
        for (let c = 0; c <= 2; c++) {
            if ((this.typing_rules.x_y_z[c] instanceof Function_Rule) &&
                !(this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Function_Rule)) {
                return c + 1;
            }
        }
        for (let c = 0; c <= 2; c++) {
            if (((this.typing_rules.x_y_z[c] instanceof Left_Rule) &&
                (this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Right_Rule)) || ((this.typing_rules.x_y_z[c] instanceof Right_Rule) &&
                (this.feature_term.x_y_z[this.term_typing_output_ordering[c]] instanceof Left_Rule))) {
                for (let function_type_rule_position = 0; function_type_rule_position <= 2; function_type_rule_position++) {
                    if (this.typing_rules.x_y_z[function_type_rule_position] instanceof Function_Rule) {
                        if (function_type_rule_position > c) {
                            return function_type_rule_position + 1;
                        }
                        else {
                            return c + 1;
                        }
                    }
                }
            }
        }
        return 0;
    }
    type_string_of_term_no(c) {
        let term = this.feature_term.x_y_z[this.term_typing_output_ordering[c]];
        if (term instanceof Left_Rule)
            return this.first_type_in_function;
        if (term instanceof Right_Rule)
            return (this.first_type_in_function === "BOOL" ? "NUMBER" : "BOOL");
        if (term instanceof Function_Rule)
            return (this.first_type_in_function + "->" + (this.first_type_in_function === "BOOL" ? "NUMBER" : "BOOL"));
        throw "Something is strange";
    }
    second_type_in_function() {
        return (this.first_type_in_function === "BOOL" ? "NUMBER" : "BOOL");
    }
    ordered_terms() {
        let ret = [
            this.feature_term.x_y_z[this.term_typing_output_ordering[0]],
            this.feature_term.x_y_z[this.term_typing_output_ordering[1]],
            this.feature_term.x_y_z[this.term_typing_output_ordering[2]],
        ];
        return ret;
    }
    response_text() {
        let ret = "";
        ret = ret + "The correct response is: " + this.error_position() + "\n\n";
        return ret;
    }
    debug_help(t) {
        if (t.task_number_in_execution == 5) {
            console.log();
        }
        this.error_position();
    }
}
function create_tasks_grouped_by_error_position() {
    let TYPE_CONSTRUCTORS = [new Function_Rule(), new Left_Rule(), new Right_Rule()];
    let BOOL_NUM = ["BOOL", "NUMBER"];
    let all_numbers = [0, 1, 2];
    let all_number_combinations;
    all_number_combinations = (0,_N_of_1_Experimentation_modules_utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_0__.all_different_x_tupel)(3, all_numbers);
    let ret = { 1: [], 2: [], 3: [], 0: [] };
    (0,_N_of_1_Experimentation_modules_utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_0__.all_array_combinations)([all_number_combinations, BOOL_NUM, all_number_combinations, all_number_combinations], (a) => {
        let typing_rule_array = a[3];
        let typing_rule = new Rules([TYPE_CONSTRUCTORS[typing_rule_array[0]], TYPE_CONSTRUCTORS[typing_rule_array[1]], TYPE_CONSTRUCTORS[typing_rule_array[2]]]);
        let term_rule_array = a[2];
        let term_rule = new Rules([TYPE_CONSTRUCTORS[term_rule_array[0]], TYPE_CONSTRUCTORS[term_rule_array[1]], TYPE_CONSTRUCTORS[term_rule_array[2]]]);
        let order_array = a[0];
        let first_type = a[1];
        let term = new Feature_Term_with_Typing_rules(order_array, first_type, term_rule, typing_rule);
        ret["" + term.error_position()].push(term);
    });
    return ret;
}
;
//# sourceMappingURL=Feature.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata.js":
/*!*************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata: () => (/* binding */ Automata),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");

function init() { }
class Automata {
    constructor(config) {
        this.current_state = -1;
        this.transitions = [];
        this.states = [];
        this.start_state = config.start;
        this.states = config.states;
        for (let i = 0; i < this.states.length; i++) {
            this.transitions.push([]);
        }
        for (let t of config.transitions) {
            this.transitions[t.from].push(t);
        }
        this.init_function = config.init_function;
        this.end_states = config.end_states;
    }
    input(input) {
        let matching_transition = this.first_match(input);
        let state_before = this.current_state;
        if (matching_transition != null) {
            this.current_state = matching_transition.next_state; // go to next state
            matching_transition.action(state_before, input, this.current_state); // go to next state
        }
    }
    start() {
        this.current_state = this.start_state;
    }
    first_match(input) {
        for (let i = 0; i < this.transitions[this.current_state].length; i++) {
            if (this.transitions[this.current_state][i].accepts(input))
                return this.transitions[this.current_state][i];
        }
        return null;
    }
    initialize() {
        this.current_state = this.start_state;
        this.init_function();
    }
    add_finish_action(action) {
        for (let transitions of this.transitions) {
            for (let transition of transitions) {
                if (this.is_transition_to_end(transition)) {
                    let former_action = transition.action;
                    transition.action = (from, input, next) => {
                        former_action(from, input, next);
                        action();
                    };
                }
            }
        }
    }
    is_transition_to_end(transition) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(this.end_states, transition.next_state);
    }
    add_action_to_transitions(is_target_transition, action) {
        for (let transitions of this.transitions) {
            for (let transition of transitions) {
                if (is_target_transition(transition)) {
                    let former_action = transition.action;
                    transition.action = (from, input, next) => {
                        former_action(from, input, next);
                        action();
                    };
                }
            }
        }
    }
}
//# sourceMappingURL=Automata.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js":
/*!**************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_Configurator: () => (/* binding */ Automata_Configurator),
/* harmony export */   create_automata: () => (/* binding */ create_automata),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Automata.js */ "./N-of-1-Experimentation/modules/Automata/Automata.js");

function init() { }
class Automata_Configurator {
    constructor(states, start, init_function, transitions, end_states) {
        this.states = states;
        this.start = start;
        this.init_function = init_function;
        this.transitions = transitions;
        this.end_states = end_states;
    }
}
function create_automata(states, start, init_function, transitions, end_states) {
    return new _Automata_js__WEBPACK_IMPORTED_MODULE_0__.Automata(new Automata_Configurator(states, start, init_function, transitions, end_states));
}
//# sourceMappingURL=Automata_Configurator.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js":
/*!***********************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_Forwarder: () => (/* binding */ Automata_Forwarder)
/* harmony export */ });
class Automata_Forwarder {
    constructor(forwarder_name) {
        this.set_active_function = () => { };
        this.forwarder_name = forwarder_name;
    }
    input(s) {
        this.automata.input(s);
    }
    add_activation_function(to_add) {
        // let old_activation_function = this.set_active_function;
        // this.set_active_function = () => {
        //     old_activation_function();
        //     to_add();
        // }
    }
    set_active() { }
}
//# sourceMappingURL=Automata_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata/Transitions.js":
/*!****************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata/Transitions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Simple_Transition: () => (/* binding */ Simple_Transition),
/* harmony export */   Transition: () => (/* binding */ Transition),
/* harmony export */   Transition_Acceptor_Function: () => (/* binding */ Transition_Acceptor_Function),
/* harmony export */   accept_all: () => (/* binding */ accept_all),
/* harmony export */   do_nothing: () => (/* binding */ do_nothing),
/* harmony export */   each_char: () => (/* binding */ each_char),
/* harmony export */   from: () => (/* binding */ from),
/* harmony export */   if_func: () => (/* binding */ if_func),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   pass: () => (/* binding */ pass)
/* harmony export */ });
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");

function init() { }
class Transition_Acceptor {
}
class Transition_Strings_Acceptor extends Transition_Acceptor {
    constructor(strings) {
        super();
        this.accepted_strings = strings;
    }
    accepts(input) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(this.accepted_strings, input);
    }
}
class Transition_Acceptor_Function extends Transition_Acceptor {
    constructor(acceptor_function) {
        super();
        this.acceptor_function = acceptor_function;
    }
    accepts(input) {
        return this.acceptor_function(input);
    }
}
class Transition_Strings_Accepts_ALL extends Transition_Acceptor {
    accepts(input) {
        return true;
    }
}
function keys(strings) {
    return new Transition_Strings_Acceptor(strings);
}
function if_func(f) {
    return new Transition_Acceptor_Function(f);
}
function each_char(charlist) {
    var chars = [];
    for (let a of charlist) {
        chars.push(a);
    }
    return new Transition_Strings_Acceptor(chars);
}
class Transition {
    constructor(from, acceptor, next_state, action) {
        this.from = from;
        this.acceptor = acceptor;
        this.next_state = next_state;
        this.action = action;
    }
    ;
    is_valid_input(input) {
        return this.acceptor.accepts(input);
    }
    accepts(input) {
        return this.acceptor.accepts(input);
    }
}
function Simple_Transition(from, accept_input_function, next_state, action) {
    return new Transition(from, new Transition_Acceptor_Function(accept_input_function), next_state, (s, i, n) => action(i));
}
function accept_all() {
    return new Transition_Strings_Accepts_ALL();
}
function do_nothing(at, input, next) { }
function pass(f) {
    return (at, input, next) => f();
}
function from(from) {
    // from(0).key("ArrowRight").check(()=>current_page<texts.length-1)).next_state(0).action(()=>{current_page++; print_page(texts[current_page]);})
    return {
        to: (to) => {
            return {
                on: (key) => {
                    return {
                        if: (check) => {
                            return {
                                do: (action) => {
                                    return Simple_Transition(from, (input) => { return input == key && check(input); }, to, action);
                                }
                            };
                        },
                        do: (action) => {
                            return Simple_Transition(from, (input) => { return input == key; }, to, action);
                        }
                    };
                },
                on_any: (keys) => {
                    return {
                        if: (check) => {
                            return {
                                do: (action) => {
                                    return Simple_Transition(from, (input) => {
                                        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(keys, input) && check(input);
                                    }, to, action);
                                }
                            };
                        },
                        do: (action) => {
                            return Simple_Transition(from, (input) => { return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.contains)(keys, input); }, to, action);
                        }
                    };
                }
            };
        },
    };
}
//# sourceMappingURL=Transitions.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js":
/*!**********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Automata_With_Output_Forwarder: () => (/* binding */ Automata_With_Output_Forwarder),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js");
/* harmony import */ var _Automata_Automata_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata.js */ "./N-of-1-Experimentation/modules/Automata/Automata.js");


function init() { }
/*
    I don't do anything - I am just a superclass
 */
class Automata_With_Output_Forwarder extends _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Forwarder {
    constructor(forwarder_name, measurement, pre_run_instructions, post_run_instructions) {
        super(forwarder_name);
        this.pre_run_instructions = pre_run_instructions;
        this.post_run_instructions = post_run_instructions;
        this.measurement = measurement;
        this.automata = this.create_automata(); //new Automata(this.automata_configurator());
        this.automata.initialize();
    }
    set_active() {
        this.show_intro();
    }
    create_automata() {
        return new _Automata_Automata_js__WEBPACK_IMPORTED_MODULE_1__.Automata(this.automata_configurator());
    }
    output_writer() {
        return this.measurement.output_writer();
    }
    show_intro() {
        this.output_writer().clear_all();
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.pre_run_instructions();
    }
    empty_screen_and_show_instructions(command) {
        this.output_writer().clear_state();
        this.output_writer().clear_stage();
        if (command == null || command == undefined)
            console.log("something is strange");
        else
            command();
    }
}
//# sourceMappingURL=Automata_With_Output_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js":
/*!******************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Book_Forwarder: () => (/* binding */ Book_Forwarder),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");



function init() { }
let SHOW_PAGE = 0;
let FINISHED_BOOK = 1;
let EVERYTHING_DONE = 1;
class Book_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Automata_With_Output_Forwarder {
    constructor(book_name, text, measurement) {
        super(book_name, measurement, text[0], text[text.length - 1]);
        this.current_page_number = -1;
        this.pages = text;
        this.create_automata();
    }
    set_page_index(index) {
        this.current_page_number = index;
        this.empty_screen_and_show_instructions(this.pages[this.current_page_number]);
        this.output_writer().print_string_to_state(this.forwarder_name);
        this.output_writer().print_string_to_page_number("Page " + (this.current_page_number + 1) + " / " + this.pages.length);
        let navigation_string = "<hr>";
        if (index > 0)
            navigation_string += "[&#8592] = previous page";
        if (index < this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[&#8594] = next page";
        if (index == this.pages.length - 1)
            navigation_string += (navigation_string != "<hr>" ? "<br>" : "") + "[Enter] = Finish";
        this.output_writer().print_html_on_stage(navigation_string);
    }
    set_active() {
        super.set_active();
    }
    show_intro() {
        this.set_page_index(0);
    }
    show_outro() { }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.Automata_Configurator([SHOW_PAGE, EVERYTHING_DONE], SHOW_PAGE, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowRight")
                .if((i) => this.current_page_number < this.pages.length - 1)
                .do((i) => {
                this.set_page_index(++this.current_page_number);
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(SHOW_PAGE)
                .on("ArrowLeft")
                .if((i) => this.current_page_number > 0)
                .do((i) => {
                this.set_page_index(--this.current_page_number);
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_0__.from)(SHOW_PAGE).to(EVERYTHING_DONE)
                .on("Enter")
                .if((i) => this.current_page_number >= this.pages.length - 1)
                .do((i) => { })
        ];
    }
}
//# sourceMappingURL=Book_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js":
/*!************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Forwarder: () => (/* binding */ Experiment_Forwarder)
/* harmony export */ });
/* harmony import */ var _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experimentation_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js");

class Experiment_Forwarder extends _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Experimentation_Forwarder {
    constructor(pre_run_instructions, experiment_definition, measurement) {
        super("Main Experiment", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start the experiment.");
        }, () => {
            measurement.output_writer().print_html_on_stage("You finished the experiment phase.<hr>" +
                "Please, press [Enter] to go to the next phase.<br>");
        }, experiment_definition, measurement);
    }
}
//# sourceMappingURL=Experiment_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js":
/*!*****************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experimentation_Forwarder: () => (/* binding */ Experimentation_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");



let SHOW_INTRO = 0;
let SHOW_TASK = 1;
let SHOW_PENALTY = 2;
let TASK_FINISHED = 3;
let SHOW_OUTRO = 4;
let EVERYTHING_DONE = 5;
class Experimentation_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Automata_With_Output_Forwarder {
    show_intro() {
        this.empty_screen_and_show_instructions(this.pre_run_instructions);
        this.output_writer().print_experiment_name(this.forwarder_name);
    }
    show_outro() {
        this.empty_screen_and_show_instructions(this.post_run_instructions);
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    current_task() {
        return this.experiment_definition.tasks[this.current_page_index];
    }
    ;
    constructor(experiment_automata_name, pre_run_instructions, post_run_instructions, experiment_definition, measurement) {
        super(experiment_automata_name, measurement, pre_run_instructions, post_run_instructions);
        this.current_page_index = -1;
        this.experiment_definition = experiment_definition;
    }
    automata_configuration() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(SHOW_TASK)
                .on("Enter")
                .do((i) => {
                console.log("Dummy Exp: Enter On Exp");
                this.set_experiment_index(0);
                this.measurement.start_measurement(this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on("Delete")
                .do((i) => {
                console.log("Dummy Exp: Delete On Exp");
                this.show_outro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_OUTRO)
                .on("?+Control")
                .if((i) => true)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
                this.show_outro();
            }),
            // STATE 1=Task is shown, 2=Input correct
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(TASK_FINISHED)
                .on_any(this.measurement.accepted_responses())
                .if((i) => this.current_task().accepts_answer(i) &&
                this.current_page_index < this.experiment_definition.tasks.length - 1)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
            }),
            // Task Shown - Incorrect input => Remain in Task
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_TASK)
                .on_any(this.measurement.accepted_responses())
                .if((i) => !this.current_task().accepts_answer(i) && !this.measurement.demands_penalty())
                .do((i) => {
                this.measurement.incorrect_response(i, this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_PENALTY)
                .on_any(this.measurement.accepted_responses())
                .if((i) => !this.current_task().accepts_answer(i) && this.measurement.demands_penalty())
                .do((i) => {
                this.measurement.incorrect_response(i, this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_PENALTY).to(SHOW_TASK)
                .on("Enter")
                .if((i) => this.measurement.penalty_is_over())
                .do((i) => {
                this.measurement.start_measurement(this.current_task());
            }),
            // Between Tasks to next task
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(TASK_FINISHED).to(SHOW_TASK)
                .on("Enter")
                .if((i) => this.current_page_index < this.experiment_definition.tasks.length - 1)
                .do((i) => {
                this.inc_current_experiment();
                this.measurement.start_measurement(this.current_task());
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on_any(this.measurement.accepted_responses())
                .if((i) => this.current_task().accepts_answer(i) &&
                this.current_page_index == this.experiment_definition.tasks.length - 1)
                .do((i) => {
                this.measurement.stop_measurement(i, this.current_task());
                this.show_outro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("Enter")
                .do((i) => {
                let a = 1;
            })
        ];
    }
    set_experiment_index(index) {
        this.current_page_index = index;
        this.output_writer().print_string_to_page_number("Task " + (this.current_page_index + 1) + " / " + this.experiment_definition.tasks.length);
    }
    inc_current_experiment() {
        this.set_experiment_index(++this.current_page_index);
    }
    init_experiment() {
        this.experiment_definition.init_experiment(false);
    }
}
//# sourceMappingURL=Experimentation_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js":
/*!***************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Alternatives: () => (/* binding */ Alternatives),
/* harmony export */   Freetext: () => (/* binding */ Freetext),
/* harmony export */   Information: () => (/* binding */ Information),
/* harmony export */   Question: () => (/* binding */ Question),
/* harmony export */   Questionnaire_Forwarder: () => (/* binding */ Questionnaire_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Automata_With_Output_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Automata_With_Output_Forwarder.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");



let SHOW_INTRO = 0;
let SHOW_QUESTION = 1;
let ANSWERED_INCOMPLETE = 2;
let ANSWERES_COMPLETE = 3;
let EVERYTHING_DONE = 4;
class Question {
    constructor(variable_name, question_text) {
        this.answer = null;
        this.variable_name = variable_name;
        this.question_text = question_text;
    }
    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = element.value;
    }
}
class Alternatives extends Question {
    constructor(variable_name, question_text, alternatives) {
        super(variable_name, question_text);
        this.alternatives = alternatives;
    }
    input_html() {
        let html_string = "<select id=\"" + this.variable_name + "\">";
        html_string += "<option disabled selected value> -- select an option -- </option>";
        let index = 0;
        this.alternatives.forEach((a) => html_string += "<option value=" + index++ + ">" + a + "</option>");
        html_string += ("</select>");
        return html_string;
    }
    store_answer() {
        let element = document.getElementById(this.variable_name);
        // @ts-ignore
        this.answer = this.alternatives[element.value];
    }
}
class Information extends Question {
    html_string() {
        let html_string = "<p>We have one question to you.</p>";
        return html_string;
    }
    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }
    constructor(question_text) {
        super(null, question_text);
    }
}
class Freetext extends Question {
    html_string() {
    }
    input_html() {
        let html_string = "<input type=\"text\" id=\"" + this.variable_name + "\">";
        return html_string;
    }
}
class Questionnaire_Forwarder extends _Automata_With_Output_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_With_Output_Forwarder {
    constructor(questions, measurement) {
        super("Questionnaire", measurement, () => measurement.output_writer().print_html_on_stage("Please, answer the following questions.<br>"), () => measurement.output_writer().print_html_on_stage("Thank you for answering the questions."));
        this.current_question_number = -1;
        this.questions = questions;
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.Automata_Configurator([SHOW_INTRO, SHOW_QUESTION, ANSWERED_INCOMPLETE, ANSWERES_COMPLETE, EVERYTHING_DONE], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        return [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(SHOW_INTRO).to(EVERYTHING_DONE)
                .on("DONE")
                .if((i) => true)
                .do((i) => {
                this.add_result_to_question();
                console.log("dummy");
            }),
        ];
    }
    show_intro() {
        super.show_intro();
        let html_string = this.create_questionnaire_html_string();
        this.output_writer().print_html_on_stage(html_string);
        document.getElementById("DONE").onclick = () => this.input("DONE");
        ;
    }
    show_outro() {
    }
    create_questionnaire_html_string() {
        let html_string = "<fieldset><legend>Questionnaire</legend><div display: inline-block;><table>";
        this.questions.forEach((q) => html_string += "<tr><td>" + q.question_text + "</td>" +
            "<td>" + q.input_html() + "</td></tr>");
        html_string += "</table></div></fieldset><br><button id='DONE'>Ok - all questions answered</button>";
        return html_string;
    }
    add_result_to_question() {
        for (let question of this.questions) {
            question.store_answer();
        }
    }
}
//# sourceMappingURL=Questionnaire_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Training_Execution_Forwarder: () => (/* binding */ Training_Execution_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");
/* harmony import */ var _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Experimentation_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experimentation_Forwarder.js");



let SHOW_INTRO = 0;
let SHOW_TASK = 1;
let SHOW_PENALTY = 2;
let TASK_FINISHED = 3;
let SHOW_OUTRO = 4;
let EVERYTHING_DONE = 5;
let ESCAPED = 6;
class Training_Execution_Forwarder extends _Experimentation_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Experimentation_Forwarder {
    constructor(pre_run_instructions, training_configuration, experiment_definition, measurement) {
        super("Training", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "Press [Enter] to start training.");
        }, () => {
            measurement.output_writer().print_html_on_stage("You finished the training phase.<hr>" +
                (training_configuration.can_be_repeated ? "Please, press [Enter] to run again a training session.<br>" : "") +
                "Please, press [E] (capital E, i.e., [shift] + [e]) to enter the experiment phase.");
        }, experiment_definition, measurement);
        this.training_configuration = training_configuration;
    }
    print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");
        let navigation_string = "You cancelled this training session.<hr>" +
            "Press [Enter] if you want to start another training session.<br>" +
            "Press [E] (capital E!) if you want to start with the experiment.";
        this.output_writer().print_html_on_stage(navigation_string);
    }
    automata_configurator() {
        return new _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Configurator([SHOW_INTRO, SHOW_TASK, SHOW_PENALTY, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE, ESCAPED], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        let experiment_transitions = super.transitions();
        let this_transitions = [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_INTRO).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_TASK).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(TASK_FINISHED).to(ESCAPED)
                .on("Escape")
                .if(() => this.current_page_index < this.experiment_definition.tasks.length - 1 && this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(ESCAPED).to(EVERYTHING_DONE)
                .on("E").do(() => {
                let dummy = 1;
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(ESCAPED).to(SHOW_INTRO)
                .on("Enter").do(() => {
                this.experiment_definition.init_experiment(true);
                this.show_intro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(SHOW_INTRO)
                .on("Enter")
                .if(() => this.training_configuration.can_be_repeated)
                .do(() => {
                this.experiment_definition.init_experiment(true);
                this.show_intro();
            }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_1__.from)(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("E")
                .do((i) => {
                let dummy = 1;
            })
        ];
        experiment_transitions.splice(experiment_transitions.length - 1);
        this_transitions.forEach((e) => experiment_transitions.push(e));
        return experiment_transitions;
    }
    input(s) {
        if (!["a", "b", "c"].includes(s) && this.automata.current_state != 0)
            return super.input(s);
        super.input(s);
    }
    init_experiment() {
        this.training_configuration.init_experiment(this.experiment_definition);
    }
}
//# sourceMappingURL=Training_Execution_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js":
/*!********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Sequential_Forwarder_Forwarder: () => (/* binding */ Sequential_Forwarder_Forwarder)
/* harmony export */ });
/* harmony import */ var _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Automata/Automata_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Forwarder.js");
/* harmony import */ var _Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata/Automata_Configurator.js */ "./N-of-1-Experimentation/modules/Automata/Automata_Configurator.js");
/* harmony import */ var _Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata/Transitions.js */ "./N-of-1-Experimentation/modules/Automata/Transitions.js");



class Sequential_Forwarder_Forwarder extends _Automata_Automata_Forwarder_js__WEBPACK_IMPORTED_MODULE_0__.Automata_Forwarder {
    constructor(forwarders) {
        super("Default Sequential Forwarder Forwader");
        this.current_forwarder_index = 0;
        this.forwarders = forwarders;
        for (let forwarder of forwarders) {
            forwarder.automata.add_finish_action(() => this.automata.input("switch to next state"));
        }
        this.automata = (0,_Automata_Automata_Configurator_js__WEBPACK_IMPORTED_MODULE_1__.create_automata)([0, 1], 0, () => { }, [
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(0).to(0)
                .on("switch to next state")
                .if(() => this.current_forwarder_index < this.forwarders.length - 1)
                .do(() => { this.current_forwarder_index++; this.current_forwarder().set_active(); }),
            (0,_Automata_Transitions_js__WEBPACK_IMPORTED_MODULE_2__.from)(0).to(1)
                .on("switch to next state")
                .if(() => this.current_forwarder_index == this.forwarders.length - 1)
                .do(() => { })
        ], [1]);
        this.automata.initialize();
        // this.set_active();
        // console.log("active forward: " + this.current_forwarder().forwarder_name);
    }
    input(input) {
        this.forwarders[this.current_forwarder_index].input(input);
    }
    input_sequence(input_sequence) {
        for (let s of input_sequence)
            this.input(s);
    }
    current_forwarder() {
        return this.forwarders[this.current_forwarder_index];
    }
    set_active() {
        super.set_active();
        this.current_forwarder().set_active();
    }
}
//# sourceMappingURL=Sequential_Forwarder_Forwarder.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js":
/*!*********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BROWSER_EXPERIMENT: () => (/* binding */ BROWSER_EXPERIMENT),
/* harmony export */   Browser_Output_Writer: () => (/* binding */ Browser_Output_Writer)
/* harmony export */ });
/* harmony import */ var _Experimentation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");
/* harmony import */ var _functions_create_code_experiment_execution_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./functions/create_code_experiment_execution.js */ "./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js");



class Browser_Output_Writer extends _Experimentation_js__WEBPACK_IMPORTED_MODULE_0__.Experiment_Output_Writer {
    print_experiment_name(s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    }
    clear_error() {
        let element_id = [
            "STAGE_ERROR"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    clear_stage() {
        let element_id = [
            "STAGE",
            "STAGE_MSG",
            "STAGE_ERROR"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    clear_state() {
        let element_id = [
            "STATE",
            "TASK"
        ];
        for (let e of element_id) {
            let parent = document.getElementById(e);
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }
    print_error_string_on_stage(s) {
        let e = this.get_html_element_by_id("STAGE_ERROR");
        e.innerHTML = s;
    }
    get_html_element_by_id(s) {
        // @ts-ignore
        return document.getElementById(s);
    }
    print_string_to_state(s) {
        this.get_html_element_by_id("STATE").innerHTML = s;
    }
    print_string_on_stage(s) {
        this.print_html_on_stage("<p>" + s + "</p>");
    }
    ask_for_input() {
        // @ts-ignore
        let p = document.createElement("p");
        let l = document.createElement("label");
        l.setAttribute('type', 'text');
        p.textContent = "Answer: ";
        p.appendChild(l);
        // @ts-ignore
        let i = document.createElement("input");
        i.setAttribute('type', 'text');
        i.setAttribute('class', 'input');
        p.appendChild(i);
        i.id = "INPUT";
        this.get_html_element_by_id("STAGE").appendChild(p);
        i.focus();
    }
    set_focus_on_input() {
        let i = this.get_html_element_by_id("INPUT");
        i.focus();
    }
    print_string_to_page_number(s) {
        this.get_html_element_by_id("TASK").innerHTML = s;
    }
    get_given_answer() {
        return this.get_html_element_by_id("INPUT").value;
    }
    print_on_input_response(given_answer) {
        this.get_html_element_by_id("INPUT").value = given_answer;
    }
    create_html_element_from_string(s) {
        let parser = new DOMParser();
        let elements = parser.parseFromString(s, "text/html").body;
        return elements;
    }
    print_html_on_stage(s) {
        // for(let e of this.create_html_element_from_string(s)) {
        this.get_html_element_by_id("STAGE")
            .appendChild(this.create_html_element_from_string(s));
        // }
    }
    print_html_on_error(s) {
        // for(let e of this.create_html_element_from_string(s)) {
        //     this.get_html_element_by_id("STAGE_ERROR")
        //         .appendChild(e);
        // }
        this.get_html_element_by_id("STAGE_ERROR")
            .appendChild(this.create_html_element_from_string(s));
    }
}
function BROWSER_EXPERIMENT(creator) {
    let browser_output = new Browser_Output_Writer();
    let cfg = creator(browser_output);
    let this_measurement = cfg.measurement(browser_output);
    let experiment_automata = (0,_functions_create_code_experiment_execution_js__WEBPACK_IMPORTED_MODULE_2__.create_code_experiment_execution)({
        experiment_name: cfg.experiment_name,
        seed: cfg.seed,
        introduction_pages: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_instructions,
        training_configuration: cfg.training_configuration,
        pre_run_experiment_output: cfg.pre_run_experiment_instructions,
        finish_pages: cfg.finish_pages,
        layout: cfg.layout,
        repetitions: cfg.repetitions,
        task_configuration: cfg.task_configuration,
        measurement: this_measurement,
        finish_function: (exp) => {
            // @ts-ignore
            document.removeEventListener("keydown", key_forwarder);
            (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.save_file_in_html)("experimentdata.csv", exp.generate_csv_data());
        }
    });
    let key_forwarder = (e) => {
        let key_string = (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.key_event_string)(e);
        experiment_automata.input(key_string);
    };
    // @ts-ignore
    document.addEventListener("keydown", key_forwarder, false);
    experiment_automata.set_active();
}
//# sourceMappingURL=Browser_Output_Writer.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js":
/*!**************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Code_Experiment_Definition: () => (/* binding */ Code_Experiment_Definition),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Experiment_Definition.js */ "./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js");
/* harmony import */ var _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Automata_Forwarders/Book_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Book_Forwarder.js");
/* harmony import */ var _Books_Sequential_Forwarder_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Books/Sequential_Forwarder_Forwarder.js */ "./N-of-1-Experimentation/modules/Books/Sequential_Forwarder_Forwarder.js");
/* harmony import */ var _Automata_Forwarders_Training_Execution_Forwarder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Automata_Forwarders/Training_Execution_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Training_Execution_Forwarder.js");
/* harmony import */ var _Experimentation_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");
/* harmony import */ var _Automata_Forwarders_Experiment_Forwarder_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Automata_Forwarders/Experiment_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Experiment_Forwarder.js");
/* harmony import */ var _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Automata_Forwarders/Questionnaire_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js");







function init() { }
// TODO: Both classes should be one!!!
class Code_Experiment_Definition extends _Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_0__.Experiment_Definition {
    create_code_all_experiment_automatas(cfg) {
        let output_writer = cfg.measurement.output_writer();
        let introduction_book = new _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__.Book_Forwarder("Introduction", cfg.introduction_texts, cfg.measurement);
        let ending_book = new _Automata_Forwarders_Book_Forwarder_js__WEBPACK_IMPORTED_MODULE_1__.Book_Forwarder("Finish", cfg.finish_texts, cfg.measurement);
        ending_book.automata.add_finish_action(() => cfg.finish_function(experiment_execution_forwarder.experiment_definition));
        let experiment_execution_forwarder = new _Automata_Forwarders_Experiment_Forwarder_js__WEBPACK_IMPORTED_MODULE_5__.Experiment_Forwarder(cfg.pre_run_experiment_output, this, cfg.measurement);
        (0,_Experimentation_js__WEBPACK_IMPORTED_MODULE_4__.SET_SEED)(cfg.seed);
        experiment_execution_forwarder.init_experiment();
        let cloned_experiment_definition = this.clone();
        let training_forwarder = new _Automata_Forwarders_Training_Execution_Forwarder_js__WEBPACK_IMPORTED_MODULE_3__.Training_Execution_Forwarder(cfg.pre_run_training_output, cfg.training_configuration, cloned_experiment_definition, cfg.measurement);
        training_forwarder.init_experiment();
        let post_questionnaire = null;
        if (cfg.post_questionnaire != undefined) {
            post_questionnaire = new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_6__.Questionnaire_Forwarder(cfg.post_questionnaire, cfg.measurement);
        }
        let forwarders = [];
        if (introduction_book != null) {
            forwarders.push(introduction_book);
        }
        forwarders.push(training_forwarder);
        forwarders.push(experiment_execution_forwarder);
        if (post_questionnaire != null) {
            forwarders.push(post_questionnaire);
            experiment_execution_forwarder.experiment_definition.questionnaires.push(post_questionnaire);
        }
        forwarders.push(ending_book);
        let forwarder = new _Books_Sequential_Forwarder_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Sequential_Forwarder_Forwarder(forwarders);
        return forwarder;
    }
    // WHATEVER HAPPENS ON EARTH - THIS SHOULD ONLY BE USED FOR TRAINING!
    clone() {
        let clone = new Code_Experiment_Definition(this.template.experiment_name, this.is_training, this.treatments_combinator.clone(), this.template.variables, this.template.repetitions, this.measurement, this.template.task_creator);
        return clone;
    }
}
//# sourceMappingURL=Code_Experiment_Definition.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js":
/*!*********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Experiment_Definition.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Definition: () => (/* binding */ Experiment_Definition),
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
function init() { }
class Experiment_Definition {
    constructor(experiment_name, is_training, treatments_combinator, variables, repetitions, measurement, task_creator) {
        this.questionnaires = [];
        this.tasks = [];
        this.experiment_name = experiment_name;
        this.is_training = is_training;
        this.template = { experiment_name: experiment_name, variables: variables, repetitions: repetitions, task_creator: task_creator };
        this.treatments_combinator = treatments_combinator;
        this.variables = variables;
        this.measurement = measurement;
        this.experiment_definition_task_creator = task_creator;
    }
    init_experiment(is_training) {
        this.tasks = this.treatments_combinator.create_tasks(this);
    }
    all_independent_variables() {
        return this.variables.independent_variables;
    }
    generate_csv_data() {
        let result = [];
        // let questionnaire_variables = this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        for (let questionnaire of this.questionnaires) {
            for (let question of questionnaire.questions) {
                result.push("\"" + question.variable_name + "\"" + ";");
            }
        }
        this.variables.print_to_array(result);
        result.push("number_of_given_answers;expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
        for (let task of this.tasks) {
            for (let questionnaire of this.questionnaires) {
                for (let question of questionnaire.questions) {
                    result.push("\"" + question.answer + "\"" + ";");
                }
            }
            for (let treatment_combination of task.treatment_combination.treatment_combination) {
                result.push(treatment_combination.value + ";");
            }
            result.push((task.invalid_answers.length + 1) + ";");
            result.push(task.expected_answer + ";");
            result.push(task.given_answer + ";");
            result.push("" + (task.given_answer == task.expected_answer) + ";");
            result.push(task.required_milliseconds + ";");
            task.invalid_answers.forEach((a) => result.push(a[0] + ";" + a[1] + ";"));
            result.push("\n");
        }
        return result;
    }
}
//# sourceMappingURL=Experiment_Definition.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js":
/*!***************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Experimentation.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Experiment_Input_Type: () => (/* binding */ Experiment_Input_Type),
/* harmony export */   Experiment_Output_Writer: () => (/* binding */ Experiment_Output_Writer),
/* harmony export */   Free_Text_User_Input_Experiment: () => (/* binding */ Free_Text_User_Input_Experiment),
/* harmony export */   Free_Text_User_Input_Experiment_With_PrePost: () => (/* binding */ Free_Text_User_Input_Experiment_With_PrePost),
/* harmony export */   Key_Pressing: () => (/* binding */ Key_Pressing),
/* harmony export */   Measurement_Type: () => (/* binding */ Measurement_Type),
/* harmony export */   Random: () => (/* binding */ Random),
/* harmony export */   Reaction_Time: () => (/* binding */ Reaction_Time),
/* harmony export */   Reaction_Time_Measurement: () => (/* binding */ Reaction_Time_Measurement),
/* harmony export */   Reaction_Time_Penalty_Measurement: () => (/* binding */ Reaction_Time_Penalty_Measurement),
/* harmony export */   Reaction_Time_With_Penalty: () => (/* binding */ Reaction_Time_With_Penalty),
/* harmony export */   SET_SEED: () => (/* binding */ SET_SEED),
/* harmony export */   Time_To_Finish_Measurement: () => (/* binding */ Time_To_Finish_Measurement),
/* harmony export */   Time_To_Finish_With_Time_Penalty_Measurement: () => (/* binding */ Time_To_Finish_With_Time_Penalty_Measurement),
/* harmony export */   Time_to_finish: () => (/* binding */ Time_to_finish),
/* harmony export */   Time_to_finish_with_Penalty: () => (/* binding */ Time_to_finish_with_Penalty),
/* harmony export */   VARIABLE_TYPE: () => (/* binding */ VARIABLE_TYPE),
/* harmony export */   alternatives: () => (/* binding */ alternatives),
/* harmony export */   do_random_array_sort: () => (/* binding */ do_random_array_sort),
/* harmony export */   free_text: () => (/* binding */ free_text),
/* harmony export */   information: () => (/* binding */ information),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   random_array_element: () => (/* binding */ random_array_element),
/* harmony export */   random_integer_up_to_excluding: () => (/* binding */ random_integer_up_to_excluding),
/* harmony export */   text_input_experiment: () => (/* binding */ text_input_experiment),
/* harmony export */   text_input_experiment_with_pre_post_label: () => (/* binding */ text_input_experiment_with_pre_post_label)
/* harmony export */ });
/* harmony import */ var _modules_hard_import_seedrandom_seedrandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../modules_hard_import/seedrandom/seedrandom.js */ "./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js");
/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils.js */ "./N-of-1-Experimentation/modules/utils/Utils.js");
/* harmony import */ var _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Automata_Forwarders/Questionnaire_Forwarder.js */ "./N-of-1-Experimentation/modules/Automata_Forwarders/Questionnaire_Forwarder.js");



function init() { }
var VARIABLE_TYPE;
(function (VARIABLE_TYPE) {
    VARIABLE_TYPE[VARIABLE_TYPE["STRING"] = 1] = "STRING";
    VARIABLE_TYPE[VARIABLE_TYPE["NUMBER"] = 2] = "NUMBER";
})(VARIABLE_TYPE || (VARIABLE_TYPE = {}));
function Reaction_Time(input) {
    return (writer) => new Reaction_Time_Measurement(input(writer));
}
;
function Reaction_Time_With_Penalty(input, penalty_seconds) {
    return (writer) => new Reaction_Time_Penalty_Measurement(input(writer), penalty_seconds);
}
;
function Time_to_finish(input) {
    return (writer) => new Time_To_Finish_Measurement(input(writer));
}
function Time_to_finish_with_Penalty(input, penalty_seconds) {
    return (writer) => new Time_To_Finish_With_Time_Penalty_Measurement(input(writer), penalty_seconds);
}
function keys(key_list) {
    return (writer) => new Key_Pressing(key_list, writer);
}
function text_input_experiment(output_writer) {
    return new Free_Text_User_Input_Experiment(output_writer);
}
function text_input_experiment_with_pre_post_label(pre, post) {
    return (output_writer) => new Free_Text_User_Input_Experiment_With_PrePost(output_writer, pre, post);
}
function information(question) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Information(question);
}
function free_text(var_name, question) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Freetext(var_name, question);
}
function alternatives(var_name, question, alternatives) {
    return new _Automata_Forwarders_Questionnaire_Forwarder_js__WEBPACK_IMPORTED_MODULE_2__.Alternatives(var_name, question, alternatives);
}
class Experiment_Output_Writer {
    convert_string_to_html_string(s) {
        return (0,_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.convert_string_to_html_string)(s);
    }
    string_page_command(s) {
        return () => this.print_string_on_stage(s);
    }
    stage_string_pages_commands(pages) {
        let ret = [];
        for (let a of pages) {
            ret.push(this.string_page_command(a));
        }
        return ret;
    }
    get_given_answer(input) {
        return input;
    }
    print_on_input_response(given_answer) { }
    set_focus_on_input() { }
    clear_all() {
        this.clear_state();
        this.clear_stage();
    }
}
class Measurement_Type {
    constructor(input_type) {
        this.input_type = input_type;
    }
    accepted_responses() {
        return this.input_type.accepted_responses();
    }
    given_answer(i) {
        return this.input_type.given_answer(i);
    }
    start_measurement(task) {
        this.start_time = new Date().getTime().valueOf();
        task.print_task();
    }
    stop_measurement(input, task) {
        let end_time = new Date().getTime().valueOf();
        task.given_answer = this.input_type.get_given_answer(input);
        task.required_milliseconds = end_time - this.start_time;
        task.do_print_after_task_information();
    }
    incorrect_response(i, task) {
        let end_time = new Date().getTime().valueOf();
        let given_answer = task.experiment_definition.measurement.get_given_answer(i);
        task.invalid_answers.push([given_answer, end_time - this.start_time]);
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    output_writer() {
        return this.input_type.output_writer;
    }
    get_given_answer(input) {
        return this.input_type.get_given_answer(input);
    }
    demands_penalty() {
        return false;
    }
    penalty_is_over() {
        return true;
    }
}
class Reaction_Time_Measurement extends Measurement_Type {
    constructor(input_type) {
        super(input_type);
    }
}
class Reaction_Time_Penalty_Measurement extends Measurement_Type {
    constructor(input_type, penalty_seconds) {
        super(input_type);
        this.penalty_started = false;
        this.penalty_start_point = null;
        this.penalty_miliseconds = penalty_seconds * 1000;
    }
    demands_penalty() {
        return true;
    }
    incorrect_response(i, task) {
        super.incorrect_response(i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    delete_penalty() {
        this.penalty_started = false;
        this.penalty_start_point = null;
    }
    penalty_is_over() {
        let diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    }
    start_measurement(task) {
        super.start_measurement(task);
        this.delete_penalty();
    }
}
class Time_To_Finish_Measurement extends Measurement_Type {
    constructor(input_type) {
        super(input_type);
    }
}
class Time_To_Finish_With_Time_Penalty_Measurement extends Time_To_Finish_Measurement {
    constructor(input_type, penalty_seconds) {
        super(input_type);
        this.penalty_started = false;
        this.penalty_start_point = null;
        this.penalty_miliseconds = penalty_seconds * 1000;
    }
    demands_penalty() {
        return true;
    }
    incorrect_response(i, task) {
        super.incorrect_response(i, task);
        this.penalty_started = true;
        this.penalty_start_point = new Date().getTime().valueOf();
        task.do_print_error_message(this.input_type.get_given_answer(i));
    }
    delete_penalty() {
        this.penalty_started = false;
        this.penalty_start_point = null;
    }
    penalty_is_over() {
        let diff = (new Date().getTime().valueOf()) - this.start_time;
        return !this.penalty_started || diff >= this.penalty_miliseconds;
    }
    start_measurement(task) {
        super.start_measurement(task);
        this.delete_penalty();
    }
}
class Experiment_Input_Type {
    constructor(output_writer) {
        this.output_writer = output_writer;
    }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
    get_given_answer(input_string) {
        let value = this.output_writer.get_given_answer(input_string);
        return value;
    }
}
class Key_Pressing extends Experiment_Input_Type {
    constructor(accepted_keys, output_writer) {
        super(output_writer);
        this.accepted_keys = accepted_keys;
    }
    accepted_responses() {
        return this.accepted_keys;
    }
    given_answer(key_pressed) {
        return key_pressed;
    }
    print_input_request() {
        // I am a key....no need for input fields
    }
    get_given_answer(input_string) {
        return input_string;
    }
}
class Free_Text_User_Input_Experiment extends Experiment_Input_Type {
    constructor(output_writer) {
        super(output_writer);
    }
    accepted_responses() {
        return ["Enter"];
    }
    given_answer(key_pressed) { }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
}
class Free_Text_User_Input_Experiment_With_PrePost extends Experiment_Input_Type {
    constructor(output_writer, pre, post) {
        super(output_writer);
    }
    accepted_responses() {
        return ["Enter"];
    }
    given_answer(key_pressed) { }
    print_input_request() {
        this.output_writer.ask_for_input();
    }
}
class _Random {
    constructor() {
        // @ts-ignore
        Math.seedrandom('1234567890');
    }
    // @ts-ignore
    new_random_integer(upper_limit) {
        return Math.trunc(upper_limit * Math.random());
    }
    set_seed(seed) {
        // @ts-ignore
        Math.seedrandom(seed);
    }
}
const Random = new _Random();
function SET_SEED(seed) {
    Random.set_seed(seed);
}
function random_integer_up_to_excluding(upper_limit) {
    return Random.new_random_integer(upper_limit);
}
function do_random_array_sort(array) {
    let copy = [...array];
    let result = [];
    while (copy.length > 0) {
        result.push(copy.splice(random_integer_up_to_excluding(copy.length), 1)[0]);
    }
    return result;
}
function random_array_element(array) {
    return array[random_integer_up_to_excluding(array.length)];
}
// This invocation just makes sure that RANDOM is loaded
(0,_modules_hard_import_seedrandom_seedrandom_js__WEBPACK_IMPORTED_MODULE_0__["default"])();
//# sourceMappingURL=Experimentation.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Task.js":
/*!****************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Task.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
class Task {
    constructor(tc, experiment_definition, text) {
        this.expected_answer = "";
        this.given_answer = "";
        this.required_milliseconds = null;
        this.task_number_in_execution = -1;
        this.invalid_answers = [];
        this.is_training = false;
        this.do_print_task = () => {
            throw new Error("Method not implemented.");
        };
        this.do_print_error_message = () => {
            throw new Error("Method not implemented.");
        };
        this.accepts_answer_function = (answer) => true;
        this.do_print_after_task_information = () => {
            throw new Error("Method not implemented.");
        };
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }
    accepts_answer(input) {
        let answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    }
    next_task() {
        if (this.task_number_in_execution < this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    }
    html_string_with_cmd(html_string, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    }
    html_node_with_cmd(element, cmd) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    }
    after_task_string_constructor(a_string_constructor) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }
    print_task() {
        this.do_print_task();
        this.print_input_request();
    }
    print_input_request() {
        this.experiment_definition.measurement.input_type.print_input_request();
    }
    treatment_value(treatment_name) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === treatment_name)
                return treatment.value;
        throw "Unknown treatment: " + treatment_name;
    }
    set_computed_variable_value(variable_name, value) {
        for (let treatment of this.treatment_combination.treatment_combination)
            if (treatment.variable.name === variable_name) {
                treatment.value = value;
                return;
            }
        throw "Unknown treatment: " + variable_name;
    }
}
//# sourceMappingURL=Task.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js":
/*!**********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Training_Configuration: () => (/* binding */ Training_Configuration)
/* harmony export */ });
/* harmony import */ var _treatments_Treatment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./treatments/Treatment.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js");
/* harmony import */ var _utils_loops_loop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loops/loop.js */ "./N-of-1-Experimentation/modules/utils/loops/loop.js");
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Task.js */ "./N-of-1-Experimentation/modules/Experimentation/Task.js");
/* harmony import */ var _treatments_Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./treatments/Treatment_Combination.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js");




class Training_Configuration {
    constructor(training_configuration) {
        this.can_be_cancelled = true;
        this.can_be_repeated = true;
        if (training_configuration === undefined)
            return;
        if (training_configuration.fixed_treatments != undefined)
            this.fixed_treatments = training_configuration.fixed_treatments;
        this.can_be_cancelled = training_configuration.can_be_cancelled;
        this.can_be_repeated = training_configuration.can_be_repeated;
    }
    init_experiment(experiment_definition) {
        experiment_definition.tasks = [];
        if (this.fixed_treatments != undefined) {
            for (let a_treatment_combination of this.fixed_treatments) {
                let treatment_combination = new _treatments_Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_3__.Treatment_Combination([]);
                (0,_utils_loops_loop_js__WEBPACK_IMPORTED_MODULE_1__.loop_both)(experiment_definition.all_independent_variables(), a_treatment_combination, (variable, value) => {
                    treatment_combination.treatment_combination.push(new _treatments_Treatment_js__WEBPACK_IMPORTED_MODULE_0__.Treatment(variable, value));
                });
                let task = new _Task_js__WEBPACK_IMPORTED_MODULE_2__.Task(treatment_combination, experiment_definition, "");
                task.is_training = true;
                experiment_definition.experiment_definition_task_creator(task);
                experiment_definition.tasks.push(task);
            }
        }
        else {
            experiment_definition.init_experiment(true);
        }
    }
}
//# sourceMappingURL=Training_Configuration.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js":
/*!******************************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/functions/create_code_experiment_execution.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_code_experiment_execution: () => (/* binding */ create_code_experiment_execution)
/* harmony export */ });
/* harmony import */ var _treatments_Treatments_Combinator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../treatments/Treatments_Combinator.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js");
/* harmony import */ var _Code_Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Code_Experiment_Definition.js */ "./N-of-1-Experimentation/modules/Experimentation/Code_Experiment_Definition.js");
/* harmony import */ var _Training_Configuration_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Training_Configuration.js */ "./N-of-1-Experimentation/modules/Experimentation/Training_Configuration.js");
/* harmony import */ var _treatments_Independent_Variables_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../treatments/Independent_Variables.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js");




function create_code_experiment_execution(cfg) {
    let variables = _treatments_Independent_Variables_js__WEBPACK_IMPORTED_MODULE_3__.Independent_Variables.from_layout(cfg.layout);
    let all_treatment_combinations = new _treatments_Treatments_Combinator_js__WEBPACK_IMPORTED_MODULE_0__.Treatments_Combinator(variables, cfg.repetitions);
    let experiment_definition = new _Code_Experiment_Definition_js__WEBPACK_IMPORTED_MODULE_1__.Code_Experiment_Definition(cfg.experiment_name, false, all_treatment_combinations, variables, cfg.repetitions, cfg.measurement, cfg.task_configuration);
    let training_configuration = new _Training_Configuration_js__WEBPACK_IMPORTED_MODULE_2__.Training_Configuration(cfg.training_configuration);
    let experiment_execution = experiment_definition.create_code_all_experiment_automatas({
        seed: cfg.seed,
        introduction_texts: cfg.introduction_pages,
        post_questionnaire: cfg.post_questionnaire,
        pre_run_training_output: cfg.pre_run_training_output,
        training_configuration: training_configuration,
        // post_run_training_output: cfg.post_run_training_output,
        pre_run_experiment_output: cfg.pre_run_experiment_output,
        // post_run_experiment_output: cfg.post_run_experiment_output,
        finish_texts: cfg.finish_pages,
        measurement: cfg.measurement,
        finish_function: cfg.finish_function
    });
    return experiment_execution;
}
//# sourceMappingURL=create_code_experiment_execution.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js":
/*!*******************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Independent_Variable: () => (/* binding */ Independent_Variable)
/* harmony export */ });
/* harmony import */ var _Treatment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Treatment.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js");

class Independent_Variable {
    constructor(name, treatments) {
        this.treatments = [];
        this.name = name;
        for (let aString of treatments) {
            this.treatments.push(new _Treatment_js__WEBPACK_IMPORTED_MODULE_0__.Treatment(this, aString));
        }
    }
}
//# sourceMappingURL=Independent_Variable.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variables.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Independent_Variables: () => (/* binding */ Independent_Variables)
/* harmony export */ });
/* harmony import */ var _Independent_Variable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Independent_Variable.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Independent_Variable.js");
/* harmony import */ var _utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/arrays/all_array_combinations.js */ "./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js");
/* harmony import */ var _Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Treatment_Combination.js */ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js");



class Independent_Variables {
    constructor() {
        this.independent_variables = [];
    }
    push_variable(n, treatments) {
        this.independent_variables.push(new _Independent_Variable_js__WEBPACK_IMPORTED_MODULE_0__.Independent_Variable(n, treatments));
    }
    print_to_array(result) {
        for (let variable of this.independent_variables) {
            result.push(variable.name + ";");
        }
    }
    create_treatment_combinations() {
        let treatment_combinations = [];
        (0,_utils_arrays_all_array_combinations_js__WEBPACK_IMPORTED_MODULE_1__.all_array_combinations)(this.independent_variables.map(t => t.treatments), (treatments) => {
            treatment_combinations.push(new _Treatment_Combination_js__WEBPACK_IMPORTED_MODULE_2__.Treatment_Combination([...treatments]));
        });
        return treatment_combinations;
    }
    get_variable_named(var_name) {
        for (let v of this.independent_variables) {
            if (v.name === var_name)
                return v;
        }
        throw "Unknown independent variable named: " + var_name;
    }
    static from_layout(layout) {
        let variables = new Independent_Variables();
        for (let aVar of layout) {
            variables.push_variable(aVar.variable, aVar.treatments);
        }
        return variables;
    }
}
//# sourceMappingURL=Independent_Variables.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js":
/*!********************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatment: () => (/* binding */ Treatment)
/* harmony export */ });
class Treatment {
    constructor(variable, value) {
        this.variable = variable;
        this.value = "" + value;
    }
    clone() {
        let ret = new Treatment(this.variable, this.value);
        return ret;
    }
}
//# sourceMappingURL=Treatment.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatment_Combination.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatment_Combination: () => (/* binding */ Treatment_Combination)
/* harmony export */ });
class Treatment_Combination {
    constructor(treatment_combination) {
        this.treatment_combination = [];
        this.treatment_combination = treatment_combination;
    }
    clone() {
        let ret = new Treatment_Combination([]);
        for (let treatment of this.treatment_combination) {
            ret.treatment_combination.push(treatment.clone());
        }
        return ret;
    }
}
//# sourceMappingURL=Treatment_Combination.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js":
/*!********************************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/Experimentation/treatments/Treatments_Combinator.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Treatments_Combinator: () => (/* binding */ Treatments_Combinator)
/* harmony export */ });
/* harmony import */ var _Task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Task.js */ "./N-of-1-Experimentation/modules/Experimentation/Task.js");
/* harmony import */ var _Experimentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");


/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
class Treatments_Combinator {
    constructor(variables, repetitions) {
        this.variables = variables;
        this.repetitions = repetitions;
    }
    clone() {
        return new Treatments_Combinator(this.variables, this.repetitions);
    }
    create_treatment_combinations() {
        let treatment_combinations = [];
        for (let r = 0; r < this.repetitions; r++) {
            treatment_combinations = treatment_combinations.concat(this.variables.create_treatment_combinations());
        }
        return treatment_combinations;
    }
    create_tasks(experiment_definition) {
        let tasks = [];
        for (let treatment_combination of this.create_treatment_combinations()) {
            let task = new _Task_js__WEBPACK_IMPORTED_MODULE_0__.Task(treatment_combination.clone(), experiment_definition, "");
            experiment_definition.experiment_definition_task_creator(task);
            task.is_training = experiment_definition.is_training;
            tasks.push(task);
        }
        return (0,_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.do_random_array_sort)(tasks);
    }
    get_variable_named(var_name) {
        return this.variables.get_variable_named(var_name);
    }
}
//# sourceMappingURL=Treatments_Combinator.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/Utils.js":
/*!*******************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/Utils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   add_upload_push_button: () => (/* binding */ add_upload_push_button),
/* harmony export */   array_to_sequence_of_size_: () => (/* binding */ array_to_sequence_of_size_),
/* harmony export */   cartesian_product: () => (/* binding */ cartesian_product),
/* harmony export */   contains: () => (/* binding */ contains),
/* harmony export */   convert_string_to_html_string: () => (/* binding */ convert_string_to_html_string),
/* harmony export */   csv_encoding: () => (/* binding */ csv_encoding),
/* harmony export */   guarantee_test: () => (/* binding */ guarantee_test),
/* harmony export */   guarantee_true: () => (/* binding */ guarantee_true),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   key_event_string: () => (/* binding */ key_event_string),
/* harmony export */   save_file_in_html: () => (/* binding */ save_file_in_html),
/* harmony export */   upload_experiment_to_server: () => (/* binding */ upload_experiment_to_server)
/* harmony export */ });
/* harmony import */ var _Utils_Test_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils_Test.js */ "./N-of-1-Experimentation/modules/utils/Utils_Test.js");

function init() { }
function contains(collection, element) {
    return collection.indexOf(element) != -1;
}
function cartesian_product(arr1, arr2, f) {
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; i < arr2.length; i++) {
            f(arr1[i], arr2[j]);
        }
    }
}
function guarantee_test(f) {
    let result = f();
    if (!result)
        throw "Something is wrong here";
}
function guarantee_true(trueFalse) {
    if (!trueFalse)
        throw "Something is wrong here";
}
function convert_string_to_html_string(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\n/g, "<br/>")
        .replace(/ /g, '&nbsp;');
}
function key_event_string(event) {
    var postfix = "";
    if (event.key == "Alt")
        if (event.ctrlKey)
            return "Alt+Ctrl";
    if (event.key == "Control")
        if (event.altKey)
            return "Ctrl+Alt";
    postfix = postfix + (event.altKey ? "+Alt" : "");
    postfix = postfix + (event.ctrlKey ? "+Control" : "");
    if (event.key == "Alt")
        return "Alt";
    // if(event.key=="Control") return postfix;
    return "" + event.key + postfix;
}
function array_to_sequence_of_size_(sequence) {
    var ret = [];
    var counter = 0;
    for (var element of sequence) {
        ret.push(counter);
        counter++;
    }
    return ret;
}
function csv_encoding(a_string) {
    let add_escapes = a_string.split("\"").join("\"\"");
    return "\"" + add_escapes + "\"";
}
function save_file_in_html(filename, data) {
    const blob = new Blob(data, { type: 'application/ssc' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
}
function add_upload_push_button(url, button_test, data) {
    const elem = window.document.createElement('form');
    elem.setAttribute("action", url);
    elem.setAttribute("method", "post");
    const i = window.document.createElement('input');
    i.setAttribute("name", "data");
    i.setAttribute("type", "hidden");
    i.setAttribute("value", data);
    elem.appendChild(i);
    const j = window.document.createElement('input');
    j.setAttribute("value", button_test);
    j.setAttribute("type", "submit");
    elem.appendChild(j);
    document.body.appendChild(elem);
}
function upload_experiment_to_server(experiment) {
    let csv = experiment.generate_csv_data();
    let currentUrl = window.location.href;
    // const response = fetch('http://127.0.0.1:8088', {
    //     method: 'POST',
    //     body: JSON.stringify({experiment_name : "dummy2", experiment_data: data}),
    //     headers: {'Content-Type': 'application/json; charset=UTF-8'} })
    console.log(currentUrl);
}
(0,_Utils_Test_js__WEBPACK_IMPORTED_MODULE_0__.do_tests)();
//# sourceMappingURL=Utils.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/Utils_Test.js":
/*!************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/Utils_Test.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   do_tests: () => (/* binding */ do_tests)
/* harmony export */ });
// Does not do anything any longer. I still keep it here - probably need it in the future.
// Is executed by Utils.
function do_tests() {
    // let encoded_string = "";
    //
    // encoded_string =csv_encoding('"');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('""');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('""""""""""');
    // console.log(encoded_string);
    //
    // encoded_string = csv_encoding('";');
    // console.log(encoded_string);
}
//# sourceMappingURL=Utils_Test.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js":
/*!*******************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/arrays/all_array_combinations.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   all_array_combinations: () => (/* binding */ all_array_combinations),
/* harmony export */   all_different_x_tupel: () => (/* binding */ all_different_x_tupel),
/* harmony export */   all_x_tupel: () => (/* binding */ all_x_tupel)
/* harmony export */ });
function all_array_combinations_internal(arr, combination, f) {
    if (arr.length == 0) {
        f(combination);
    }
    else {
        let last = arr.shift();
        for (let e of last) {
            combination.push(e);
            all_array_combinations_internal(arr, combination, f);
            combination.pop();
        }
        arr.unshift(last);
    }
}
/**
 *  @param arr: An array of arrays
 *  executes for all combinations or arrays the function f
 */
function all_array_combinations(arr, f) {
    all_array_combinations_internal(arr, [], f);
}
/**
 * Examples:
 *   all_x_tupel(1, [1, 2, 3]) = [1, 2, 3]
 *   all_x_tupel(2, [1, 2, 3]) = [[1, 1], [1,2]], [1,3], [2,1]....[3,3]]

 */
function all_x_tupel(tupel_length, arr) {
    let result = [];
    if (tupel_length == 1) {
        for (let e of arr) {
            result.push([e]);
        }
        return result;
    }
    let x_minus_one_tupel = all_x_tupel(tupel_length - 1, arr);
    for (let e of arr) {
        for (let a_x_minux_one_tupel of x_minus_one_tupel) {
            result.push([e, ...a_x_minux_one_tupel]);
        }
    }
    return result;
}
/**
 * Examples:
 *   all_different_x_tupel(3, [1, 2, 3]) = [[1, 2, 3], [1,3,2], [2,1,3], [2,3,1]. [3,1,2], [3,2,1]]
 *
*/
function all_different_x_tupel(tupel_length, arr) {
    let result = [];
    if (tupel_length == 1) {
        for (let e of arr) {
            result.push([e]);
        }
        return result;
    }
    for (let e = 0; e < arr.length; e++) {
        let arr_without_current_element = arr.slice();
        arr_without_current_element.splice(e, 1);
        let x_minus_one_tupel = all_different_x_tupel(tupel_length - 1, arr_without_current_element);
        for (let a_x_minux_one_tupel of x_minus_one_tupel) {
            result.push([arr[e], ...a_x_minux_one_tupel]);
        }
    }
    return result;
}
//# sourceMappingURL=all_array_combinations.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules/utils/loops/loop.js":
/*!************************************************************!*\
  !*** ./N-of-1-Experimentation/modules/utils/loops/loop.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loop_both: () => (/* binding */ loop_both),
/* harmony export */   loop_with_counter: () => (/* binding */ loop_with_counter),
/* harmony export */   repeat: () => (/* binding */ repeat)
/* harmony export */ });
function loop_with_counter(array, f) {
    let counter = 0;
    for (let e of this.array) {
        f(e, counter++);
    }
}
function loop_both(a1, a2, f) {
    if (a1.length > a2.length)
        throw "Cannot loop both: first array has length: " + a1.length + ", but second has length " + a2.length;
    let counter = 0;
    for (let e of a1) {
        f(e, a2[counter++]);
    }
}
function repeat(n, f) {
    for (let c = 0; c < n; c++) {
        f(c);
    }
}
//# sourceMappingURL=loop.js.map

/***/ }),

/***/ "./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js":
/*!*****************************************************************************!*\
  !*** ./N-of-1-Experimentation/modules_hard_import/seedrandom/seedrandom.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dummy)
/* harmony export */ });
/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto          // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) {
          math[rngname] = prng;
          return seed;
        }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    // console.log(obj);
    for (prop in obj) {
      // console.log(prop);
      try {
        result.push(
            flatten(
                obj[
                    prop
                ],
                depth - 1)
        );
      } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {

    nodecrypto = require('crypto');
    var out = crypto.randomByte
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ((typeof module) == 'object' && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = require('crypto');
  } catch (ex) {}
} else if ((typeof define) == 'function' && define.amd) {
  define(function() { return seedrandom; });
} else {
  // When included as a plain script, set up Math.seedrandom global.
  math['seed' + rngname] = seedrandom;
}

  // module.exports = seedrandom;

// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : undefined,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);

function dummy(){
  //
  // for(let i = 0; i < 10; i++)
  // let c = crypto;
  // console.log("do things");
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!**********************************************************************************!*\
  !*** ./2024_LanguageTypesDSL_Readability/typescript/experiment_configuration.ts ***!
  \**********************************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _N_of_1_Experimentation_modules_Experimentation_Browser_Output_Writer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js */ "./N-of-1-Experimentation/modules/Experimentation/Browser_Output_Writer.js");
/* harmony import */ var _N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js */ "./N-of-1-Experimentation/modules/Experimentation/Experimentation.js");
/* harmony import */ var _code_Feature_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./code/Feature.js */ "./2024_LanguageTypesDSL_Readability/typescript/code/Feature.js");



let SEED = "42";
(0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.SET_SEED)(SEED);
let tasks = (0,_code_Feature_js__WEBPACK_IMPORTED_MODULE_2__.create_tasks_grouped_by_error_position)();
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "TypeSystems-ConstructorCalls-Hierarchical",
        seed: SEED,
        introduction_pages: [
            () => writer.print_string_on_stage("Thank you for participating in the experiment. This experiment compares the possible effect of different\nnotations on readability in the context of programming language design.<br<br>" +
                "<p>Before doing the experiment, please start your browser in full-screen mode (probably by pressing <code>[F11]</code>).</p>" +
                "<p>In the experiment, a typing rule for the programming language construct called <code>feature</code> is given. The rule consists of three types: one function type and two types that refer to the left or right side of that " +
                "function type. The typing rules are either described using an inference notation or using Java.<br><br>" +
                "The next page introduces the inference language."),
            () => {
                writer.print_string_on_stage("There are simple rules that say that a given literal <code>myterm</code> has the type <code>BOOL</code>, that a term <code>otherterm</code> has the type <code>NUMBER</code>, or that <code>somethingelse</code> " +
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
                    "Let's see on the next page how such type systems can be represented using ordinary Java code."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("We assume in the given experiment, that (in a language implementation) each language construct is defined in it's own class (extending some root class LTerm) and that this class has a method <code>Type type_of(Environment e) {...}</code> " +
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
                    "Before starting the experiment, let's see some examples on the next pages."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("The experiment asks, in what position in a given expression (with given type rules) a type error appears - and possibly there is no type error. " +
                    "In the experiment, there are two different literals (that have the type <code>BOOL</code> or <code>NUMBER</code>) and one additional literal that has a function type (either <code>BOOL->NUMBER</code> or <code>NUMBER->BOOL</code>)." +
                    "One expression for the language construct <code>feature</code> (with three literals as parameters) is given. The task is to answer, at what parameter a type errors" +
                    "appears in the expression. Possible answers are: 0 (no error), 1 (error in the first parameter), 2, and 3. You give an answer by clicking [0], [1], [2], or [3]." +
                    "<br><br>" +
                    "Let's see the following code that could appear in the experiment." +
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
                    "Let's take a look at another example."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +
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
                    "Let's take a look at another example."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("<table style='border: 1px solid black;'><tr style='vertical-align:top'>" +
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
                    "Let's see the same examples now with type inference rules."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("$\\small{ \\mathrm{ exp_1:\\,BOOL}}$<br><br>" +
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
                    "Let's take a look at another example."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("$\\small{ \\mathrm{ exp_1:\\,BOOL}}$<br><br>" +
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
                    "Let's take a look at the final example."); // @ts-ignore
                MathJax.typeset();
            },
            () => {
                writer.print_string_on_stage("$\\small{ \\mathrm{ exp_1:\\,BOOL \\rightarrow NUMBER}}$<br><br>" +
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
                    ""); // @ts-ignore
                MathJax.typeset();
            },
        ],
        pre_run_training_instructions: writer.string_page_command("You entered the training phase. In the training phase, you get a random set of tasks, either as Java code or as inference rules.<br><br>" +
            "Please, run the training until you feel familiar with the experiment. This could be - for example - the case when you correctly answered the tasks 10 times.<br><br>" +
            "You can interrupt the training phase by pressing [ESC]. Otherwise, the training phase will be repeated.<br><br>" +
            "<b>Note that you can see that you are in the training phase (top, right of the screen says <code>Training</code>)</b><br><br>" +
            "Note that you give a response to a question by pressing [0], [1], [2], or [3]."),
        pre_run_experiment_instructions: writer.string_page_command(writer.convert_string_to_html_string("You entered the experiment phase.")),
        post_questionnaire: [
            (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.alternatives)("Age", "What's your age??", ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"]),
            (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.alternatives)("Status", "What is your current working status?", ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),
            (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.alternatives)("Studies", "In case you study, what's your subject?", ["I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)", "something else in natural sciences", "something else"]),
            (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.alternatives)("YearsOfExperience", "How many years of experience do you have in software industry?", ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"]),
            (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.alternatives)("impression", "What statement describes " +
                "                       best your impression \n\ of the experiment?", [
                "I do not think that there was a difference between the notations",
                "The inference notation made it slightly easier for me",
                "Java made it slightly easier for me",
                "The inference notation made it much easier for me",
                "Java made it much easier for me",
            ])
        ],
        finish_pages: [
            writer.string_page_command("<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
                "Please, send the " +
                "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
                "<p>By sending that mail, you agree that " +
                "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
                "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
                "<a href='https://github.com/shanenbe/Experiments/blob/main/2024_TypeSystems_ConstructorCall_Flat/Agreement.pdf' target='_blank'>here</a>. " +
                "Note, that it it no longer necessary to send a signed version of the agreement to the experimenter.<br><br>" +
                "After sending your email, you can close this window.</p>" +
                "<p>Many thanks for your participation.<br>" +
                "-Stefan Hanenberg</p>")
        ],
        layout: [
            { variable: "Notation", treatments: ["code", "inference"] },
            { variable: "Error_position", treatments: ["0", "1", "2", "3"] },
            { variable: "Terms_to_read", treatments: ["computed variable"] }
        ],
        repetitions: 4,
        measurement: (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.Reaction_Time)((0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.keys)(["0", "1", "2", "3"])),
        task_configuration: (t) => {
            let task = (0,_N_of_1_Experimentation_modules_Experimentation_Experimentation_js__WEBPACK_IMPORTED_MODULE_1__.random_array_element)(tasks["" + t.treatment_value("Error_position")]);
            t.set_computed_variable_value("Terms_to_read", ((task.error_position() == 0) ? "3" : ("" + task.error_position())));
            t.treatment_combination.treatment_combination[2];
            t.do_print_task = () => {
                writer.clear_stage();
                let html_string;
                if (t.treatment_value("Notation") != "inference") {
                    html_string = task.typing_rules_as_code_html_string();
                }
                else {
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
                writer.print_error_string_on_stage(writer.convert_string_to_html_string(error_msg + "\n\n" +
                    "In case, you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on. "));
                task.debug_help(t);
            };
        }
    };
};
(0,_N_of_1_Experimentation_modules_Experimentation_Browser_Output_Writer_js__WEBPACK_IMPORTED_MODULE_0__.BROWSER_EXPERIMENT)(experiment_configuration_function);

/******/ })()
;
//# sourceMappingURL=experiment.js.map