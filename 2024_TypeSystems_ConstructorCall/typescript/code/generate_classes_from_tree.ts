import {Class_Definition} from "./Class_Definition.js";
import {Classes} from "./Classes.js";
import {Tree} from "../../../N-of-1-Experimentation/modules/graphs_n_trees/Tree.js";
import {
    do_random_array_sort,
    random_array_element,
    random_integer_up_to_excluding
} from "../../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";
import {Nouns} from "../../../N-of-1-Experimentation/modules/Words/Nouns.js";

export function generate_classes_from_tree(tree:Tree, number_of_classes: number):Classes {

    let CLASS_NAMES = do_random_array_sort(["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]);
    let PARAMETER_NAMES = do_random_array_sort(new Nouns().words);
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

    function get_random_parameter_name():string {
        Math.random()* (PARAMETER_NAMES.length)
        return PARAMETER_NAMES.shift();
    }


    function get_random_function_name():string {return FUNCTION_NAMES.shift();}

    let classes = new Classes([]);

    tree.postorder( (t:Tree) => {
        if (t === tree) {
            t.content = "Target";
        } else {
            t.content = get_random_class_name();
        }

        let child_type_names = t.children.map(c => c.content);
        let child_param_names = t.children.map(c => get_random_parameter_name());

        // let method_name = ((t === tree)? get_random_function_name():null);

        let class_definition: Class_Definition = new Class_Definition(t.content, child_param_names, child_type_names, get_random_function_name());

        classes.class_definitions.push(class_definition);

    });

    for(let i=classes.number_of_classes(); i < number_of_classes; i++) {

        let random_param_number = random_integer_up_to_excluding(3);
        let child_param_names = [];
        let child_param_types = [];

        for(let c=0; c<random_param_number; c++) {
            child_param_names.push(get_random_parameter_name());
            child_param_types.push((random_array_element(classes.class_definitions) as Class_Definition).class_name);
        }

        let class_definition: Class_Definition = new Class_Definition(get_random_class_name(), child_param_names, child_param_types, get_random_function_name());
        classes.class_definitions.push(class_definition);
    }

    classes.sort_class_definitions();
    return classes;
}