import {Constructor_Call} from "./Constructor_Call.js";

// export class Tree {
//     content;
//     children:Tree[] = [];
//
//     constructor(content, children) {
//         this.children = [];
//         this.content = content;
//         this.children = children;
//     }
//     clone() {
//         let child_clones = [];
//         for (let child of this.children) {
//             child_clones.push(child.clone());
//         }
//         return new Tree(this.content, child_clones);
//     }
//
//     number_of_nodes():number {
//
//         let number = 1
//
//         for(let c of this.children) {
//             number += c.number_of_nodes();
//         }
//
//         return number;
//     }
//
//     // L(Q(),M(V(J())),R(),Z()) -
//     depth():number {
//         if (this.children.length==0)
//             return 0;
//
//         let d = 1;
//
//         for(let c of this.children) {
//             let child_depth = c.depth();
//             if(child_depth + 1 >d)
//                 d = child_depth + 1;
//         }
//         return d;
//     }
//
//     // L(Q(),M(V(J())),R(),Z()) -
//     readability():number {
//         if (this.children.length==0)
//             return 1;
//         else {
//             let read = 1;
//             for(let c of this.children) {
//                 read += c.readability();
//             }
//             let tree_string = this.tree_string();
//             let d = this.depth();
//             let r = read + d;
//             return r;
//         }
//     }
//
//     tree_string() {
//         let child_string = [];
//         for(let c of this.children) {
//             child_string.push(c.tree_string());
//         }
//         return this.content + "{" + child_string.join(", ") + "}";
//     }
//
//     as_constructor_call():Constructor_Call {
//         let ret = new Constructor_Call(this.content, []);
//
//         this.children.forEach(v => ret.parameters.push(v.as_constructor_call()));
//
//         return ret;
//     }
//
//     preorder(f):void {
//         f(this);
//         for (let t of this.children) {
//             t.preorder(f);
//         }
//     }
//
//     postorder(f):void {
//         for (let t of this.children) {
//             t.preorder(f);
//         }
//         f(this);
//     }
//
// }