import {call_string} from "../code/Parser.js";

export function test_parser(debug:boolean = false) {
    function is_true(exp, aString = "") {
        if (!exp) {
            console.error("ERROR: " + aString);
            throw "Wrong: " + aString;
        }
        if (debug) {
            console.log("Ok: " + aString);
        }
    }

    function test_error(parse_string: string, error_string:string, debug_string: string="") {
        try {
            call_string(parse_string);
        } catch (ex) {
            if(ex == error_string) {
                if (debug) {
                    console.log("Ok: " + debug_string);
                    return;
                }
            } else {
                throw "Wrong: " + debug_string + " >>> " + ex + " expected " + error_string;
            }
        }
        throw "Wrong: " + debug_string + " >>> " + " expected " + error_string;
    }



    is_true(call_string("A(B())").parameters[0].class_name==="B", "class name inner 01");
    is_true(call_string("A()").class_name=="A", "class name 01");
    is_true(call_string(" A ( ) ").class_name=="A", "class name 01a");
    is_true(call_string("A()").parameters.length==0, "class name 02");
    is_true(call_string("A(B())").parameters.length==1, "class name 02");

    test_error("A(,A())", "invalid identifier before A())", "missing param");
    test_error("A", "missing (", "missing ( 02");
    test_error("A($(),)", "invalid identifier before (),)", "invalid identifier 01");
    test_error("A($x(),)", "invalid identifier before x(),)", "invalid identifier 02");
    test_error("A(A(),)", "missing parameters after , <<< )", "missing parameters 01");
    test_error("A(A)", "missing (", "missing ( 01");
    test_error("A(", "missing )", "missing ) 01");
    test_error("A(x", "missing (", "missing ) 02");
    test_error("A)", "missing (", "missing ( 01");
    test_error("A()x", "unexpected character x", "unexpected x");

}
