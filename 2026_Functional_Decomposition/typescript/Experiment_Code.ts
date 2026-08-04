import {Experiment_Output_Writer} from "./Nof1/modules/Experimentation/Experimentation.js";
import {Task} from "./Nof1/modules/Experimentation/Task.js";

class Function_Generator {
    style: number;
    difficulty: number;
    result: number;
}




export function configure_task(writer: Experiment_Output_Writer) {
    return (t:Task):void => {

        let style = t.treatment_index_value("Style");
        let level = t.treatment_index_value("Difficulty");


        console.log("hallo");
    }
}
