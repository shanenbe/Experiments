export class Constructor_Call {
    class_name:string;
    parameters:Constructor_Call[];

    constructor(className:string, parameters:Constructor_Call[]) {
        this.parameters = parameters;
        this.class_name = className;
    }

    call_string():string {
        let arr = [];
        arr.push(this.class_name + "(");
        arr.push(this.parameters.map( e=> e.call_string()).join(", "));
        arr.push(")");
        return arr.join("");
    }



    equals(constructorCall: Constructor_Call) {
        if(!(constructorCall instanceof Constructor_Call)) {
            return false;
        } else {
            if(this.class_name!==constructorCall.class_name)
                return false;
            else {
                if(this.parameters.length !== constructorCall.parameters.length)
                    return false;
            }
        }
        return true;
    }
}