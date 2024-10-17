import {Class_Definition} from "../code/Class_Definition.js";
import {Constructor_Call} from "../code/Constructor_Call.js";
import {Classes} from "../code/Classes.js";
import {call_string} from "../code/Parser.js";

export function test_classes(debug:boolean = false) {

    function is_true(exp, aString = "") {
        if (!exp) {
            console.error("ERROR: " + aString);
            throw "Wrong: " + aString;
        }
        if (debug) {
            console.log("Ok: " + aString);
        }
    }

    function cd(name: string, type_names:string[], method_name:string) {
        let parameter_names: string[] = [];

        for(let c = 1; c <= type_names.length; c++) {
            parameter_names.push("p" + c);
        }

        return new Class_Definition(name, parameter_names, type_names, method_name);
    }

    function execute_ok(class_definitions: Class_Definition[], constructor_call:Constructor_Call, test_name) {
        try {
            let cds = new Classes(class_definitions);
            cds.execute(constructor_call);

        } catch (ex) {
            console.error("ERROR: " + test_name);
            throw "Wrong: " + ex;
        }
        if (debug) {console.log("Ok: " + test_name);}
    }

    function type_ok(class_definitions: Class_Definition[], constructor_call:Constructor_Call, test_name) {
        try {
            let cds = new Classes(class_definitions);
            cds.type_check(constructor_call);

        } catch (ex) {
            console.error("ERROR: " + test_name);
            throw "Wrong: " + ex;
        }
        if (debug) {console.log("Ok: " + test_name);}
    }

    function execute_error(class_definitions: Class_Definition[], constructor_call:Constructor_Call, error_string, test_name) {
        let cds = new Classes(class_definitions);
        try {
            cds.execute(constructor_call);
        } catch (ex) {
            if(ex !== error_string)
                throw test_name + " >>>>" + ex;
            else {
                if (debug) {console.log("Ok: " + test_name);} return;
            }
        }
        throw test_name + " expected " + error_string;
    }

    function type_error(class_definitions: Class_Definition[], constructor_call:Constructor_Call, error_string, test_name) {
        let cds = new Classes(class_definitions);
        try {
            cds.type_check(constructor_call);
        } catch (ex) {
            if(ex !== error_string)
                throw test_name + " >>>>" + ex;
            else {
                if (debug) {console.log("Ok: " + test_name);} return;
            }
        }
        throw test_name + " expected " + error_string;
    }

    execute_ok(
        [cd("A", ["B"], "ma"), cd("B", ["C", "D"], "mb"), cd("C", [], "mc"), cd("D", [], "md"), cd("E", [], "me")],
        call_string("A(B(C(), D()))"),
        "valid call");

    console.log("here");
    let cds = [cd("A", ["B"], "ma"), cd("B", ["C", "D"], "mb"), cd("C", [], "mc"), cd("D", [], "md"), cd("E", [], "me")];
    let c = call_string("A(B(C(), E()))");
    execute_error(
        cds, c,
        "unknown method: md in object of class E\n==>p2.md();\n==>B(p1, p2){...}", "execute error - wrong parameter called 02");


    execute_error(
    [
                          cd("A", ["B"], "ma"),      cd("B", ["C"], "mb"),
                          cd("C", [], "mc"),         cd("D", [], "md")
                  ],
        call_string("A(B(D()))"),
        "unknown method: mc in object of class D\n==>p1.mc();\n==>B(p1){...}", "execute error - wrong parameter called 02");


    execute_error(
        [cd("A", ["B"], "ma"), cd("B", [], "mb"), cd("C", [], "mc")], call_string("A(C())"),
        "unknown method: mb in object of class C\n==>p1.mb();\n==>A(p1){...}", "execute error - wrong parameter called 01");

    execute_error(
        [cd("A", ["B"], "ma"), cd("B", [], "mb"), , cd("C", [], "mc")], call_string("A()"),
        "invalid number of parameters: A expects 1 but got 0", "execute error - num params");

    execute_ok(
        [cd("A", [], "ma")], call_string("A()"),
        "execute ok - trivial");

    type_error(
        [cd("X", [], "ma")], call_string("A(B(C()))"),
        "no such class named: A", "type error - wrong class name");

    type_error(
        [cd("X", [], "ma")], call_string("A(B())"),
        "no such class named: A", "type error - wrong class name");


    type_ok(
        [cd("A", ["B", "C"], "ma"), cd("B", [], "mb"), cd("C", [], "mc"), cd("D", [], "mc") ], call_string("A(B(), C())"),"type ok - inner thing");

    type_ok(
        [cd("A", ["B"], "ma"), cd("B", ["C"], "mb"), cd("C", [], "mc"), cd("D", [], "mc") ], call_string("A(B(C()))"),"type ok - inner thing");

    type_ok(
        [cd("A", [], "ma")], call_string("A()"),"type 01");


    type_error(
        [cd("A", ["B", "C"], "ma"), cd("B", [], "mb"), cd("C", [], "mc"), cd("D", [], "mc") ], call_string("A(B(), D())"),
        "invalid type in call. Expected A(B, C) but got A(B, D)", "type error - wrong types 02");


    type_error(
        [cd("A", ["B"], "ma"), cd("B", ["C"], "mb"), cd("C", [], "mc"), cd("D", [], "mc") ], call_string("A(B(D()))"),
        "invalid type in call. Expected B(C) but got B(D)", "type error - wrong types 02");

    type_error(
        [cd("A", ["B"], "ma"), cd("B", [], "mb"), cd("C", [], "mc") ], call_string("A(C())"),
        "invalid type in call. Expected A(B) but got A(C)", "type error - wrong types");

    type_error(
        [cd("A", ["B"], "ma")], call_string("A()"),
        "invalid number of parameters: A expects 1 but got 0", "ex1");

}
