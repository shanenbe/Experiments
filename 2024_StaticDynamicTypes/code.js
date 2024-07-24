Nof1.SET_SEED("4");
//CODE:
/*

ToDo:
=> d.parseData <- cannot read property of D
=> constructor P()
=> P(X(), M(), D())
=> Q(P(X(), M(), D()))
=> A(Q(P(X(), M(), D() )), J())

    Stupid comment

    Class -> className method* constructor;
    constructor -> parameter* body;
    method -> methodName parameter* body;
    body -> methodCall*;
    methodCall -> target methodName parameter*;

    ConstructorCall -> Klassenname ConstructorCall*; A(B(C(), D())

    Naive Ideen:
    - Anzahl Klassen ist fix (10)
    - Anzahl Methoden pro Klasse ist fix (1);
    - MethodenBody ist IMMER LEER;
    - Anzahl Parameter Constructor/Methode <= 4
    - Anzahl der MethodCalls immer = Anzahl Parameter

    Berechnung Difficulty und Diff:


    Semantics:

    Class given: A()

    A(B()...N()) -> Initialclass (B()...N())
    (B()...N())  -> ConstructorList
    ()           -> cn


    Difficulty: Typed
    Difficulty_Target(Target(p1, ..., pn)) = n + Sum(i=0;n; Difficulty_T(pi))
    Difficulty_T(Pi()) = 0
    Difficulty_T(Pi(q1, ..., qn)) = 1 + n + Sum(i=0;n; Difficulty_T(qi))

    Bsp: Difficulty_Target(A(B(), C(D()), E))
         Difficulty_Target(A(B(), C(D()), E)) = 3 + ...2 = 5
           Difficulty_T(B()) = 0
           Difficulty_T(C(D())) = 2 +  ... 0
              Difficulty_T(D()) = 0
           Difficulty_T(E()) = 0

    Difficulty Untyped:
    Difficulty_UTarget(Target(p1, ..., pn)) = n + Sum(i=0;n; Difficulty_U(pi))
    Difficulty_U(Pi()) = 0
    Difficulty_U(Pi(q1, ..., qn)) = 2 + n + Sum(i=0;n; Difficulty_U(qi))

    Bsp: Difficulty_UTarget(A(B(), C(D()), E))
         Difficulty_Target(A(B(), C(D()), E)) = 3 + ...3 = 6
           Difficulty_T(B()) = 0
           Difficulty_T(C(D())) = 3 +  ... 0
              Difficulty_T(D()) = 0
           Difficulty_T(E()) = 0


     diff = Difficulty_U - Difficulty_T

*/
let stackTrace = [];
function check_for_method(clazz, name) {
    return clazz.get_method_by_name(name);
}

function do_typecheck_call(E, call) {
    check_for_method(E[(call.target_expression).name], call.name.name);
}

function do_typecheck(c, clazzes) {
    let E = {};
    for (let param of c.parameters) {
        E[param.name] = param.type;
    }
    // zB E{ x=ClassX, x=...}

    for(let call of c.body.methodCalls) {
        do_typecheck_call(E, call);
    }
}

function type_check_classes(clazzes) {
    for(let c of clazzes) {
        do_typecheck(c.constr, clazzes);
    }
}

function get_class(class_name, clazzes) {
    for(let clzz of clazzes) {
        if (clzz.name === class_name) {
            return clzz;
        }
    }
}
function type_check_constructor_call(constr_call, clazzes) {
    let target_class = get_class(constr_call.className, clazzes);

    if(constr_call.parameters.length !== target_class.constr.parameters.length)
        throw "invalid number of parameters at constructor " + target_class.name;

    for(let counter = 0; counter < constr_call.parameters.length; counter++) {
        if(constr_call.parameters[counter].className !== target_class.constr.parameters[counter].type.name)
            throw "invalid type for constructor call of class " + target_class.name;
    }
    for(let counter = 0; counter < constr_call.parameters.length; counter++) {
        type_check_constructor_call(constr_call.parameters[counter], clazzes);
    }

}
function InputTranslate(input) {
    input = input.replace(/\s/g, "");
    let Output = "";
    let lastcharacter;
    for (let character of input) {
        if (character === "(") {
            Output += "";
        } else if (character === ")") {
            Output += "]),"
        } else if (character === " ") {

        }else if (character === ",") {
            if (lastcharacter === ",") {
                throw "SyntaxError: missing ) after argument list"
            }
        } else {
            if (lastcharacter === ")") {
                throw "SyntaxError: missing ) after argument list"
            }
            Output += "CC(\"" + character + "\", ["
        }
        lastcharacter = character;
    }
    Output = Output.slice(0, -1) + ";";
    return Output
}


class ClassGenerator {
    removeRandomElement(array) {
        if (array.length === 0) {
            return undefined; // Return undefined if the array is empty
        }

        // Generate a random index within the array's length
        const randomIndex = Math.floor(Math.random() * array.length);

        // Remove the element at the random index and store it in a variable
        // Return the removed element
        return array.splice(randomIndex, 1)[0];
    }
    getRandomElement(array) {
        if (array.length === 0) {
            return undefined; // Return undefined for an empty array
        }

        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
    get_class(className, classes) {
        for(let i=0;  i < classes.length; i++) {
            if ((classes)[i].name === className)
                return (classes)[i];
        }
        throw "class " + className +" does not exist";
    }

    getRandomIterations(maxIterations) {
        return Math.floor(Math.random() * maxIterations) + 1;
    }
    insertAtRandomPosition(array, element) {
        const randomIndex = Math.floor(Math.random() * (array.length + 1));
        array.splice(randomIndex, 0, element);
    }

    do_generate(notation, difficulty_t, diff, number) {

        let functionNames = [
            'calculateSum',
            'generateRandomNumber',
            'processData',
            'validateInput',
            'formatOutput',
            'getUserInfo',
            'fetchData',
            'handleError',
            'parseData',
            'executeTask',
            'handleUserInteraction',
            'analyzeDataResults',
            'clearCache',
            'trackUserActivity',
            'logErrorDetails',
            'monitorSystemHealth'

            // Add more function names as needed
        ];

        let classes = this.generate_methods(functionNames, number);

        let lowercaseLetters = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        let classNames = new Set(classes.map(cls => cls.name.toLowerCase()));
        lowercaseLetters = lowercaseLetters.filter(letter => !classNames.has(letter));
        let difficulty = 0;
        if (notation === "static") {
            difficulty = difficulty_t;
        } else {
            difficulty = difficulty_t + diff;
        }


       // console.log(classes.toString());
        // Beginn initialisierung erster Klasse
        let classCopy= [];
        // Nächste zu bearbeitende Klassen
        let nextClasses = [];
        //Gerade zu bearbeitende Klasse
        let chosenClass = this.removeRandomElement(classes);
        let target_classS = chosenClass.name;
        // Get the random number of iterations
        let iterations = this.getRandomIterations(4);
        // Loop using the random number of iterations
        if (notation === "static" && iterations === 4 && difficulty === 5) {
            iterations--;
        }
        for (let i = 0; i < iterations; i++) {
            if(difficulty>0) {
                let targetClass = this.removeRandomElement(classes);
                let targetName = this.removeRandomElement(lowercaseLetters);
                for (let i= 0; i< chosenClass.constr.parameters.length; i ++) {
                    while (targetName === chosenClass.constr.parameters[i].name) {
                        targetName = this.removeRandomElement(lowercaseLetters);
                    }
                }
                chosenClass.constr.parameters.push(P(targetClass, targetName));
                chosenClass.constr.body.methodCalls.push(Ca(A(targetName), targetClass.methods[0], []));
                nextClasses.push(targetClass);

            }

        }
        if (notation === "static") {
            difficulty = difficulty  - iterations*1;
        } else {
            difficulty = difficulty  - iterations*1;
        }
        this.insertAtRandomPosition(classCopy, chosenClass);
        while (difficulty > 0) {
            chosenClass = this.removeRandomElement(nextClasses);
            //Möglichkeit dass Difficulty 0,5 zu groß ist (!!!)
            let iterations = this.getRandomIterations(2);
            // Fix Schwierigkeit zu hoch
            if (notation === "static" && (difficulty - 1 - iterations * 1) === 1) {
                iterations++;
            }
            if (notation === "dynamic" && (difficulty - 2 - iterations * 1) === 2) {
                iterations++;
                iterations++;
            }
            //3 und 5 instead?
            if (difficulty <= 3 && notation === "static") {
                iterations = (difficulty-1);
            }
            //3 und 5 instead?
            if (difficulty <= 5 && notation === "dynamic") {
                iterations = (difficulty-2);
            }
            //Drüfte nicht mehr triggern
            if(iterations === 0 && difficulty > 0) {
                iterations = 1;
            }

            for (let i = 0; i < iterations; i++) {
                let targetClass = this.removeRandomElement(classes);
                let targetName = this.removeRandomElement(lowercaseLetters);
                chosenClass.constr.parameters.push(P(targetClass, targetName));
                chosenClass.constr.body.methodCalls.push(Ca(A(targetName), targetClass.methods[0], []));
                nextClasses.push(targetClass);

            }
            if (notation === "static") {
                difficulty = difficulty-1 - iterations*1;
            } else {
                difficulty = difficulty-2 - iterations*1;
            }
            this.insertAtRandomPosition(classCopy, chosenClass);
        }
        // Push die restlichen Klassen
        for (let i=0; i<classes.length; i++) {
            this.insertAtRandomPosition(classCopy, classes[i]);
        }
        for (let i=0; i<nextClasses.length; i++) {
            this.insertAtRandomPosition(classCopy, nextClasses[i]);
        }
        //Alphabetisch sortieren
        classCopy.sort((a, b) => a.name.localeCompare(b.name));
        // Index der targetClass
        const targetindex = classCopy.findIndex(fruit => fruit.name === target_classS);
        if (targetindex !== -1) {
            const startClass = classCopy.splice(targetindex, 1)[0];
            classCopy.unshift(startClass);
        }
        return {targetClass_name: target_classS, class_array: classCopy};

    }

    generate_methods(functionNames, number) {
        let alphabet = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];

        // Liste mit Klassen am Ende
        let classes = [];
        // 10 Klassen mit jeweils einer Methode initialisieren
        for (let i = 0; i < number; i++) {
            classes.push(new Class(this.removeRandomElement(alphabet),
                Co([],
                    B([])
                ), [
                    M(this.removeRandomElement(functionNames), [], B([]))
                ]
            ));
        }
        return classes;
    }
}

class Interpreter {
    classes;
    call_stack = [];

    constructor(classes, constructorCall) {
        this.classes = classes;
        this.call_stack.push(new Frame(this, null));
        constructorCall.push_on_stack(this);
    }

    current_frame() {
        return this.call_stack[this.call_stack.length - 1];
    }

    get_class(className) {
        if (className === null) {
            throw "Cannot read properties of null"
        }
        for(let i=0;  i < this.classes.length; i++) {
            if ((this.classes)[i].name === className)
                return (this.classes)[i];
        }
        throw "class " + className +" does not exist";
    }

    do_interpretation(){
        while(this.call_stack.length>0) {
            let current_frame = this.current_frame();
            current_frame.execute();
        }
    }
}

class Frame {

    interpreter;
    origin;

    constructor(interpreter, fromConstructorOrMethodCall) {
        this.interpreter = interpreter;
        this.origin = fromConstructorOrMethodCall;
    }

    variable_bindings = {};
    expressions = [];
    values = [];

    execute() {
        if(this.expressions.length>0) {
            let last_expression = this.expressions[this.expressions.length-1];
            last_expression.execute(this);
        } else {
            this.interpreter.call_stack.pop();

            if (this.origin !== undefined) {
                if (this.origin.is_constructor()) {
                    this.interpreter.current_frame().values.push(new _Object(this.origin.get_class(this)));
                }
            } else {
                // Initial Call without any Stuff.....
            }
        }
    }

    pop_actual_parameters(number) {
        let ret = [];
        for(let i = 0; i < number; i++) {
            ret.push(this.values.pop());
        }
        return ret.reverse();
    }

    do_bindings(parameters, actual_parameters) {
        let counter = 0;
        parameters.forEach( p =>
            this.variable_bindings[p.name] = actual_parameters[counter++]

        )
        if (parameters.length > actual_parameters.length) {
            throw "missing class in constructor call"
        }
        if (parameters.length < actual_parameters.length) {
            throw "Too many parameters in constructor call"
        }



    }

    get_object_named(name) {
        return this.variable_bindings[name];
    }
}


class Expression {
    execute(frame) { throw "not yet implemented";}
    push_on_stack(interpreter) { throw "not yet implemented"; }

    is_constructor() {return false;}
    get_class(frame) {
        throw "Not yet implemented";
    }
}

class VariableAccess extends Expression {
    name;

    constructor(name) {
        super();
        this.name = name;
    }

    push_on_stack(interpreter) {
        interpreter.current_frame().expressions.push(this);
    }

    execute(frame) {
        frame.expressions.pop();
        let ref_object = frame.get_object_named(this.name);
        frame.values.push(ref_object);
    }

}

class Call extends Expression {
    parameters;
    constructor(parameters) {
        super();
        this.parameters = parameters;
    }

    is_constructor() {return false;}
}

class ConstructorCall extends Call {
    className;

    constructor(className, parameters) {
        super(parameters);
        this.className = className;
    }

    execute(frame) {
        if(this.className === null) {
           // throw "Cannot read properties of null"
        }
        let actual_parameters = frame.pop_actual_parameters(this.parameters.length);
        let myConstructor = this.get_class(frame).constr;

        frame.expressions.pop(); // sollte ich sein, oder?

        let call_frame = new Frame(frame.interpreter, this);
        try {
            call_frame.do_bindings(myConstructor.parameters, actual_parameters);
        } catch (e) {
            throw e +" " + this.className + "()";
        }


        frame.interpreter.call_stack.push(call_frame);

        myConstructor.body.push_on_stack(call_frame);

        // do variable bindings
    }

    push_on_stack(interpreter) {
        let current_frame = interpreter.current_frame();
        current_frame.expressions.push(this);
        this.parameters.toReversed().forEach( p =>
            p.push_on_stack(interpreter)
        );
        // current_frame.current_executor = this;
    }

    get_class(frame) {
        return frame.interpreter.get_class(this.className);
    }

    is_constructor() {return true;}

    matches_result(result) {

    }
    print_call(errorMessage) {
        errorMessage.push(this.className)
        errorMessage.push("(")
        for (var parameter of this.parameters) {
            parameter.print_call(errorMessage);
            errorMessage.push(",");
        }
        if(this.parameters.length > 0) {
            errorMessage.pop();
        }
        errorMessage.push(")");
    }

}

/**
 * a.m(), (new A()).m(), (new A()).m((new B());
 */
// class Type_Bindings {
//     bindings = {}
// }

/*
   Richtig: a.m(x, y);
   Falsch: a.m(new Y());
 */
class MethodCall extends Call {
    target_expression;
    name;


    constructor(target, name, parameters) {
        super(parameters);
        this.target_expression = target;
        this.name = name;
    }

    print_into(arr) {
        arr.push("    " + (this.target_expression).name + "." + this.name.name + "();")
    }
    checkMethodList(mList) {
        if(mList.includes(this.name)) {

        } else {
            throw "Wrong method when constructing class"
        }
    }

    push_on_stack(interpreter) {
        let current_frame = interpreter.current_frame();
        current_frame.expressions.push(this);
        this.target_expression.push_on_stack(interpreter);
        this.parameters.toReversed().forEach( p =>
            p.push_on_stack(interpreter)
        );

    }
    execute(frame) {
        let target_object = frame.pop_actual_parameters(1)[0];

        try {

            let actual_parameters = frame.pop_actual_parameters(this.parameters.length);

            let thisMethod = target_object.get_method_by_name(this.name);



            frame.expressions.pop(); // sollte ich sein, oder?

            let call_frame = new Frame(frame.interpreter, this);
            call_frame.do_bindings(thisMethod.parameters, actual_parameters);
            frame.interpreter.call_stack.push(call_frame);

            thisMethod.body.push_on_stack(call_frame);
        } catch (ex) {
            //Zwei verschiedene Fehlermeldung etablieren: ein mal falsche methode, ein mal parameter fehlt!
            //throw this.target_expression.name + "." + ex + "<- cannot read property of " +  target_object.clazz.name;
            let position =  frame.interpreter.call_stack.length-1;
            let tempClassName = frame.interpreter.call_stack [position].origin.className;
            let error = frame.interpreter.call_stack[frame.interpreter.call_stack.length-1].expressions[frame.interpreter.call_stack[frame.interpreter.call_stack.length-1].expressions.length-1].target_expression.name +
            "." + frame.interpreter.call_stack[frame.interpreter.call_stack.length-1].expressions[frame.interpreter.call_stack[frame.interpreter.call_stack.length-1].expressions.length-1].name.name
            + "<- cannot read property of " + target_object.clazz.name
           + "<br/>" + "constructor " + tempClassName;
            let errorMessage = [];
            frame.interpreter.call_stack[frame.interpreter.call_stack.length-1].origin.print_call(errorMessage);
            let errorString = errorMessage.join("");
            error =  error + "<br/>" + errorString;
            if (target_object.clazz.name === null) {
                throw "SyntaxError: missing ) after argument list"
            }
            throw error
        }
        }
}

class Class  {
    name;
    constr;
    methods;

    constructor(name, constr, methods) {
        this.name = name;
        this.constr = constr;
        this.methods = methods;
    }

    print_into(arr, type) {
        arr.push("class" + " " + this.name + "{\n");
        arr.push("  " + this.name + "(");
        this.constr.print_into(arr, type);

        this.methods.forEach ( m=>
            m.print_into(arr)
        );
        arr.push("}\n\n");
    }

    print_into_string(type) {
        let arr = [];
        this.print_into(arr, type);
        return arr.join("");
    }
    getSolution() {
        if (this.constr.parameters.length === 0) {
            return this.name + "()";
        } else {
            const parametersString = this.constr.parameters.map(param => param.type.getSolution()).join(", ");
            return this.name + "(" + parametersString + ")";
        }
    }
    invoke_constructor(interpreter, instances) {
        this.constr.invoke_constructor(interpreter, instances);
    }

    get_method_by_name(method_name) {
        if(method_name instanceof Method) {
            method_name = method_name.name
        }
        for(let i = 0; i < this.methods.length; i++) {
            if(this.methods[i].name === method_name)
                return this.methods[i];
        }
        throw method_name
    }
}


class Method {
    name;
    parameters;
    body;

    // type_of() {
    //     let type_bindings = new Type_Bindings();
    //     this.parameters.forEach((p:Parameter) => type_bindings.add(p.name, p.type));
    //     this.body.type_of(type_bindings);
    // }

    constructor(name, parameters, body
    ) {
        this.name = name;
        this.parameters = parameters;
        this.body = body;
    }

    print_into(arr) {
        arr.push("  " + this.name + "(");
        let tmp_array = [];
        this.parameters.forEach( p =>
            p.print_into(tmp_array)
        );
        arr.push(tmp_array.join(", "));
        arr.push(") {");
        this.body.print_into(arr);
        arr.push("  }\n\n");
    }


}

class Constr {
    parameters;
    body;

    constructor(parameters, body) {
        this.parameters = parameters;
        this.body = body;
    }

    print_into(arr, type) {
        let tmp_array = [];
        this.parameters.forEach( p =>
            p.print_into(tmp_array, type)
        );
        arr.push(tmp_array.join(", "));
        arr.push(") {");
        arr.push("\n");
        this.body.print_into(arr);
        arr.push("  }\n");
    }
    //
    // invoke_constructor(interpreter: Interpreter, instances) {
    //     let scope = new Scope();
    //     let counter = 0;
    //     this.parameters.forEach( p => {
    //         scope.parameter_bindings.push(new Parameter_Binding(p.name, instances[counter]));
    //         counter++;
    //     });
    //     this.body.execute(interpreter, scope);
    // }
}

class Body {
    methodCalls;

    constructor(methodCalls) {
        this.methodCalls = methodCalls;
    }

    print_into(arr) {
        this.methodCalls.forEach( (call) => {
            call.print_into(arr);
            arr.push("\n");
        });
    }

    execute(interpreter, scope) {
        // this.methodCalls.forEach( m => m.execute(interpreter, scope));
    }

    push_on_stack(frame) {
        //  LOOKHERE WORK TBD
        //  toReverse raus genommen aber Error ist immer noch falsch?
        this.methodCalls.toReversed().forEach( (mCall) =>
            mCall.push_on_stack(frame.interpreter)
        )
    }

    // type_of(type_bindings: Type_Bindings) {
    //     this.methodCalls.forEach((c:MethodCall) => c.type_of(type_bindings));
    // }
}

class _Object {
    clazz;

    constructor(clazz) {
        this.clazz = clazz;
    }

    get_method_by_name(name) {
        return this.clazz.get_method_by_name(name);
    }
}

class Parameter {
    type;
    name;

    constructor(type, name) {
        this.type = type;
        this.name = name;
    }
    checkParamList(paramList) {
        if (paramList.includes(this.name)) {
        }
        else {
            throw "Wrong classname"
        }
    }
    print_into(arr, type) {
        if (type === "static") {
            arr.push(this.type.name + " " + this.name)
        } else {
            arr.push(this.name)
        }
    }

}

class Parameter_Binding {
    name;
    instance;

    constructor(name, instance) {
        this.name = name;
        this.instance = instance;
    }
}

function A(n) {
    return new VariableAccess(n);
}

function P(t, n) {
    return new Parameter(t, n);
}

function Co(p, b) {
    return new Constr(p, b);
}

function B(c) {
    return new Body(c);
}

function Ca(t, n, p) {
    return new MethodCall(t, n, p);
}

function M(n, p, b) {
    return new Method(n, p, b);
}

function CC(c, CCs) {
    return new ConstructorCall(c, CCs);
}
function read_identifier(string_array) {
    let identifier = [];
    while(string_array.length>0) {
        let this_token = string_array.shift();
        if((this_token>='a' && this_token<='z') || this_token>='A' && this_token<='Z') {
            identifier.push(this_token);
        } else {
            if(identifier.length<=0)
                throw "Invalid Identifier before: " + string_array.join('');
            else {
                string_array.unshift(this_token);
                return identifier.join("");
            }
        }
    }
    if(identifier.length<=0)
        throw "No identifier";
    return identifier.join("");
}

function read_constructor_call_list(arr) {
    if(arr.length<1)
        throw "missing )";
    let parameters = [];
    let this_token = arr[0];

    if(this_token !== ")" && arr.length > 0 ) {
        let next_constructor_call = read_constructor_call(arr);
        parameters.push(next_constructor_call);
        this_token = arr[0];
        if(this_token===",") {
            arr.shift();
            let rest_params = read_constructor_call_list(arr);
            rest_params.forEach(e=>parameters.push(e));
        }
// this_token = arr.shift();
    }

    if(arr.length <= 0)
        throw "missing )";

    return parameters;
}

function read_constructor_call(arr) {
    let identifier = read_identifier(arr);
    if (identifier === "null") {
        return new ConstructorCall(null, []);
    }
    let token = arr.shift();
    if(token !== "(")

        throw "Missing ( before )" + arr.join("") ;

    let parameters = read_constructor_call_list(arr);
    token = arr.shift();
    if(token !== ")")
        throw "Missing )";
    return new ConstructorCall(identifier, parameters);
}

function translate_string_into_method_call(aString) {
    if(aString.match("[a-zA-Z]\\s+[a-zA-Z]") != null)
        throw "Invalid white space between identifiers";

    let compressed = aString.replaceAll(" ", "");
    let string_array = compressed.split('');

    let constructor_call = read_constructor_call(string_array);

    if(string_array.length>0)
        throw "Can't resolve " + string_array.join((""));

    return constructor_call;
}

let testClassesStatic = new ClassGenerator().do_generate("static", 1, 0, 4);
let testClassesDynamic = new ClassGenerator().do_generate("dynamic", 1, 0, 4);

let experiment_configuration_function = (writer) => { return {

    experiment_name: "TestExperiment",
    seed: "1",
    introduction_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string(
            "In the following experiment you will be presented with the task to generate constructor calls in static and dynamic programming languages.\n\n" +
            "The syntax for initializing a constructor call is the same in both languages: Simply enter the class name followed by opening and closing parenthesis.\n\n" +
            "In order for an answer to be accepted the correct target class needs to be initialized with all required parameters.\n\n" +
            "The experiment does not care for whitespaces and will provide you with error messages typical for the language type.\n\n"+
            "In order to initialize the class " + testClassesStatic.class_array[0].name + " in this static language example you would need to type: " + testClassesStatic.class_array[0].name+ "("+ testClassesStatic.class_array[2].name +"(), " + testClassesStatic.class_array[1].name + "())\n\n" +
            "Target class: " + testClassesStatic.class_array[0].name +"\n\n" +
            testClassesStatic.class_array[0].print_into_string("static") +
            testClassesStatic.class_array[1].print_into_string("static") +
            testClassesStatic.class_array[2].print_into_string("static") +
            testClassesStatic.class_array[3].print_into_string("static")
        ),
        writer.convert_string_to_html_string(
            "For the dynamically typed language the only difference in the information presented is that given parameters only consist of a name.\n\n" +
            "To find out the type of a parameter you instead have to take a look at the used method call inside the constructor and figure out which class the method belongs to.\n\n" +
            "In order to initialize the class " + testClassesDynamic.class_array[0].name + " in this static language example you would need to type: " + testClassesDynamic.class_array[0].name+ "("+ testClassesDynamic.class_array[1].name +"(), " + testClassesDynamic.class_array[2].name + "())\n\n" +
            "Target class: " + testClassesDynamic.class_array[0].name +"\n\n" +
            testClassesDynamic.class_array[0].print_into_string("dynamic") +
            testClassesDynamic.class_array[1].print_into_string("dynamic") +
            testClassesDynamic.class_array[2].print_into_string("dynamic") +
            testClassesDynamic.class_array[3].print_into_string("dynamic")
        ),
        writer.convert_string_to_html_string(
            "In dem folgenden Experiment wird Ihnen die Aufgabe gestellt statische und dynamische constructor calls zu generieren.\n\n" +
            "Die Syntax für die Initialisierung von consturctor calls ist identisch für beide Sprachen: Geben Sie dafür den Klassennamen, gefolgt von öffnenden und schließenden Klammern in die Antwortbox ein.\n\n" +
            "Damit eine Antwort als korrekt akzeptiert wird, muss der constructor call die Zielklasse ansprechen, sowie alle notwendigen Parameter enthalten.\n\n" +
            "Innerhalb der Antwort sind leerzeichen irrelevant, gegebene falsche Antworten sorgen zusätzlich für die Ausgabe von Fehlermeldungen welche typisch für die jeweilige Sprache sind. \n\n"+
            "Um die Klasse " + testClassesStatic.class_array[0].name + " in dieser Aufgabe vom statischen Sprachtyp zu initialisieren muss folgender Text als Antwort abgegeben werden: " + testClassesStatic.class_array[0].name+ "("+ testClassesStatic.class_array[2].name +"(), " + testClassesStatic.class_array[1].name + "())\n\n" +
            "Target class: " + testClassesStatic.class_array[0].name +"\n\n" +
            testClassesStatic.class_array[0].print_into_string("static") +
            testClassesStatic.class_array[1].print_into_string("static") +
            testClassesStatic.class_array[2].print_into_string("static") +
            testClassesStatic.class_array[3].print_into_string("static")
        ),
        writer.convert_string_to_html_string(
            "Für Aufgaben des dynamischen Sprachtypes liegt der einzige Unterschied in der dargestellten Information darin, dass Parameter nur noch aus Namen bestehen und keine Information mehr über ihren Typen enthalten.\n\n" +
            "Um den Typ eines Parameters herauszufinden muss nun darauf geachtet werden, welche Methode der Parameter innerhalb des constructor calls benutzt.\n\n" +
            "Um die Klasse " + testClassesDynamic.class_array[0].name + " in der dynamischen Sprache zu initialisieren, muss folgende Antwort abgegeben werden: " + testClassesDynamic.class_array[0].name+ "("+ testClassesDynamic.class_array[1].name +"(), " + testClassesDynamic.class_array[2].name + "())\n\n" +
            "Target class: " + testClassesDynamic.class_array[0].name +"\n\n" +
            testClassesDynamic.class_array[0].print_into_string("dynamic") +
            testClassesDynamic.class_array[1].print_into_string("dynamic") +
            testClassesDynamic.class_array[2].print_into_string("dynamic") +
            testClassesDynamic.class_array[3].print_into_string("dynamic")
        )
    ]),

    pre_run_training_instructions: writer.string_page_command(
        "You entered the training phase.\n\n"
        ),

    pre_run_experiment_instructions: writer.string_page_command(
        writer.convert_string_to_html_string(
            "You entered the experiment phase.\n\n"
        )),

    finish_pages: writer.stage_string_pages_commands([
        writer.convert_string_to_html_string(
            "Almost done. When you press [Enter], the experiment's data will be downloaded. \n\n" +
            "Please fill out the following form: https://github.com/shanenbe/Experiments/blob/main/2024_StaticDynamicTypes/informationsheet.pdf\n\n" +
            "Download and send both the 'informationsheet.pdf' and 'experimentdata.csv' in one singular mail to stefan.hanenberg@uni-due.de\n\n" +
            "We are only allowed to evaluate your data if both the data and signed information sheet are sent together. Thank you for your time!\n\n" +
            "\n\n" +
            "Bitte füllen Sie folgende Einverständniserklärung aus: https://github.com/shanenbe/Experiments/blob/main/2024_StaticDynamicTypes/informationsheet.pdf\n\n" +
            "Downloaden und senden Sie bitte sowohl 'informationsheet.pdf' als auch 'experimentdata.csv' in einer einzigen E-Mail an: stefan.hanenberg@uni-due.de\n\n" +
            "Wir dürfen Ihre Daten nur auswerten, falls sowohl die Einverständniserklärung als auch die Experimentdaten gemeinsam verschickt werden. Vielen Dank für Ihre Zeit!\n\n"

        )
    ]),

    post_questionnaire: [
        Nof1.free_text("Age","How old are you?"),
        Nof1.alternatives("Status","What is your current working status?",
            ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),
        Nof1.free_text("Experience","How many years of working experience in software industry to you have?")
    ],

    layout: [
        {
            variable: "Type",
            treatments: ["static","dynamic"]
        },
        {
            variable: "difficulty_t",
            treatments: ["5", "7"]
        },
        {
            variable: "diff",
            //geht bis 8
            treatments: ["3", "5"]
        }
    ],
    repetitions: 3,

    measurement: Nof1.Time_to_finish(Nof1.text_input_experiment),

    task_configuration:    (t) => {
        let classes = new ClassGenerator().do_generate(t.treatment_combination[0].value, parseInt(t.treatment_combination[1].value), parseInt(t.treatment_combination[2].value), 10);
       // console.log("TargetClass: " + classes.targetClass_name);
        t.do_print_task = () => {
            writer.clear_stage();
          //  console.log(t.treatment_combination[0].value);
           // console.log(t.treatment_combination[1].value);
           // console.log(t.treatment_combination[2].value);
            // Difficulty runter damit Experiment schneller
            // writer.print_html_on_stage(t.treatment_combination[0].value);
            //writer.print_html_on_stage(t.treatment_combination[1].value);
            // writer.print_html_on_stage(t.treatment_combination[2].value);
            if (t.is_training) {
                writer.print_string_on_stage("You are still inside the training phase. If you would like to start the experiment press [Esc] and confirm with [E](capital E!). \n\n")
            }
            writer.print_html_on_stage("<h1>Generate the correct constructor call for the given target class</h1>");
            writer.print_html_on_stage("Target Class:  " + classes.targetClass_name);
           // console.log(get_class(classes.targetClass_name, classes.class_array).getSolution());
            let firstClasses = classes.class_array.slice(1, 4);
            let secondClasses = classes.class_array.slice(4, 7);
            let thirdClasses = classes.class_array.slice(7, 10);
            let firstBox = [];
            let secondBox = [];
            let thirdbox = [];
            firstClasses.forEach(v =>  firstBox = firstBox + v.print_into_string(t.treatment_combination[0].value));
            secondClasses.forEach(v =>  secondBox = secondBox + v.print_into_string(t.treatment_combination[0].value));
            thirdClasses.forEach(v =>  thirdbox = thirdbox + v.print_into_string(t.treatment_combination[0].value));
            writer.print_html_on_stage("<pre class=\"target\">" + classes.class_array[0].print_into_string(t.treatment_combination[0].value)+ "</pre>");
            writer.print_html_on_stage(  "<div class=\"parent\">"  +
                "<pre class=\"child\">" + firstBox + "</pre>"
                +"<pre class=\"child\">"+ secondBox + "</pre>"
                +"<pre class=\"child\">"+ thirdbox + "</pre>"
                //+ get_class(classes.targetClass_name, classes.class_array).getSolution().split(" ").join("")
                +"</div>");
        }
        t.expected_answer = get_class(classes.targetClass_name, classes.class_array).getSolution().split(" ").join("");

        // Hier kannst du difficulty anpassen
        // zu jeder studie 3 scheißsätze

        t.accepts_answer_function = (given_answer) => {
            //only active for testing
            //  if (given_answer === "a") {
            //    return true;
            //}
            given_answer = given_answer.split(" ").join("")
            return given_answer === t.expected_answer;
        };


        t.do_print_error_message = (given_answer) => {
            //Experiment Dauer ca. 10 Minuten - Tendenziell meine Dauer eher 5min.
            writer.clear_error();
            try {
                let param0 = translate_string_into_method_call(given_answer);
                let param1 = eval(param0);

            } catch (e) {
                if (t.treatment_combination[0].value === "static") {
                    writer.print_html_on_error(e);
                    return;
                } else {
                    writer.print_html_on_error(e);
                    return;
                }
            }

            //randmittel: A anzeigen lassen
            //RANDMITTEL term 2 C*A Anzeigen lassen, X-AChse C!
            //NUR STATISCH STRUEUNG VERRINGERN, gucken wie weit- Streuung momentan 20 Sekunden- so Hoch wie Mittelwert
            if (t.treatment_combination[0].value === "static") {
                // t.print_task();
                try {
                    if (given_answer.charAt(0) !== t.expected_answer.charAt(0) ) {
                        writer.print_html_on_error("Not the correct target class!");
                    }
                    type_check_constructor_call(translate_string_into_method_call(given_answer), classes.class_array);
                } catch (e) {
                    try {
                        writer.print_html_on_error(e);
                    } catch(e) {
                        writer.print_html_on_error("Fehlende/zu viele Klammern!");
                    }

                }
                // writer.set_focus_on_input();
            } else {
                    let interpreter = new Interpreter(classes.class_array, translate_string_into_method_call(given_answer));
                    try {
                        interpreter.do_interpretation();
                    } catch (e) {
                        if (given_answer.charAt(0) !== t.expected_answer.charAt(0) ) {
                            writer.print_html_on_error("Not the correct target class!");
                        } else {
                        writer.print_html_on_error(e);

                    }


                }
            }
        };

        t.do_print_after_task_information = () => {
            writer.clear_stage();
            if (t.is_training) {
                writer.print_string_on_stage("You are still inside the training phase. If you would like to start the experiment press [Esc] and confirm with [E](capital E!). \n\n")
                writer.print_string_on_stage("If you would like to continue training press [Enter] to see the next task");
            } else {
                writer.print_string_on_stage("Ok, done. Press [Enter] to see the next task");
            }
        }
    }
}};
//

Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);