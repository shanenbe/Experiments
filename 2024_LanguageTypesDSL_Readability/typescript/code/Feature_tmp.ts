/*
    write_term_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("class " + "exp_" + (position + 1) + " extends LTerm {\n");
        arr.push("  Type type_of(Environment e) {\n");
        arr.push("      return new Function_Type(" + first_type_in_function + ", " + (first_type_in_function=="BOOL"?"NUMBER":"BOOL") + ");}\n");
        arr.push("  }\n");
        arr.push("}\n");
    }


    write_term_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("class exp_" + (position + 1) + " extends LTerm {\n");
        arr.push("  Type type_of(Environment e) {\n");
        arr.push("    return " + first_type_in_function + ";\n");
        arr.push("  }\n");
        arr.push("}\n");
    }

    write_term_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("class exp_" + (position + 1) + " extends LTerm {\n");
        arr.push("  Type type_of(Environment e) {\n");
        arr.push("    return " + (first_type_in_function=="BOOL"?"NUMBER":"BOOL") + ";\n");
        arr.push("  }\n");
        arr.push("}\n");
    }


    write_terms_types_as_code_into_array_with_first_type(arr, first_type_in_function: string, term_type_ordering: number[]) {
        let writers = [
            (arr) => {this.x.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 0); arr.push("\n");},
            (arr) => {this.y.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 1);; arr.push("\n");},
            (arr) => {this.z.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 2); arr.push("\n");},
        ];

        writers[term_type_ordering[0]](arr);
        writers[term_type_ordering[1]](arr);
        writers[term_type_ordering[2]](arr);

    }

    write_html_terms_types_as_code_into_array_with_first_type(arr, first_type_in_function: string, term_type_ordering: number[]) {
        let writers = [
            (arr) => {this.x.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 0); arr.push("\n");},
            (arr) => {this.y.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 1);; arr.push("\n");},
            (arr) => {this.z.write_term_as_code_into_array_with_first_type(arr, first_type_in_function, 2); arr.push("\n");},
        ];

        arr.push("<table style='border: 1px solid black;'>");
        arr.push("<tr style=\"vertical-align:top\">");
        arr.push("<td style='border: 1px solid black;'>");

                        // arr.push("<td colspan='2' style='border: 1px solid black;'>");

        writers[term_type_ordering[0]](arr);
        arr.push("</td>");

        arr.push("<td style='border: 1px solid black;'>");
        writers[term_type_ordering[1]](arr);
        arr.push("</td>");

        arr.push("<td style='border: 1px solid black;'>");
        writers[term_type_ordering[2]](arr);
        arr.push("</td>");
        arr.push("</tr>\n");
        arr.push("</table>")
    }


    compare(rule: Rule): number {
        return -1;
    }

    write_type_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("E |- t" + (position + 1) + ": Tr -> Ts");
    }

    write_type_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("    FunctionType ft = t" + (position + 1) + ".type_of(e)");
    }

    write_term_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("exp_" + (position + 1) + ": " + first_type_in_function + " -> " + (first_type_in_function=="BOOL"?"NUMBER":"BOOL"));
    }

    same_type_as(x) {
        return x instanceof Function_Rule;
    }

    write_term_into_array_with_first_type(arr, first_type_in_function: string, position:number) {throw "not yet implemented";}

    write_term_as_code_into_array_with_first_type(arr, first_type_in_function: string, position:number) {throw "not yet implemented";}

    write_type_into_array_with_first_type(arr, first_type_in_function: string, number: number) {throw "not yet implemented";}

    write_type_as_code_into_array_with_first_type(arr, first_type_in_function: string, number: number) {throw "not yet implemented";}


    compare(rule: Rule): number {
        return (rule instanceof Function_Rule)? 1: 0;
    }

    write_lambda_type_rule_into_stream(arr, position) {
        arr.push("E |- t" + (position + 1) + ": Tr");
    }

    write_term_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("exp_" + (position + 1) + ": " + first_type_in_function);
    }



    write_type_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("E |- t" + (position + 1) + ": Tr");
    }

    write_type_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("    Type Tr = t" + (position + 1) + ".type_of(e)");
    }

    same_type_as(x) {
        return x instanceof Left_Rule;
    }


    compare(rule: Rule): number {
        return 1;
    }

    write_term_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("exp_" + (position + 1) + ": " + (first_type_in_function=="BOOL"?"NUMBER":"BOOL"));
    }

    write_type_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("E |- t" + (position + 1) + ": Ts");
    }

    write_type_as_code_into_array_with_first_type(arr, first_type_in_function: string, position: number) {
        arr.push("    Type Ts = t" + (position + 1) + ".type_of(e)");
    }


    same_type_as(x) {
        return x instanceof Right_Rule;
    }

        init_inner_rules() {
        let this_rules = this.ordered_rules();
        (this_rules[1] as Inner_Rule).ref_function_rule = this_rules[0] as Function_Rule;
        (this_rules[2] as Inner_Rule).ref_function_rule = this_rules[0] as Function_Rule;
    }

    real_rules():Rules {
        let r = new Rules(null, null, null);
        r.x = (this.x)();
        r.y = (this.y)();
        r.z = (this.z)();
        return r;
    }


ordered_rules() {
    return [this.x, this.y, this.z].
    sort((a, b)=> (a instanceof Function_Rule)? -1
        : (a instanceof Right_Rule)? 1
            :(b instanceof Function_Rule)?1         // left is left_rule
                :-1);
}

write_terms_types_into_array_with_first_type(arr, first_type_in_function: string, term_type_ordering: number[]) {
    let writers = [
        () => {this.x.write_term_into_array_with_first_type(arr, first_type_in_function, 0); arr.push("\n");},
        () => {this.y.write_term_into_array_with_first_type(arr, first_type_in_function, 1);; arr.push("\n");},
        () => {this.z.write_term_into_array_with_first_type(arr, first_type_in_function, 2); arr.push("\n");},
    ];

    writers[term_type_ordering[0]]();
    writers[term_type_ordering[1]]();
    writers[term_type_ordering[2]]();

}


write_type_into_array_with_first_type(arr, first_type_in_function: string) {
    arr.push(" ".repeat(12));
    this.x.write_type_into_array_with_first_type(arr, first_type_in_function, 0);
    arr.push("   ");
    this.y.write_type_into_array_with_first_type(arr, first_type_in_function, 1);
    arr.push("   ");
    this.z.write_type_into_array_with_first_type(arr, first_type_in_function, 2);
    arr.push("\n");
    arr.push("T_feature: ================================================\n");
    arr.push(" ".repeat(22));
    arr.push("E|- feature(t1 t2 t3): BOOL\n");
}

write_type_as_code_into_array_with_first_type(arr, first_type_in_function: string) {
    arr.push("class feature extends LTerm {\n\n");
    arr.push("  LTerm t1, t2, t3;\n\n");
    arr.push("  Type type_of(Environment e) {\n");
    this.x.write_type_as_code_into_array_with_first_type(arr, first_type_in_function, 0); arr.push("\n");
    this.y.write_type_as_code_into_array_with_first_type(arr, first_type_in_function, 1); arr.push("\n");
    this.z.write_type_as_code_into_array_with_first_type(arr, first_type_in_function, 2); arr.push("\n");
    // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    arr.push("    if(ft.left.equals(tl) && ft.right.equals(tr);\n");
    arr.push("      return BOOL;\n");
    arr.push("    throw new RuntimeException(\"Invalid Type;\");\n");
    arr.push("  }\n\n");
    arr.push("}\n");
}



*/