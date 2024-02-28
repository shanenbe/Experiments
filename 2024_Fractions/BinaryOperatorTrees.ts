import {Catalan_Node, create_catalan_graphs} from "../modules/CatalanGraphs.js";
import {array_of_values_to_logical_result, Logical_Results} from "../modules/LogicProgramming.js";

export class SolutionOnBinaryOperatorTree {
    result:number=null;
    math_node: BinaryOperatorTree = null;

    constructor(math_node: BinaryOperatorTree, result: number) {
        this.math_node = math_node;
        this.result = result;
    }

    children:SolutionOnBinaryOperatorTree[] = [];

    generate_source_code_string() {
        let result = [];
        this.source_code_string(result);
        return result.join("");
    }

    generate_mathjax_code_string() {
        let result = [];
        this.mathjax_code_string(result);
        return result.join("");
    }

    source_code_string_with_brackets(arr:string[]) {
        arr.push("(");
        this.source_code_string(arr);
        arr.push(")");
    }

    source_code_string(arr:string[]) {
        if(this.math_node==null)
            arr.push(" " + this.result + " ");
        else {
            this.math_node.source_code_representation(this, arr);
        }
    }

    mathjax_code_string(arr:string[]) {
        if(this.math_node==null)
            arr.push(" " + this.result + " ");
        else {
            this.math_node.mathjax_string_representation(this, arr);
        }
    }

    mathjax_string_with_brackets(arr:string[]) {
        arr.push("\\left(");
        this.mathjax_code_string(arr);
        arr.push("\\right)");
    }

    is_of_one_kind(kinds:string[]) {
        for(let kind of kinds) {
            if(this.is_kind(kind))
                return true;
        }
        return false;
    }

    is_kind(kind:string):boolean {
        if(kind=="Literal")
            return this.math_node==null;
        else {
            if(this.math_node != null)
                return this.math_node.is_of_type(kind);
            else
                false;

        }
    }

}


export abstract class BinaryOperatorTree {
    catalan_node: Catalan_Node;

    is_quasi_literal(): boolean {
        return this.left_math_term()==null && this.right_math_term() == null;
    }

    is_commutative() {
        return this.is_of_type("Sum") || this.is_of_type("Multiplication");
    }

    number_of_direction_changes() {
        return this.number_of_direction_changes_with_param(true);
    }

    is_division() {
        return false;
    }
    number_of_divisions():number {
        let divisons = 0;
        if (this.is_of_type("Division"))
            divisons++;

        if(this.left_math_term()!=null)
            divisons += this.left_math_term().number_of_divisions();

        if(this.right_math_term()!=null)
            divisons += this.right_math_term().number_of_divisions();

        return divisons;
    }

    number_of_direction_changes_with_param(comes_from_left:boolean) {
        if (this.is_quasi_literal()) {
            return 0;
        } else {
            let left = this.left_math_term();
            let right = this.right_math_term();

            let left_changes = 0;
            let right_changes = 0;

            if(left!=null) {
                left_changes = left.number_of_direction_changes_with_param(true);
                if(!comes_from_left && !this.is_commutative())
                    left_changes++;
            }

            if(right!=null) {
                right_changes += right.number_of_direction_changes_with_param(false);
                if(comes_from_left && !this.is_commutative())
                    right_changes++;
            }

            return left_changes + right_changes;
        }

    }

    tree_string() {
        let arr=[];
        this.tree_string_to_array(arr);
        return arr.join("");
    }
    tree_string_to_array(arr:string[]) {
        let constr_name = "";
        if (this.is_of_type("Multiplication"))
            constr_name = "RMult";
        if (this.is_of_type("Division"))
            constr_name = "RDiv";
        if (this.is_of_type("Difference"))
            constr_name = "RDif";
        if (this.is_of_type("Sum"))
            constr_name = "RSum";

        arr.push(constr_name + "(");

        if(this.left_math_term()!=null)
            this.left_math_term().tree_string_to_array(arr);
        else
            arr.push("L");

        arr.push(",")
        if(this.right_math_term()!=null)
            this.right_math_term().tree_string_to_array(arr);
        else
            arr.push("L");

        arr.push(")");
    }

    constructor(catalan_node: Catalan_Node) {
        this.catalan_node = catalan_node;
    }

    left_math_term(): BinaryOperatorTree {
        if((this.catalan_node).left===null)
            return null;
        return ((this.catalan_node).left).content as BinaryOperatorTree;
    }

    right_math_term(): BinaryOperatorTree {
        if((this.catalan_node).right===null)
            return null;
        return ((this.catalan_node).right).content as BinaryOperatorTree;
    }

    abstract results(bindings_basis_exponent_result: Logical_Results);

    solve_child(child: BinaryOperatorTree):Logical_Results {
        if(child === null) {
            return new Logical_Results(3);
        } else {
            let ret = new Logical_Results(3);
            child.results(ret);
            return ret;
        }
    }

    is_solvable():boolean {
        let r = new Logical_Results(3);
        this.results(r);
        return r.rows.length > 0;
    }

    add_operations_to_tree(operations: any[]):void {

        for(let child of [this.catalan_node.left, this.catalan_node.right]) {
            if (child != null) {
                let this_operator = operations.shift();
                let node: BinaryOperatorTree = new this_operator(child);
                child.content = node;
                node.add_operations_to_tree(operations)
            }
        }
    }

    create_random_solution_tree(): SolutionOnBinaryOperatorTree {
        if(!this.is_solvable())
            return null;

        let result = new Logical_Results(3);
        this.results(result);

        let new_result = result.random_result_for_column(2);

        return this.create_random_solution_tree_with_results(new_result);
    }

    create_random_solution_tree_with_results(result:Logical_Results): SolutionOnBinaryOperatorTree {
        if(result.rows.length==0) {
            throw "You want a random solution - but the given results do not have any solution at all!";
        }

        let left_solution = this.solve_child(this.left_math_term());
        let right_solution = this.solve_child(this.right_math_term());

        result.unify_results(left_solution, [0], [2]);
        result.unify_results(right_solution, [1], [2]);

        let left_child = this.create_random_child_solution_node(this.left_math_term(), left_solution);
        let right_child = this.create_random_child_solution_node(this.right_math_term(), right_solution);

        let ret = new SolutionOnBinaryOperatorTree(this, result.rows[0].values[2]);
        ret.children = [left_child, right_child];

        return ret;
    }

    create_random_child_solution_node(child: BinaryOperatorTree, child_result: Logical_Results): SolutionOnBinaryOperatorTree {
        let random_result: Logical_Results = child_result.random_result_for_column(2);
        let  solution_node = null;

        if(child!=null) {
            solution_node = child.create_random_solution_tree_with_results(random_result);
        } else {
            solution_node = new SolutionOnBinaryOperatorTree(null, random_result.rows[0].values[2]);
        }
        return solution_node;
    }

    is_valid():boolean {
        let left_correct = true;

        if( this.left_math_term() != null) {
            left_correct = this.left_math_term().is_valid();
        }

        let right_correct = true;

        if( this.right_math_term() != null)
            right_correct = this.right_math_term().is_valid();

        return left_correct && right_correct;
    }

    abstract source_code_representation(this_result: SolutionOnBinaryOperatorTree, result:string[]):void;
    abstract mathjax_string_representation(this_result: SolutionOnBinaryOperatorTree, result:string[]):void;

    source_code_child_with_no_brackets_on_kind(child: SolutionOnBinaryOperatorTree, result:string[], kinds: string[]) {
        if(child.is_of_one_kind(kinds)) {
            child.source_code_string(result);
        } else {
            child.source_code_string_with_brackets(result);
        }
    }

    is_of_one_kind(kinds:string[]) {
        for(let kind of kinds) {
            if(this.is_kind(kind))
                return true;
        }
        return false;
    }

    is_kind(kind:string):boolean {
        return this.constructor.name==kind;
    }

    mathjax_child_with_no_brackets_on_kind(child: SolutionOnBinaryOperatorTree, result:string[], kinds:string[]) {
        if(child.is_of_one_kind(kinds))
            child.mathjax_code_string(result);
        else
            child.mathjax_string_with_brackets(result);
    }

    abstract source_code_readability_value(depth: number):number;
    abstract math_readability_value(depth: number):number;

    abstract is_of_type(name: string);
}

export class Sum extends BinaryOperatorTree {

    static CONSTRAINTS:any[] = (() => {
        let results = [];
        for (let left_counter = 2; left_counter <= 20; left_counter++) {
            for (let right_counter = 2; left_counter + right_counter <= 32; right_counter++) {
                results.push([left_counter, right_counter, left_counter + right_counter]);
            }
        }
        return results;
    })();

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Sum.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [0], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [0,1,2]);
    }

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal", "Sum", "Difference"]);
        result.push(" + ");
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal", "Sum", "Difference"]);
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal", "Difference", "Sum", "Division"]);
        result.push(" + ");
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal", "Difference", "Sum", "Division"]);
    }

    source_code_readability_value(depth:number) {
        let left_value = 0;
        let right_value = 0;

        if(this.left_math_term()!=null)
            left_value = this.left_math_term().source_code_readability_value(depth+1);

        if(this.right_math_term()!=null)
            right_value = this.right_math_term().source_code_readability_value(depth+1);

        return 1 + left_value + right_value;
    }

    math_readability_value(depth: number) {
        let left_value = 0;
        let right_value = 0;

        if(this.left_math_term()!=null)
            left_value = this.left_math_term().math_readability_value(depth+1);

        if(this.right_math_term()!=null)
            right_value = this.right_math_term().math_readability_value(depth+1);

        return 1 + left_value + right_value;
    }

    is_of_type(name: string) {
        return name == "Sum";
    }


}

export class Multiplication extends BinaryOperatorTree {

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal", "Multiplication"]);
        result.push(" * ");
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal", "Multiplication"]);
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal", "Multiplication", "Division"]);
        result.push(" \\cdot ");
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal", "Multiplication", "Division"]);
    }

    static CONSTRAINTS:any[] = (() => {
        let results = [];
        for (let left_counter = 2; left_counter <= 8; left_counter = left_counter + 2) {
            for (let right_counter = 2; right_counter <= 8; right_counter = right_counter + 2) {
                if(left_counter * right_counter <= 42) {
                    results.push([left_counter, right_counter, left_counter * right_counter]);
                }
            }
        }
        return results;
    })();

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [0], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [0,1,2]);
    }

    source_code_readability_value(depth:number) {
        let left_value = 0;
        let right_value = 0;

        if (this.left_math_term() != null) {
            if (this.left_math_term().is_of_type("Sum")) {
                left_value = 2 + this.left_math_term().source_code_readability_value(depth+1);
            } else {
                left_value = this.left_math_term().source_code_readability_value(depth+1);
            }
        }

        if (this.right_math_term() != null) {
            if (this.right_math_term().is_of_type("Sum") || this.right_math_term().is_of_type("Division")) {
                right_value = 2 + this.right_math_term().source_code_readability_value(depth+1);
            } else {
                right_value = this.right_math_term().source_code_readability_value(depth+1);
            }
        }

        return 1 + left_value + right_value;
    }

    math_readability_value(depth:number) {
        let left_value = 0;
        let right_value = 0;

        if(this.left_math_term()!=null)
            left_value = this.left_math_term().math_readability_value(depth+1);

        if(this.right_math_term()!=null)
            right_value = this.right_math_term().math_readability_value(depth+1);

        return 1 + left_value + right_value;
    }

    is_of_type(name: string) {
        return name == "Multiplication";
    }

}

export class Division extends Multiplication {

    source_code_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal"]);
        result.push(" / ");
        this.source_code_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal"]);
    }

    mathjax_string_representation(solution_node: SolutionOnBinaryOperatorTree, result:string[]):void {
        result.push("\\frac{");
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[0], result, ["Literal", "Multiplication", "Sum", "Difference"]);
        result.push("}{");
        this.mathjax_child_with_no_brackets_on_kind(solution_node.children[1], result, ["Literal", "Multiplication", "Sum", "Difference"]);
        result.push("}");
    }

    results(results: Logical_Results) {
        let all_results = Logical_Results.Logical_Results_FROM_SOLUTION_ARRAY(3, Multiplication.CONSTRAINTS);

        let left_results = this.solve_child(this.left_math_term());
        let right_results = this.solve_child(this.right_math_term());

        all_results.unify_results(left_results, [2], [2]);
        all_results.unify_results(right_results, [1], [2]);
        results.unify_results(all_results, [0,1,2], [2,1,0]);
    }

    source_code_readability_value(depth: number) {
        let left_value = 0;
        let right_value = 0;

        if (this.left_math_term() != null) {
            if (this.left_math_term().is_of_type("Sum")) {
                left_value = 2 + this.left_math_term().source_code_readability_value(depth+1);
            } else {
                left_value = this.left_math_term().source_code_readability_value(depth+1);
            }
        }

        if (this.right_math_term() != null) {
            if (this.right_math_term().is_of_type("Sum") || this.right_math_term().is_of_type("Division")) {
                right_value = 2 + this.right_math_term().source_code_readability_value(depth+1);
            } else {
                right_value = this.right_math_term().source_code_readability_value(depth+1);
            }
        }

        return 1 + left_value + right_value;
    }

    math_readability_value(depth:number) {
        let left_value = 0;
        let right_value = 0;

        if(this.left_math_term()!=null)
            left_value = this.left_math_term().math_readability_value(depth+1);

        if(this.right_math_term()!=null)
            right_value = this.right_math_term().math_readability_value(depth+1);

        return 1 + left_value + right_value;
    }

    is_division() {
        return true;
    }

    is_of_type(name: string) {
        return name == "Division";
    }
}
