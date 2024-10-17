/* *****************************
            TESTING
   ******************************/

import {call_string, Class_Definition, Classes, ConstructorCall, Tree} from "./experiment_code.js";




function test_tree_readability(debug:boolean = false) {

    function is_true(exp, aString = "") {
        if (!exp) {
            console.error("ERROR: " + aString);
            throw "Wrong: " + aString;
        }
        if (debug) {
            console.log("Ok: " + aString);
        }
    }

    function t(content, children=[]) {
        return new Tree(content, children);
    }

    function test_tree(tree:()=>Tree, nodes, depth, readability) {
        let t = tree();
        let s = t.tree_string();
        let n = t.number_of_nodes();
        let d = t.depth();
        let v = t.readability();

        is_true(n==nodes);
        is_true(d==depth);
        is_true(v==readability);
    }

    test_tree(
        ()=> t("L",[t("M",[])]),
        2, 1, 3);

    test_tree(
        ()=> t("L",[t("M"), t("N")]),
        3, 1, 4);

    test_tree(
        ()=> t("L",[t("M", [t("N")])]),
        3, 2, 6);

    test_tree(
        ()=> t("L",[t("M"), t("N"), t("O")]),
        4, 1, 5);

    test_tree(
        ()=> t("L",[t("M"), t("N", [t("O")])]),
        4, 2, 7);

    test_tree(
        ()=> t("L",[t("M", [t("N")]), t("O")]),
        4, 2, 7);

    test_tree(
        ()=> t("L",[t("M", [t("N"), t("O")])]),
        4, 2, 7);

    test_tree(
        ()=> t("L",[t("M", [t("N", [t("O")])])]),
        4, 3, 10);

    test_tree(
        ()=> t("L",[t("M"), t("N"), t("O"), t("P")]),
        5, 1, 6);

    test_tree(
        ()=> t("L",[t("M"), t("N"), t("O", [t("P")])]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M"), t("N", [t("P")]), t("O")]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M", [t("P")]), t("N"), t("O")]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M"), t("N", [t("O"), t("P")])]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M"), t("N", [t("O"), t("P")])]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M", [t("N"), t("O")]), t("P")]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M", [t("O"), t("P")]), t("N")]),
        5, 2, 8);

    test_tree(
        ()=> t("L",[t("M", [t("O"), t("P", [t("N")])])]),
        5, 3, 11);

    test_tree(
        ()=> t("L",[t("M", [t("O"), t("P", [t("N")])])]),
        5, 3, 11);

    test_tree(
        ()=> t("L",[t("M", [t("O", [t("N")]), t("P")])]),
        5, 3, 11);

    test_tree(
        ()=> t("L",[t("M", [t("O", [t("N", [t("P")])])])]),
        5, 4, 15);

    // let reads = gen_trees_nodes_readabilities([6, 9]);

    console.log("dummy");

    // CHOSE: numNodes: 6, 9 => readability: 12, 16
}

test_classes(true);
test_parser(true);
// test_tree_readability(true);
