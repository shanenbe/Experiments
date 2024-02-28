console.log("ok");
import {
    do_random_array_sort, random_array_element
} from "../modules/Experimentation/Experimentation.js";

import {Catalan_Node, create_catalan_graphs} from "../modules/CatalanGraphs.js";
import {
    BinaryOperatorTree,
    Division, Multiplication,
    Sum
} from "./BinaryOperatorTrees.js";

//
// export function create_random_term_list(number_of_nodes, number_of_divisions: number):any[] {
//     let operation_list = [];
//
//     for(let i = 1; i <= number_of_divisions; i++) {
//         operation_list.push(Division);
//     }
//
//     for(let i = 1; i <= number_of_nodes - number_of_divisions; i++) {
//         operation_list.push(random_array_element([Sum, /*Difference, */Multiplication]));
//     }
//     operation_list = do_random_array_sort(operation_list);
//     return operation_list;
// }
//
// export function create_operation_tree_on_graph(operator_list:any[], catalan_graph: Catalan_Node): BinaryOperatorTree {
//     let result_tree:BinaryOperatorTree =
//         push_operations_into_tree(
//             [...operator_list],
//             catalan_graph
//         );
//
//     return result_tree;
// }

export function create_repository_strings() {
    let NUMBER_OF_NODES = 7;
    let catalan_graphs: Catalan_Node[] = create_catalan_graphs(NUMBER_OF_NODES);

    let create_random_term_list = (number_of_nodes, number_of_divisions: number) => {
        let operation_list = [];

        for(let i = 1; i <= number_of_divisions; i++) {
            operation_list.push(Division);
        };


        for(let i = 1; i <= number_of_nodes - number_of_divisions; i++) {
            operation_list.push(random_array_element([Sum, /*Difference, */Multiplication]));
        }
        operation_list = do_random_array_sort(operation_list);
        return operation_list;
    };

    let create_operation_tree_on_graph = (operator_list:any[], catalan_graph: Catalan_Node) => {

        let push_operations_into_tree = (operations:any[], graph:Catalan_Node)=> {
            let this_operator = operations.shift();
            let node:BinaryOperatorTree = new this_operator(graph);
            graph.content = node;
            node.add_operations_to_tree(operations);
            return node;
        };

        let create_operator_tree_on_num_divisions = (number_of_divisions:number):BinaryOperatorTree => {
            while (true) {
                let random_tree = random_array_element(catalan_graphs);
                let random_term_list = create_random_term_list(NUMBER_OF_NODES, number_of_divisions);
                let operation_tree:BinaryOperatorTree = create_operation_tree_on_graph(random_term_list, random_tree);
                if(operation_tree.is_solvable())
                    return operation_tree;
            }
        }

        let print_create_graph_strings = () => {
            for(let c = 1; c<=2000; c++)
                for(let i = 2; i<=5; i++)
                    console.log(create_operator_tree_on_num_divisions(i).tree_string());
            console.log("done");
        }


        let result_tree:BinaryOperatorTree =
            push_operations_into_tree(
                [...operator_list],
                catalan_graph
            );

        return result_tree;
    }

}
//
// function push_operations_into_tree(operations:any[], graph:Catalan_Node):BinaryOperatorTree {
//     let this_operator = operations.shift();
//     let node:BinaryOperatorTree = new this_operator(graph);
//     graph.content = node;
//     node.add_operations_to_tree(operations);
//     return node;
// }


// function create_operator_tree_on_num_divisions(number_of_divisions:number):BinaryOperatorTree {
//     while (true) {
//         let random_tree = random_array_element(catalan_graphs);
//         let random_term_list = create_random_term_list(NUMBER_OF_NODES, number_of_divisions);
//         let operation_tree:BinaryOperatorTree = create_operation_tree_on_graph(random_term_list, random_tree);
//         if(operation_tree.is_solvable())
//             return operation_tree;
//     }
// }
// export function print_create_graph_strings() {
//     for(let c = 1; c<=2000; c++)
//         for(let i = 2; i<=5; i++)
//             console.log(create_operator_tree_on_num_divisions(i).tree_string());
//     console.log("done");
// }


/** In case you care for it: Here is the Prolog program that shows how similar stuff can be done in Prolog

 power(Basis, Exponent, Result) :-
 between(2, 10, Basis),
 Exponent is 2,
 Result is Basis ** Exponent,
 Result =< 100.

 power(Basis, Exponent, Result) :-
 between(2, 5, Basis),
 Exponent is 3,
 Result is Basis ** Exponent,
 Result =< 125.

 route(Radikant, Exponent, Result) :-
 power(Result, Exponent, Radikant).

 addition(N1, N2, Sum) :-
 between(1, 30, N1),
 between(1, 30, N2),
 Sum is N1 + N2.

 ?-addition(A,B,C), power(D, E, A), route(F, G, B), addition(H, I, G).
 */