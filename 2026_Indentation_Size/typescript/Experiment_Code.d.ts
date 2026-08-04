import { Experiment_Output_Writer } from "./Nof1/modules/Experimentation/Experimentation.js";
import { Task } from "./Nof1/modules/Experimentation/Task.js";
export declare class If_Statement {
    condition: string;
    closing_bracket_number: number;
    previous_statement: If_Statement;
    next: If_Statement | null;
    is_highlighted: boolean;
    result: number;
    condition_generator: (n: number) => string;
    constructor(previous_statement: If_Statement, condition_generator: (n: number) => string);
    as_html_string_with_fix_indentation(lines_prefix: number, row_prefix: number, indentation_size: number, indent_guides: boolean): string;
    as_html_string_with_dynamic_indentation(lines_prefix: number, row_prefix: number, indent_guides: boolean): string;
    _write_to_html_string_with_fix_indentation(stream: any, row_prefix: any, indentation_level: any, indentation_size: any, indent_guides: boolean): void;
    _write_to_dynamic_indentation_html_string(stream: any, row_prefix: any, indent_guides: boolean): void;
    highlighted_if(): If_Statement;
    create_identifier_of_length(length: number, exceptions: string[]): string;
}
export declare function condition_generator(): (n: number) => string;
export declare function generate_If_Statement(number_of_statement: number, highlighted_if_Position: number, word_generator: (number: any) => string): If_Statement;
export declare function configure_task(writer: Experiment_Output_Writer): (t: Task) => void;
