import { do_random_array_sort, random_integer_up_to_excluding } from "./Nof1/modules/Experimentation/Experimentation.js";
import { Nouns } from "./Nof1/modules/Words/Nouns.js";
import { repeat_n_times } from "./Nof1/modules/utils/loops/loop.js";
import { random_integer_up_to } from "./Nof1/modules/Experimentation/Experimentation.js";
class Code {
}
export class If_Statement {
    constructor(previous_statement, condition_generator) {
        this.next = null;
        this.is_highlighted = false;
        this.previous_statement = previous_statement;
        this.condition_generator = condition_generator;
    }
    as_html_string_with_fix_indentation(lines_prefix, row_prefix, indentation_size, indent_guides) {
        let stream = [];
        repeat_n_times(lines_prefix)
            ._do(() => stream.push(""));
        this._write_to_html_string_with_fix_indentation(stream, row_prefix, 0, indentation_size, indent_guides);
        return stream.join("<br>");
    }
    as_html_string_with_dynamic_indentation(lines_prefix, row_prefix, indent_guides) {
        let stream = [];
        repeat_n_times(lines_prefix)
            ._do(() => stream.push(""));
        this._write_to_dynamic_indentation_html_string(stream, row_prefix, indent_guides);
        return stream.join("<br>");
    }
    _write_to_html_string_with_fix_indentation(stream, row_prefix, indentation_level, indentation_size, indent_guides) {
        let formatted_condition = this.is_highlighted
            ? "<span style='background-color: red'>" + this.condition + "</span>"
            : this.condition;
        let plus_span = indent_guides
            ? "<span style=\'border-left:3px solid lightgray; padding-left:0px; margin:0; display: inline-block;'>"
            : "<span style=\'border-left:none; padding-left:0px; margin:0; display: inline-block;'>";
        stream.push("&nbsp".repeat((indentation_size)) + plus_span + "if(" + formatted_condition + "){");
        if (this.next != null) {
            this.next._write_to_html_string_with_fix_indentation(stream, row_prefix, indentation_level + 1, indentation_size, indent_guides);
        }
        stream.push("}&nbsp" + this.closing_bracket_number + "</span>");
    }
    _write_to_dynamic_indentation_html_string(stream, row_prefix, indent_guides) {
        let formatted_condition = this.is_highlighted
            ? "<span style='background-color: red'>" + this.condition + "</span>"
            : this.condition;
        let plus_span = indent_guides
            ? "<span style=\'border-left:3px solid lightgray; padding-left:0px; margin:0; display: inline-block;'>"
            : "<span style=\'border-left:none; padding-left:0px; margin:0; display: inline-block;'>";
        stream.push("&nbsp".repeat(row_prefix) + plus_span + "if(" + formatted_condition + "){");
        if (this.next != null) {
            this.next._write_to_dynamic_indentation_html_string(stream, this.condition.length + 5, indent_guides);
        }
        stream.push("}&nbsp" + this.closing_bracket_number + "</span>");
    }
    highlighted_if() {
        if (this.is_highlighted)
            return this;
        else
            return this.next.highlighted_if();
    }
    create_identifier_of_length(length, exceptions) {
        let random_condition = this.condition_generator(length);
        while (exceptions.includes(random_condition)) {
            random_condition = this.condition_generator(length);
        }
        this.condition = random_condition;
        return this.condition;
    }
}
export function condition_generator() {
    let nouns = new Nouns();
    return (n) => nouns.generate_random_word_of_length(n);
}
export function generate_If_Statement(number_of_statement, highlighted_if_Position, word_generator) {
    let words = [];
    let nouns = new Nouns();
    let if_root = new If_Statement(null, word_generator);
    let this_if_statement = if_root;
    let responses = [];
    for (let r = 1; r <= number_of_statement; r++) {
        responses.push(r);
    }
    let node_results = do_random_array_sort(responses);
    repeat_n_times(number_of_statement).times((n) => {
        let this_word_length = 3 + random_integer_up_to_excluding(13);
        words.push(this_if_statement.create_identifier_of_length(this_word_length, words));
        this_if_statement.closing_bracket_number = node_results.shift();
        if (n == highlighted_if_Position) {
            this_if_statement.is_highlighted = true;
            if_root.result = this_if_statement.closing_bracket_number;
        }
        if (n < number_of_statement) {
            this_if_statement.next = new If_Statement(this_if_statement, word_generator);
            this_if_statement = this_if_statement.next;
        }
    });
    return if_root;
}
export function configure_task(writer) {
    return (t) => {
        let number_of_if_statements = 5;
        let indentation_size = t.treatment_value("Indentation_Size");
        let if_position = Number(t.treatment_value("If_Position"));
        let indent_guides = t.treatment_value("Indent_Guides") == "with";
        let random_number_prefix_of_empty_lines = random_integer_up_to(10);
        let random_prefix_whitespaces = random_integer_up_to(40);
        let words = new Nouns();
        let word_generator = (length) => words.generate_random_word_of_length(length);
        let ifs = generate_If_Statement(number_of_if_statements, if_position, word_generator);
        let if_statement_string = indentation_size == "dynamic"
            ? ifs.as_html_string_with_dynamic_indentation(random_number_prefix_of_empty_lines, random_prefix_whitespaces, indent_guides)
            : ifs.as_html_string_with_fix_indentation(random_number_prefix_of_empty_lines, random_prefix_whitespaces, Number(indentation_size), indent_guides);
        t.expected_answer = String(if_position);
        t.do_print_task = () => {
            writer.clear_stage();
            if (t.is_training) {
                writer.print_html_on_stage("<p><div style='padding-bottom: 50px; background-color: red'>Note, you can always exit training by pressing [Esc]</div></p>");
            }
            let to_show = "<div class='sourcecode'>" + if_statement_string + "</div>";
            writer.print_html_on_stage("<p>" + to_show + "</p>");
        };
        t.do_print_after_task_information = () => {
            writer.print_html_on_stage("<p>The correct answer was: " + ifs.result + "<br>Your answer was: " + t.given_answer + "</p>");
            writer.print_html_on_stage("<p>If you need to make a short break, you can do it right now. Otherwise, you go to the next task by pressing [Enter].");
        };
    };
}
//# sourceMappingURL=Experiment_Code.js.map