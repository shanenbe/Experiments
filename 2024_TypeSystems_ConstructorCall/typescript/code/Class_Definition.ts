import {Classes} from "./Classes.js";

export class Class_Definition {
    class_name:string;
    parameter_names: string[] = [];
    parameter_type_names: string[];
    method_name:string;

    constructor(class_name: string, parameter_type_names: string[], method_name: string) {
        this.class_name = class_name;
        this.parameter_type_names = parameter_type_names;
        this.method_name = method_name;
        this.generate_parameter_names();
    }

    type_signature_string() {
        return this.class_name + "(" + this.parameter_type_names.join(", ") + ")";
    }

    generate_parameter_names() {
        let counter = 1;
        for(let pt of this.parameter_type_names) {
            this.parameter_names.push("p" + (counter++))
        }
    }

    print_into_array(out: string[], classes: Classes, typed: boolean) {


        let optional_line_break = (this.parameter_names.length>0)?"\n":"";

        let constructor_params = [];
        for(let param_counter = 0; param_counter < this.parameter_names.length; param_counter++) {
            constructor_params.push((typed?this.parameter_type_names[param_counter] + " ":"") + this.parameter_names[param_counter]);
        }

        out.push("class " + this.class_name + " {\n");
        out.push("  " + this.class_name + "(" + constructor_params.join(", ") + ") {" + optional_line_break);

        let counter = 0;
        for(let param of this.parameter_names) {
            let clazz = classes.get_class_named(this.parameter_type_names[counter]);
            out.push("    " + param + "." + clazz.method_name + "();\n");
            counter++;
        }

        out.push("  }\n");

        out.push("  " + this.method_name + "() {}\n");

        out.push("}\n");
    }
}
