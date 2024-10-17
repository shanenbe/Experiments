import {Tree} from "./Tree.js";
import {Class_Definition} from "./Class_Definition.js";
import {Classes} from "./Classes.js";

export function generate_classes_from_tree(tree:Tree, number_of_classes: number) {

    function new_random_integer(upper_limit: number): number {
        // @ts-ignore
        return Math.trunc(upper_limit * Math.random());
    }

    function do_random_array_sort(array:any[]) {
        let copy = [...array];
        let result = [];
        while(copy.length > 0) {
            result.push(copy.splice(new_random_integer(copy.length), 1)[0]);
        }
        return result;
    }

    let CLASS_NAMES = do_random_array_sort(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
    let FUNCTION_NAMES = do_random_array_sort( [
        'addEvents',
        'acceptDefaults',
        'analyzeResults',
        'askInput',
        'bindResources',
        'cancelInitialization',
        'calculateSum',
        'clearCache',
        'cloneNumbers',
        'computeResult',
        'connectDatabase',
        'createTasks',
        'doComputation',
        'dropFiles',
        'executeTask',
        'dumpDatabase',
        'enterData',
        'eraseTmp',
        'fetchData',
        'finishSetup',
        'filterEvents',
        'forwardProfile',
        'formatOutput',
        'generateNumber',
        'getUserInfo',
        'handleError','' +
        'initializeData',
        'invalidateConnections',
        'logErrors',
        'mergeRequests',
        'monitorSystem',
        'manipulateQueue',
        'parseData',
        'printLogs',
        'processData',
        'queueResults',
        'runComputation',
        'rerunSetup',
        'setupConnections',
        'scaleBandwith',
        'streamEvents',
        'validateInput',
        'writeOutput',
        'trackUserActivity',
        'zipHistory',
    ]);

    function get_random_class_name():string {
        Math.random()* (CLASS_NAMES.length)
        return CLASS_NAMES.shift();
    }
    function get_random_function_name():string {return FUNCTION_NAMES.shift();}

    let classes = new Classes([]);

    tree.postorder( (t:Tree) => {
        if( t === tree) {
            t.content = "Target";
        } else {
            t.content = get_random_class_name();
        }

        let child_names = t.children.map(c => c.content);

        // let method_name = ((t === tree)? get_random_function_name():null);

        let class_definition: Class_Definition = new Class_Definition(t.content, child_names, get_random_function_name());

        classes.class_definitions.push(class_definition);

    });

    for(let i=classes.number_of_classes(); i < number_of_classes; i++) {
        let class_definition: Class_Definition = new Class_Definition(get_random_class_name(), [], get_random_function_name());
        classes.class_definitions.push(class_definition);
    }

    return classes;
}