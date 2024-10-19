import {Tree} from "../../../modules/graphs_n_trees/Tree.js";
import {Constructor_Call} from "./Constructor_Call.js";

export function as_constructor_call(tree: Tree):Constructor_Call {
        let ret = new Constructor_Call(tree.content, []);

        tree.children.forEach(v => ret.parameters.push(as_constructor_call(v)));

        return ret;
}