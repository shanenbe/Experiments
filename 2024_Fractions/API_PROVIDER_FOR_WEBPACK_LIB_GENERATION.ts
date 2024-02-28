import {
    alternatives,
    Experiment_Output_Writer, free_text, new_random_integer, random_array_element, Reaction_Time,
    SET_SEED,
    text_input_experiment,
    Time_to_finish
} from "../modules/Experimentation/Experimentation.js";
import {BROWSER_EXPERIMENT} from "../modules/Experimentation/Browser_Output_Writer.js";
import {Nouns} from "../modules/Words/Nouns.js";
import {Verbs} from "../modules/Words/Verbs.js";
import {create_catalan_graphs} from "../modules/CatalanGraphs.js";
import {array_of_rows_to_logical_result, Logical_Results} from "../modules/LogicProgramming.js";
import {create_repository_strings} from "./GraphCreation.js";
import {graph_dictionary, graph_repository} from "./GraphsRepository.js";

function set_nof1(map) {
    map['BROWSER_EXPERIMENT'] = BROWSER_EXPERIMENT;
    map['Time_to_finish'] = Time_to_finish;
    map['Reaction_time'] = Reaction_Time;
    map['text_input_experiment'] = text_input_experiment;

    map['SET_SEED'] = SET_SEED;
    map['new_random_integer'] = new_random_integer;
    map['random_array_element'] = random_array_element;

    map['free_text'] = free_text;
    map['alternatives'] = alternatives;


    map['Nouns'] = Nouns;
    map['Verbs'] = Verbs;
    map['create_catalan_graphs'] = create_catalan_graphs;
    map['Logical_Results'] = Logical_Results;
    map['array_of_rows_to_logical_result'] = array_of_rows_to_logical_result;
    map['create_repository_strings'] = create_repository_strings;
    map['graph_dictionary'] = graph_dictionary;
    map['graph_repository'] = graph_repository;

} // @ts-ignore

set_nof1(Nof1);

