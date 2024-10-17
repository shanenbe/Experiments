import {Class_Definition} from "./Class_Definition.js";
import {Classes} from "./Classes.js";

export class Constructor_Call {
    class_name;
    parameters:Constructor_Call[];

    constructor(className:string, parameters:Constructor_Call[]) {
        this.parameters = parameters;
        this.class_name = className;
    }

    generate_classes(classes:Classes, class_names:string[], method_names: string[]): Class_Definition {
        let this_class = new Class_Definition(class_names.shift(), [], method_names.shift());
        classes.class_definitions.push(this_class);

        for(let p of this.parameters) {
            let that_class = p.generate_classes(classes, class_names, method_names);
            this_class.parameter_type_names.push(that_class.class_name);
        }

        this_class.generate_parameter_names();
        return this_class;
    }

    generate_all_classes() {

    }
}