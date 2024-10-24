import {generate_trees} from "../../../modules/graphs_n_trees/Tree.js";
import {generate_classes_from_tree} from "../code/generate_classes_from_tree.js";


let trees = generate_trees(12)
let classes = generate_classes_from_tree(trees[5], 15);

console.log("dummy");