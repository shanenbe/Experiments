import {Class_Definition} from "./Class_Definition.js";
import {Constructor_Call} from "./Constructor_Call.js";

export class Classes {

    class_definitions: Class_Definition[];

    constructor(class_definitions: Class_Definition[]) {
        this.class_definitions = class_definitions;
    }

    type_check(constructor_call:Constructor_Call) {

        let this_class:Class_Definition = this.get_class_named(constructor_call.class_name);

        let static_types_in_call = [];
        for(let p_type of constructor_call.parameters) {
            this.type_check(p_type);
            static_types_in_call.push(p_type.class_name);
        }

        if(static_types_in_call.length != this_class.parameter_type_names.length)
            throw "invalid number of parameters: " + this_class.class_name + " expects " + this_class.parameter_names.length + " but got " + static_types_in_call.length;

        for(let position = 0; position < this_class.parameter_type_names.length; position++) {
            if (this_class.parameter_type_names[position] !== static_types_in_call[position]) {
                throw "invalid type in call. Expected " + this_class.type_signature_string() + " but got " + this_class.class_name + "(" + static_types_in_call.join(", ") + ")";
            }
        }
    }

    execute(constructor_call:Constructor_Call) {
        let this_class:Class_Definition = this.get_class_named(constructor_call.class_name);

        let dynamic_types_in_call = [];
        for(let p_type of constructor_call.parameters) {
            this.execute(p_type);
            dynamic_types_in_call.push(p_type.class_name);
        }

        if(dynamic_types_in_call.length != this_class.parameter_type_names.length)
            throw "invalid number of parameters: " + this_class.class_name + " expects " + this_class.parameter_names.length + " but got " + dynamic_types_in_call.length;

        for(let position = 0; position < this_class.parameter_type_names.length; position++) {
            let param_type = this.get_class_named(this_class.parameter_type_names[position]);
            if (this_class.parameter_type_names[position] !== dynamic_types_in_call[position]) {
                throw "unknown method: " + param_type.method_name
                + " in object of class " + dynamic_types_in_call[position]
                + "\n==>" + this_class.parameter_names[position] + "." + param_type.method_name + "();"
                + "\n==>" + this_class.class_name + "(" + this_class.parameter_names.join(", ") + "){...}";
            }
        }
    }

    get_class_named(class_name:string) {
        for(let c of this.class_definitions) {
            if(c.class_name===class_name) {
                return c;
            }
        }
        throw "no such class named: " + class_name;
    }

    get_classes_named(names: string[]) {
        let ret = [];
        names.forEach(n=>ret.push(this.get_class_named(n)));
        return ret;
    }

    number_of_classes() {
        return this.class_definitions.length;
    }
}