Nof1.SET_SEED("2");


// import fs from 'fs';
// import seedrandom from 'seedrandom';
// import readline from 'readline';

// const fs = require('fs');
// const seedrandom = require('seedrandom');
// const readline = require('readline');


// Math.seedrandom = seedrandom;
// Math.seedrandom('20');  // Use the same seed for every run

// Global array to store the generated if-else structures
let generated_if_else_structures = [];
let structureIndex = 0; // Index to track the next structure to use
let test_arr = [];
let arr_of_random_names = [];
let arr_of_returned_values = [];
let methodCounter = 0;  // Global method counter to ensure unique method names
let correctAnswer = 0;


function create_true_false_combinations(length, arr, store) {
    if (length === 0) store.push([...arr]);
    else {
        let new_array = [...arr];
        new_array.push(false);
        create_true_false_combinations(length - 1, new_array, store);

        new_array = [...arr];
        new_array.push(true);
        create_true_false_combinations(length - 1, new_array, store);
    }
}

class TreeNode {
    indentation(level) {
        return " ".repeat(level * 4);
    }
}

class Tree extends TreeNode {
    condition = null;
    then = null;
    else = null;

    number_of_nodes() {
        let ret = 1;
        if (this.then !== null) ret += this.then.number_of_nodes();
        if (this.else !== null) ret += this.else.number_of_nodes();
        return ret;
    }

    number_of_ifs() {
        let ret = 1;
        if (this.then !== null) ret += this.then.number_of_ifs();
        if (this.else !== null) ret += this.else.number_of_ifs();
        return ret;
    }

    print_into_stream(arr, level) {
        arr.push(this.indentation(level) + "if(" + this.condition + ") {\n");

        if (this.then !== null) {
            this.then.print_into_stream(arr, level + 1);
        }

        arr.push(this.indentation(level) + "} else {\n");

        if (this.else !== null) {
            this.else.print_into_stream(arr, level + 1);
        }

        arr.push(this.indentation(level) + "}\n");
    }

    init_from_true_false_combination(combination_array) {
        this.condition = combination_array.shift();

        if (this.then !== null) this.then.init_from_true_false_combination(combination_array);
        if (this.else !== null) this.else.init_from_true_false_combination(combination_array);
    }

    clone() {
        let ret = new Tree();
        ret.condition = this.condition;

        if (this.then !== null) ret.then = this.then.clone();
        if (this.else !== null) ret.else = this.else.clone();

        return ret;
    }
}

// Helper functions
function randomBoolean() {
    return Math.random() < 0.5;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomName() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let name = '';
    for (let i = 0; i < 2; i++) {
        name += letters.charAt(Nof1.new_random_integer(letters.length));
    }
    return name;
}

function indentation(level) {
    return " ".repeat(level * 4);
}

function generate_if_else_structure(arr, level, answer_arr) {
    const condition1 = randomBoolean();
    const condition2 = randomBoolean();
    const returnValue1 = randomInteger(1, 10);
    const returnValue2 = randomInteger(1, 10);
    const returnValue3 = randomInteger(1, 10);

    arr.push(indentation(level) + `if (${condition1}) {\n`);
    arr.push(indentation(level + 1) + `if (${condition2}) {\n`);
    arr.push(indentation(level + 2) + `return ${returnValue1};\n`);
    arr.push(indentation(level + 1) + `} else {\n`);
    arr.push(indentation(level + 2) + `return ${returnValue2};\n`);
    arr.push(indentation(level + 1) + `}\n`);
    arr.push(indentation(level) + `} else {\n`);
    arr.push(indentation(level + 1) + `return ${returnValue3};\n`);
    arr.push(indentation(level) + `}\n`);

    // Determine the actual returned value
    let finalMethodReturnValue;
    if (condition1) {
        if (condition2) {
            finalMethodReturnValue = returnValue1;
        } else {
            finalMethodReturnValue = returnValue2;
        }
    } else {
        finalMethodReturnValue = returnValue3;
    }

    test_arr.push(finalMethodReturnValue); // Collecting the return value
    //arr.push(`// This method returns ${finalMethodReturnValue}.\n`); // Add comment about the return value


    // Save the structure to the global array
    generated_if_else_structures.push({
        structure: arr.join(""), // Store the entire generated structure as a string
        returnValue: finalMethodReturnValue // Store the computed return value
    });



    return finalMethodReturnValue; // Return the final return value
}



class Return extends TreeNode {
    constructor(useRandomName = true) {
        super();
        this.useRandomName = useRandomName;
        this.name = this.useRandomName ? randomName() : null;
        this.body = null;
    }

    number_of_nodes() {
        return 1;
    }

    number_of_ifs() {
        return 0;
    }

    print_into_stream(arr, level) {
        let test_name = this.name;
        arr_of_random_names.push(test_name);
        arr.push(this.indentation(level) + "return " + test_name + "();" + "\n");
    }

    init_from_true_false_combination(arr) {
        // No action needed
    }

    clone() {
        let ret = new Return(this.useRandomName);
        ret.name = this.name;

        if (this.body !== null) ret.body = this.body.clone();

        return ret;
    }

    set_name_from_return_value(value) {
        if (!this.useRandomName) {
            methodCounter++; // Increment the global method counter
            this.name = `method${methodCounter}_returns_${value}`; // Name based on the return value
        }
    }
}

function create_balanced_tree(depth) {
    let tree = new Tree();

    if (depth > 1) {
        tree.then = create_balanced_tree(depth - 1);
        tree.else = create_balanced_tree(depth - 1);
    }

    return tree;
}

function replace_inner_nodes_at_depth(tree, depth, useRandomName) {
    if (depth === 0) {
        tree.then = new Return(useRandomName);
        tree.then.body = create_balanced_tree(2);
        tree.else = new Return(useRandomName);
        tree.else.body = create_balanced_tree(2);

        if (!useRandomName) {
            let arr = [];
            let returnValue1 = generate_if_else_structure(arr, 1, test_arr);
            tree.then.set_name_from_return_value(returnValue1); // Correctly set the name based on return value

            arr = [];
            let returnValue2 = generate_if_else_structure(arr, 1, test_arr);
            tree.else.set_name_from_return_value(returnValue2); // Correctly set the name based on return value
        }
    } else {
        replace_inner_nodes_at_depth(tree.then, depth - 1, useRandomName);
        replace_inner_nodes_at_depth(tree.else, depth - 1, useRandomName);
    }
}

function create_true_false_ifs(tree) {
    let all_true_false_combinations = [];
    create_true_false_combinations(tree.number_of_ifs(), [], all_true_false_combinations);

    let all_true_false_trees = [];

    for (let comb of all_true_false_combinations) {
        let new_tree = tree.clone();
        new_tree.init_from_true_false_combination(comb);
        all_true_false_trees.push(new_tree);
    }

    return all_true_false_trees;
}

function create_true_false_if_trees(height, useRandomName) {
    let proto_tree = create_balanced_tree(height);
    replace_inner_nodes_at_depth(proto_tree, height - 1, useRandomName);
    return create_true_false_ifs(proto_tree);
}

// Method to compute the return value by traversing the tree and count nodes traversed, Also computes final return value of the entire code (TO BE CHECKED, TO BE CHECKED)
function computeReturnValue(tree) {
    const count_return = 0
    let totalCount = 0 + count_return; // Single value to keep count of traversed nodes

    // Recursively traverse the tree to compute the return value
    function traverse(node) {
        totalCount++; // Increment the counter for each node traversed
        if (node instanceof Return) {
            // If it's a Return node, return the method name
            totalCount++;
            return node.name + "()"; // Return the method call as a string
        } else if (node instanceof Tree){
            // Check the condition at the current node
            const conditionValue = node.condition;

            if (conditionValue) {
                // If condition is true, traverse the 'then' branch
                return traverse(node.then);
            } else {
                // If condition is false, traverse the 'else' branch
                return traverse(node.else);
            }
        }  else {
            throw new Error("Unexpected node type encountered.");
        }
    }

    // Start traversing from the root of the tree
    const finalMethodCall = traverse(tree);
    totalCount--;

    console.log(`Total nodes traversed: ${totalCount}`);

    // Check if the generated method names match the final method call
    const cleanFinalMethodCall = finalMethodCall.replace(/\(|\)/g, '');

    // Find the corresponding generated structure and count traversed nodes

    let finalReturnValue;
    generated_if_else_structures.forEach((entry, index) => {
        let methodName = arr_of_random_names[index];

        if (methodName == cleanFinalMethodCall) {
            console.log(`Evaluating method ${methodName}()`);
            finalReturnValue = entry.returnValue;
            correctAnswer = finalReturnValue;
            console.log("This code returns: " , entry.returnValue);
        }
    });

    return{
        returnValue: finalMethodCall,
        totalCount: totalCount,
        correctAnswer: finalReturnValue
    }

    // returnValue; // Return the final return value
}

//Count the nodes traversed in the method calls
function traverseAndCountNodes(ifElseStructure, totalCount) {
    const lines = ifElseStructure.split("\n");
    const count_return = 1
    let nodeCount = 0 + count_return;
    let skipStack = []; // Track if we should skip the current block of code

    for (let line of lines) {
        line = line.trim();

        // Process "if" statements
        if (line.startsWith("if (")) {
            const condition = line.match(/if\s*\((.*)\)/)[1];
            const conditionValue = eval(condition); // Evaluate the condition

            nodeCount++; // Increment node count for the "if" condition
            skipStack.push(!conditionValue); // Push whether to skip the next branch based on the condition
        }
        // Process "else" statements
        else if (line.startsWith("else")) {
            if (skipStack.length > 0) {
                skipStack[skipStack.length - 1] = !skipStack[skipStack.length - 1]; // Flip the skip flag for the current block
            }
        }
        // Process "return" statements
        else if (line.startsWith("return")) {
            // If the current block is not skipped, increment node count and return
            if (!skipStack[skipStack.length - 1]) {
                nodeCount++;
                break;
            }
        }

        // Handle closing braces
        if (line === "}") {
            skipStack.pop(); // Exit the current block
        }
    }

    // console.log(`Nodes traversed before returning: ${nodeCount}`);
    //console.log("===============================")
    return nodeCount;
}

console.log("===================================- Code -=======================================================")

// Value of true/false combinations

function generate_methods_for_names(namesArray, useRandomName) {
    let methods = [];

    namesArray.forEach((name) => {
        let arr = [];
        arr.push(name + "() {\n");

        if (!useRandomName) {
            // Ensure we call the next structure in order
            if (structureIndex < generated_if_else_structures.length) {
                arr.push(generated_if_else_structures[structureIndex].structure); // Call structure in order
                structureIndex++; // Move to the next structure
            } else {
                console.warn("No more generated structures available.");
            }
        } else {
            generate_if_else_structure(arr, 1, arr_of_returned_values);
        }

        arr.push("}\n");
        methods.push(arr.join(""));
    });

    return methods;
}

// Generate methods for each name in arr_of_random_names



// Function to save data to CSV
function saveToCSV(data) {
    const headers = "read_good,read_bad,diff,correct,time_taken\n";
    const filePath = 'results_4.csv';

    // Check if the file exists. If not, write the headers first.
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, headers);
    }

    const row = `${data.read_good},${data.read_bad},${data.diff},${data.correct},${data.time_taken}\n`;
    fs.appendFileSync(filePath, row);
}



// Instantiate the readline interface
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// Capture the start time when the question is prompted
let startTime = Date.now();

// Prompt the user for an answer
// rl.question("What is the return value of the generated method? ", (userInput) => {
//     let isCorrect = false;
//
//     if (userInput == null) {
//         console.log("Invalid Input");
//     } else if (userInput.toString() === correctAnswer.toString()) {
//         console.log("This answer is correct!");
//         isCorrect = true;
//     } else {
//         console.log("The answer is incorrect. The correct answer is:", correctAnswer);
//     }
//
//     // Calculate the time taken by the user to respond
//     let timeTaken = Date.now() - startTime;
//
//     // Save values to CSV, including the time taken
//     saveToCSV({
//         read_good: read_Good.totalCount,
//         read_bad: read_Bad,
//         diff: diff,
//         correct: isCorrect ? 'true' : 'false',
//         time_taken: timeTaken
//     });
//
//     rl.close();  // Close the input stream
// });

let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Nyuyyu First Trial",
        seed: "42",
        introduction_pages: [
            () => writer.print_string_on_stage("Press [Return] to enter the training phase.")
        ],

        pre_run_training_instructions: writer.string_page_command(
            "You entered the training phase. In the training phase, you get a random set of tasks, either as Java code or as inference rules.<br><br>" +
            "Please, run the training until you feel familiar with the experiment. This could be - for example - the case when you correctly answered the tasks 10 times.<br><br>" +
            "You can interrupt the training phase by pressing [ESC]. Otherwise, the training phase will be repeated.<br><br>" +
            "<b>Note that you can see that you are in the training phase (top, right of the screen says <code>Training</code>)</b><br><br>" +
            "Note that you give a response to a question by pressing [0], [1], [2], or [3]."
        ),

        pre_run_instruction: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase."
            )),


        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase."
            )),


        post_questionnaire: [
            Nof1.alternatives("Age", "What's your age??",
                ["younger than 18", "between 18 and (excluding) 25", "between 25 and (excluding) 30", "between 30 and (excluding) 35", "between 35 and (excluding) 40", "40 or older"]),

            Nof1.alternatives("Status", "What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),

            Nof1.alternatives("Studies", "In case you study, what's your subject?",
                ["I do not study", "Computer science", "computer science related (such as information systems, aka WiInf)", "something else in natural sciences", "something else"]),

            Nof1.alternatives("YearsOfExperience", "How many years of experience do you have in software industry?",
                ["none", "less than or equal 1 year", "more than 1 year, but less than or equal 3 years", "more than 3 years, but less than or equal 5 year", "more than 5 years"]),

            Nof1.alternatives("impression", "What statement describes " +
                "                       best your impression \n\ of the experiment?", [
                "I do not think that there was a difference between the notations",
                "The inference notation made it slightly easier for me",
                "Java made it slightly easier for me",
                "The inference notation made it much easier for me",
                "Java made it much easier for me",
            ])
        ],

        finish_pages: [
            writer.string_page_command(
                "Thanks for participating. When you press [Enter], the experiment's data will be downloaded.\n\n" +
                "Please send your data to send the data to stefan.hanenberg@uni-due.de and olive.tatah@uni-due.de.\n\n" +
                "Best,\n" +
                "Nyuyyu")],

        layout: [
            {variable: "Identifier", treatments: ["Good", "Bad"]}
            // {variable:"Diff",treatments:["8", "9"]}
        ],
        repetitions: 2,                    // Anzahl der Wiederholungen pro Treatmentcombination
        accepted_responses: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // Tasten, die vom Experiment als Eingabe akzeptiert werden
        measurement: Nof1.Reaction_time(Nof1.keys(["0", "1", "2", "3"])),
        task_configuration: (t) => {

            let value_of_true_false_combination = Nof1.new_random_integer(32000); //4,5,9 give same value for read_Good

            // Equally have method names with bad and good identifiers
            let useRandomName = Nof1.new_random_integer(2) == 0;

            // Generate a collection of trees
            let all_true_false_trees = create_true_false_if_trees(4, useRandomName);

            console.log("Number of true/false trees: ", all_true_false_trees.length);

            let arr = [];
            all_true_false_trees[value_of_true_false_combination].print_into_stream(arr, 0);

            let HTML_String = arr.join("");

            console.log(arr.join(""));

            console.log("------- Generated Methods ------------ \n")
            // Generate methods based on names

            let generatedMethods = generate_methods_for_names(arr_of_random_names, useRandomName);


// Output all generated methods
            console.log("Generated Methods:\n", generatedMethods.join("\n"));

            HTML_String += generatedMethods.join("\n");


            console.log("======================================* Code *===================================================");


//Test test
            let read_Good = computeReturnValue(all_true_false_trees[value_of_true_false_combination])

// Compute the final return value for the first tree
            let finalMethodCall = read_Good;

            let read_Bad = 5;

            console.log("======================- Other Important Outputs -====================================");

// Print generated names for verification
//console.log("Method Names: ", arr_of_random_names);

// Print returned values for verification
//console.log("Value returned from Methods: ", test_arr);

            // console.log("Number True/False Combinations: ", all_true_false_trees.length);
            // console.log("Test")
            // console.log("The final method call is: ", finalMethodCall.returnValue);
            //
            // console.log("=====================* Other Important Outputs *================================== \n");
            //
            // console.log("========================= Nodes traversed in Method definition =====================================")

// Assuming 'generated_if_else_structures' contains our generated structures
            generated_if_else_structures.forEach((entry, index) => {
                let methodName = arr_of_random_names[index];

                let clean_FinalMethodCall = finalMethodCall.returnValue.replace(/\(|\)/g, '');

                if (clean_FinalMethodCall === methodName) {
                    //console.log(`Counting branches in the method ${methodName}():`);
                    // console.log("read_good", read_Good.totalCount)
                    read_Bad += traverseAndCountNodes(entry.structure, read_Good.totalCount) + read_Good.totalCount;
                }

                //console.log(`Counting branches in the method ${methodName}():`);
                //console.log(`Traversing structure # \n ${entry.structure}`);
                traverseAndCountNodes(entry.structure, read_Good.totalCount);


            });
            console.log("======================* Nodes traversed in Method definition *========================================\n")


            console.log("===========================- Independent and Dependent Variables -========================================");

            let diff = read_Bad - read_Good.totalCount;

            console.log("Read Good: ", read_Good.totalCount);
            console.log("Read Bad: ", read_Bad)
            console.log("Diff: ", diff)
            console.log("Correct Answer: ", read_Good.correctAnswer)


            console.log("=======================* Independent and Dependent Variables *=============================================\n");


            console.log("========================================****FIN****=======================================================\n")

            t.do_print_task = () => {
                writer.clear_stage();
                let converted_string =  writer.convert_string_to_html_string(HTML_String);
                writer.print_html_on_stage(converted_string);
            };

            // t.expected_answer = this_statement.correct_answer();

            t.after_task_string = () => "The correct answer for the code was: " + t.expected_answer;
        }
    }
};

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);