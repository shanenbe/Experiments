import {gen_trees} from "./typescript/code/generate_trees.js";
import {generate_classes_from_tree} from "./typescript/code/generate_classes_from_tree.js";

import  {

} from "./nof1experimentation.ts" ;

let ALL_GENERATED_TREES = {};
let NUMBER_OF_USED_CLASSES = [1, 5, 10];

gen_trees(NUMBER_OF_USED_CLASSES);
let clazzes = generate_classes_from_tree(ALL_GENERATED_TREES[5][0], 10);
let out = [];
clazzes.class_definitions.forEach( e => e.print_into_array(out, clazzes, true));
