import {Words} from "./Nof1/modules/Words/Words.js";
import {iterate} from "./Nof1/modules/utils/loops/loop.js";
import {for_all} from "./Nof1/modules/utils/Loops.js";

export abstract class Term {

    abstract result(): number;

    abstract print_string(): string;
    abstract to_string(): string;

    abstract natural_word_string(): string;

    abstract number_of_operations(): number;

    abstract to_html_string(with_link: boolean): string;

}



export abstract class Expression extends Term {}



export abstract class Literal<ValueType>
                      extends Expression {      value: ValueType;

    constructor(value: ValueType) {
        super();
        this.value = value;
    }


    to_html_string(with_link: boolean): string {
        return String(this.value);
    }


    number_of_operations(): number {
        return 0;
    }

    to_string(): string {
        return String(this.value);
    }

    print_string(): string {
        return String(this.value);
    }

}



export class Scalar extends Literal<number> {

    constructor(integer: number) {
        super(integer);
        this.value = integer;
    }


    natural_word_string(): string {
        return Words.digit_as_word(this.value);
    }


    result(): number {
        return this.value;
    }

}



export class Variable
               extends Literal<string> {

    natural_word_string(): string {
        return this.value;
    }


    number_of_operations(): number {
        return 0;
    }


    print_string(): string {
        return "";
    }


    result(): number {
        throw "Variables do not have a result";
    }

}

export
class Procedure_Call
        extends Expression {    procedure_name: string;

    constructor(    procedure_name: string    )
    {   super();
        this.procedure_name = procedure_name;
    }


    to_html_string (    with_link: boolean    )
            : string                            {   if (with_link)
                                                        return '<a href="#procedure_' + this.procedure_name +
                                                               '">' + this.procedure_name + "()" + '</a>';
                                                    else
                                                        return this.procedure_name + "()";
                                                }


    to_string()
            : string                            {    return this.procedure_name + "()";     }


    natural_word_string()
            : string                            {    throw "dunno";    }

    number_of_operations()
            : number                            {    throw "dunno";    }

    print_string(): string {
        throw "dunno";    }

    result(): number {
                   throw "dunno";
    }

}

export
abstract class Operation
               extends Expression {    left: Term;
                                       right: Term

               constructor(    left: Term,
                               right: Term     )
               {
                    super();
                    this.left = left;
                    this.right = right;
               }

    print_string() {
        return [    this.left.print_string(),
                    this.operator_string(),
                    this.right.print_string()   ]
               .join(" "  );
    }

    abstract operator_string(): string;

    generate_assignments(variable_pool: string[], assignments: Statement[]) {

        if (this.left instanceof Operation)
            this.left.generate_assignments(variable_pool, assignments);


        let first_variable = variable_pool.shift();
        assignments.push(  new Assignment(     first_variable,
                                               this.left as Scalar        )
                        );
        this.left = new Variable(first_variable);
        // assignments.push(   new Assignment(variable_pool.shift(), this))
        // return;

        if (variable_pool.length == 0) {
            assignments.push(new Return(this));
            return;
        }



    }

    number_of_operations(): number {
        return 1 + this.left.number_of_operations() + this.right.number_of_operations();
    }

    to_html_string(with_link: boolean): string {
        return this.left.to_html_string(with_link)
                    + " "
                    +  this.operator_string()
                    + " "
                    + this.right.to_html_string(with_link);
    }
}

export class Addition extends Operation {

    to_string(): string {
        return this.left.to_string() + " + " + this.right.to_string()
    }

    natural_word_string(): string {
        return this.left.natural_word_string() + " plus " + this.right.natural_word_string();
    }

    constructor(left: Term, right: Term) {
        super(left, right);
    }

    result(): number {
        return this.left.result() + this.right.result();
    }

    operator_string(): string {
        return "+";
    }


}

export class Subtraction extends Operation {
    to_string(): string {
        return this.left.to_string() + " - " + this.right.to_string()
    }
    constructor(left: Term, right: Term) {
        super(left, right);
    }

    result(): number {
        return this.left.result() - this.right.result();
    }

    operator_string(): string {
        return "-";
    }

    natural_word_string(): string {
        return this.left.natural_word_string() + " minus " + this.right.natural_word_string();
    }
}

export abstract class Statement {
    abstract write_to_stream(stream: string[]);

    abstract to_html_string(with_link: boolean)
             : string;
}

export class Assignment
             extends Statement   {      varName         :       string;
                                        term: Term;

    constructor(    varName         : string,
                    term            : Expression     )
                {
                    super();
                    this.varName = varName;
                    this.term = term;
                }

    to_html_string(with_link: boolean  )
    : string                          {
                                        return       "&nbsp;".repeat(4)
                                                        + "let " + this.varName
                                                        + " = " + this.term.to_html_string(with_link) + ";<br>\n";
                                      }

    write_to_stream(    stream: string[]    )
                    {

                        let ret = "  let " + this.varName + " = " + this.term.to_string() + ";";

                        stream.push( ret);
                    }
    }

export class Return
             extends Statement {            term: Term;

    to_html_string(     with_link: boolean   )
    : string                                 {
                                             return "&nbsp;".repeat(4)
                                                    + "return "
                                                    + this.term.to_html_string(with_link)
                                                    + ";<br>\n";
                                             }

    constructor(    term: Term  )
                                {
                                super();
                                this.term = term;
                                }


    to_string(                  )
      :string                   {
                                let ret = "  return " + this.term.to_string() + ";";
                                return ret;
                                }


    write_to_stream(    stream: string[]    )
              :void                         {
                                            stream.push( this.to_string() );
                                            }
}


export class Procedure {    name: string;
                            body: Statement[]

    constructor(    name: string,
                    body: Statement[]   ) {
                                          this.name = name;
                                          this.body = body;
                                          }

    write_to_stream(    stream: string[]    )
    {
        stream.push("function " + this.name + "() {");

        iterate(this.body).do(statement => statement.write_to_stream(stream));

        stream.push("}");
    }


    to_string() {
        let stream = [];
        this.write_to_stream(stream);
        return stream.join("\n");
    }

    loc() {
        return 2 + this.body.length;
    }

    to_html_string(   with_link    : boolean  = false  )
      : string                                         {
                                                            let ret = '<div id="procedure_' + this.name + '">'
                                                                               +  "function " + this.name + "() {<br>\n";

                                                            for_all( this.body,
                                                                  ( s: Statement ) => {
                                                                        let next_line =  s.to_html_string(with_link)
                                                                        // console.log(next_line);
                                                                        ret += next_line;
                                                                  })

                                                            ret += "}<br>\n</div>\n";
                                                            return ret;
    }
}

export class Procedures {       main            : Procedure    ;
                                target          : Procedure    ;
                                all_except_main : Procedure[]  ;

    constructor(    main: Procedure,
                    target: Procedure,
                    all_except_main: Procedure[]    )
    {
        this.main = main;
        this.target = target;
        this.all_except_main = all_except_main;
    }

    log() {
        console.log(this.main.to_string());
        iterate(this.all_except_main).do(p => console.log(p.to_string()));
        console.log("LOC: " + this.loc());
    }

    log_html() {
        console.log(this.to_html_string(false));
    }

    loc(): number {
        let loc: number  = this.main.loc();

        for_all(this.all_except_main,
               (p: Procedure        ): number => loc = loc + p.loc()
        );

        return loc;
    }

    to_html_string(with_link: boolean ) {
        let ret = this.main.to_html_string(with_link);
        for_all(this.all_except_main, p => ret += p.to_html_string(with_link));
        return ret;
    }
}