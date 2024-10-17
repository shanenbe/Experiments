import {Tree} from "../../../modules/graphs_n_trees/Tree.js";

export let ALL_GENERATED_TREES = {};
export let ALL_INTEGER_PARTITIONS_CACHE = {};

export function gen_trees(list_of_number_of_nodes) {

    function generate_trees(number_of_nodes) {

        function all_array_combinations_internal(arr: any[], combination, f) {
            if(arr.length==0) {
                f(combination);
            } else {
                let last:[] = arr.shift();
                for (let e of last) {
                    combination.push(e);
                    all_array_combinations_internal(arr, combination, f);
                    combination.pop();
                }
                arr.unshift(last);
            }
        }

        function all_array_combinations(arr: any[], f) {
            all_array_combinations_internal(arr, [], f);
        }

        function integer_partitions(n:number):number[][] {

            if(ALL_INTEGER_PARTITIONS_CACHE[n]!=undefined) {
                return ALL_INTEGER_PARTITIONS_CACHE[n];
            }

            let ret = [];
            if (n==0) return [];
            for(let i = 1; i <= n; i++) {
                let partitions = integer_partitions(n - i);
                for(let part of partitions) {
                    let row = [i];
                    for(let r of part) {
                        row.push(r);
                    }
                    ret.push(row);
                }
                if(partitions.length==0)
                    ret.push([n]);
            }
            return ret;
        }

        if(ALL_GENERATED_TREES[number_of_nodes]!=undefined) {
            return ALL_GENERATED_TREES[number_of_nodes];
        }

        if (number_of_nodes == 1) {
            return [new Tree(null, [])];
        }
        let ret = [];
        let partitions = integer_partitions(number_of_nodes - 1);
        // console.log("partitions: " + number_of_nodes + " = " + partitions.length);
        for (let p of partitions) {
            let this_partition = [];
            for (let child of p) {
                this_partition.push(generate_trees(child));
            }
            all_array_combinations(
                this_partition,
                e => {
                    let children = [];
                    e.forEach(t => children.push(t.clone()));
                    ret.push(new Tree(null, children));
                }
            );
        }
        ALL_GENERATED_TREES[number_of_nodes] = ret;
        return ret;
    }

    let trees = {};
    for(let c of list_of_number_of_nodes) {
        trees[c] = generate_trees(c);
    }
    return trees;
}
