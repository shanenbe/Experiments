import {Classes} from "./Classes.js";
import {do_random_array_sort} from "../../../N-of-1-Experimentation/modules/Experimentation/Experimentation.js";

export class Class_Definition {
    class_name:string;
    parameter_names: string[] = [];
    parameter_type_names: string[];

    parameter_ordering:number[] = [];

    method_name:string;

    constructor(class_name: string, parameter_names:string[], type_names: string[], method_name: string) {
        this.class_name = class_name;
        this.parameter_type_names = type_names;
        this.method_name = method_name;
        this.parameter_names = parameter_names;

        let counter = 0;
        parameter_names.forEach(e => this.parameter_ordering.push(counter++));
        this.parameter_ordering = do_random_array_sort(this.parameter_ordering);

    }

    type_signature_string() {
        return this.class_name + "(" + this.parameter_type_names.join(", ") + ")";
    }

    print_html_into_array(out: string[], classes: Classes, typed: boolean) {


        let optional_line_break = (this.parameter_names.length>0)?"<br/>":"";

        let constructor_params = [];

        for(let param_counter = 0; param_counter < this.parameter_names.length; param_counter++) {
            constructor_params.push((typed?this.parameter_type_names[param_counter] + " ":"") + this.parameter_names[param_counter]);
        }

        out.push("class " + this.class_name + " {<br/><br/>");
        out.push("&nbsp;&nbsp;" + this.class_name + "(" + constructor_params.join(",&nbsp;") + ") {" + optional_line_break);

        for(let param of this.parameter_ordering) {
            let clazz = classes.get_class_named(this.parameter_type_names[param]);
            out.push("&nbsp;&nbsp;&nbsp;&nbsp;" + this.parameter_names[param] + "." + clazz.method_name + "();<br/>");
        }
        //
        //
        // for(let param of this.parameter_names) {
        //     let clazz = classes.get_class_named(this.parameter_type_names[counter]);
        //     out.push("&nbsp;&nbsp;&nbsp;&nbsp;" + param + "." + clazz.method_name + "();<br/>");
        //     counter++;
        // }

        out.push("&nbsp;&nbsp;}&nbsp;&nbsp;&nbsp;<br/><br/>");

        out.push("&nbsp;&nbsp;" + this.method_name + "() {}&nbsp;&nbsp;&nbsp;<br/><br/>");

        out.push("}");
    }
}
