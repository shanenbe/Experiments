import {Constructor_Call} from "./Constructor_Call.js";

function read_identifier(string_array: string[]) {
    let identifier = [];
    while(string_array.length>0) {
        let this_token = string_array.shift();
        if((this_token>='a' && this_token<='z') || this_token>='A' && this_token<='Z') {
            identifier.push(this_token);
        } else {
            if(identifier.length<=0)
                throw "invalid identifier before " + string_array.join('');
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
            if (rest_params.length==0)
                throw "missing parameters after , <<< " + arr.join("");
            rest_params.forEach(e=>parameters.push(e));
        }
    }

    if(arr.length <= 0)
        throw "missing )";

    return parameters;
}

function read_single_call(arr): Constructor_Call {
    let x = read_constructor_call(arr);
    if(arr.length>0)
        throw "unexpected character " + arr[0];
    return x;
}

function read_constructor_call(arr): Constructor_Call {
    let identifier = read_identifier(arr);
    if (identifier === "null") {
        return new Constructor_Call(null, []);
    }
    let token = arr.shift();
    if(token !== "(")

        throw "missing (" + arr.join("") ;

    let parameters = read_constructor_call_list(arr);
    token = arr.shift();
    if(token !== ")")
        throw "Missing )";
    return new Constructor_Call(identifier, parameters);
}

export function call_string(aString: string): Constructor_Call {
    return read_single_call(aString.split(" ").join("").split(''));
}
