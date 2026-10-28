export function intro_pages(): string[] {

    return ["<p>Thank you very much for participating. The pure experimentation time for the given experiment should be less than 12 minutes.</p>"

            ,

            "<p>Before we start, please run your browser in full-screen-mode (probably by pressing [F11]).</p>" +
            "<p>Please, make sure that the following rectangle can be completely seen on your screen without much space on the right and bottom. Depending on the browser and the machine, this can be done by pressing [Ctrl] and [+] or [-]. </p>" +
            "<code>" +
            "*".repeat(130)+"<br>" +
            ("*" + "&nbsp".repeat(128)+"*<br>").repeat(22) +
            "*".repeat(130)+
            "</code>"

            ,


            "<p>You will be shown a number of programs.<br>" +
            "Your task is to determine the result of the main function (which is always a number between 0 and 9).<br>" +
            "You enter the result by pressing the corresponding key.</p>" +
            "<p>The main procedure could be:</p>" +

            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;let tree = 4;<br>" +
            "&nbsp;&nbsp;let root = tree - 3;<br>" +
            "&nbsp;&nbsp;return root + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<p>The result of the given program is 3 (i.e., you have to press [3] in this situation).</p>" +
            "<p>The kind of computations is always the same. In the first line, a number is assigned to a variable. The next assigns the value of the previous variable plus/minus a number to a new variable. " +
            "The last statement is a return that uses the previous variable plus/minus a number. In each step, the number will always be between 0 and 9.</p>" +
            "<p>Sometimes a function just returns a number without any computation. This could, for example, be:</p>" +
            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;return 5;<br>" +
            "}<br>" +
            "</div>"
            ,


            "<p>Sometimes the main function returns the result of a procedure call.<br>" +
                "The name of the procedure either does express what the result of the procedure is, or it does not.<br>" +
            "<p>For example, the following function calls a procedure called _3, which returns the number 3. <b>In such situation, you can really trust that the result of the procedure is 3.</b></p>" +

            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;return _3();<br>" +
            "}<br>" +
            "function _3() {<br>" +
            "&nbsp;&nbsp;let tree = 4;<br>" +
            "&nbsp;&nbsp;let root = tree - 3;<br>" +
            "&nbsp;&nbsp;return root + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<p>The result of the given program is 3.</p>  <p><b>In really no situation the procedure name, which tells you the result, lies to you. Really.</b></p>"

            ,

            "<p>Sometimes the procedure name is not directly the value, but a small computation in natural language.</p>" +
            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;return five_minus_four_plus_two();<br>" +
            "}<br>" +
            "function five_minus_four_plus_two() {<br>" +
            "&nbsp;&nbsp;let tree = 4;<br>" +
            "&nbsp;&nbsp;let root = tree + 2;<br>" +
            "&nbsp;&nbsp;let hood = root - 1;<br>" +
            "&nbsp;&nbsp;let pen = hood + 3;<br>" +
            "&nbsp;&nbsp;let dog = pen - 7;<br>" +
            "&nbsp;&nbsp;return pen + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<p>The result of the given program is 3 (because the result of five minus four plus two is three).<br>" +
            "<b>Again, in no situation the procedure name, which tells you the result, lies to you.</b></p>" +
            "<p>It is ok, that the computation in the procedure differs from the computation what the name tells you. The result is still the same.</p>"

        ,

            "<p>Sometimes the procedure name is just a random sequence of letters.</p>" +
            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;return khdJKEk();<br>" +
            "}<br>" +
            "function khdJKEk() {<br>" +
            "&nbsp;&nbsp;let tree = 4;<br>" +
            "&nbsp;&nbsp;let root = tree - 3;<br>" +
            "&nbsp;&nbsp;return root + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<p>In such situation, you must read the code of function khdJKEk() to determine the result.</p>",


            "<p>Sometimes the procedure call is a link that guides you to the target procedure (note: you will be shown programs<br>" +
            "that have many functions). By clicking on the link, you will be directed to the target function (which <br>" +
            "can also be done via the keyboard).<br>" +

            "<div class='sourcecode'>" +
            "main() {<br>" +
            "&nbsp;&nbsp;return <a href='#target'>asdasdDASD();</a><br>" +
            "}<br>" +
            "<div>" +
            "function train() {<br>" +
            "&nbsp;&nbsp;let tree = 4;<br>" +
            "&nbsp;&nbsp;let root = tree - 3;<br>" +
            "&nbsp;&nbsp;let cup = root + 1;<br>" +
            "&nbsp;&nbsp;return cup + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function tree() {<br>" +
            "&nbsp;&nbsp;let milk = 4;<br>" +
            "&nbsp;&nbsp;let spoon = milk + 2;<br>" +
            "&nbsp;&nbsp;let stairs = spoon - 5;<br>" +
            "&nbsp;&nbsp;return stairs + 1;<br>" +
            "}<br>" +
            "<div>" +
            "function building() {<br>" +
            "&nbsp;&nbsp;return 6;<br>" +
            "}<br>" +
            "<div>" +
            "function roof() {<br>" +
            "&nbsp;&nbsp;let baggage = 9;<br>" +
            "&nbsp;&nbsp;let glass = baggage - 8;<br>" +
            "&nbsp;&nbsp;return glass + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function dummy()() {<br>" +
            "&nbsp;&nbsp;let truck = 8;<br>" +
            "&nbsp;&nbsp;let color = truck - 2;<br>" +
            "&nbsp;&nbsp;let poison = color - 1;<br>" +
            "&nbsp;&nbsp;return poison + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function table() {<br>" +
            "&nbsp;&nbsp;let disc = 4;<br>" +
            "&nbsp;&nbsp;let cable = disk - 3;<br>" +
            "&nbsp;&nbsp;return cable + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function song() {<br>" +
            "&nbsp;&nbsp;let lyrics = 1;<br>" +
            "&nbsp;&nbsp;let couch = lyrics + 5;<br>" +
            "&nbsp;&nbsp;let program = couch + 2;<br>" +
            "&nbsp;&nbsp;return program + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function cupboard() {<br>" +
            "&nbsp;&nbsp;let baggage = 9;<br>" +
            "&nbsp;&nbsp;let glass = baggage - 8;<br>" +
            "&nbsp;&nbsp;return glass + 2;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function doll()() {<br>" +
            "&nbsp;&nbsp;let truck = 8;<br>" +
            "&nbsp;&nbsp;let color = truck - 2;<br>" +
            "&nbsp;&nbsp;let poison = color - 1;<br>" +
            "&nbsp;&nbsp;return poison + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function height() {<br>" +
            "&nbsp;&nbsp;let disc = 4;<br>" +
            "&nbsp;&nbsp;let cable = disk - 3;<br>" +
            "&nbsp;&nbsp;return cable + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div>" +
            "function flower() {<br>" +
            "&nbsp;&nbsp;let lyrics = 1;<br>" +
            "&nbsp;&nbsp;let couch = lyrics + 5;<br>" +
            "&nbsp;&nbsp;let program = couch + 2;<br>" +
            "&nbsp;&nbsp;return program + 1;<br>" +
            "}<br>" +
            "</div>" +
            "<div class='sourcecode' id='target'>function asdasdDASD(){<br>" +
            "&nbsp;&nbsp;let tree = 9;<br>" +
            "&nbsp;&nbsp;let root = tree - 3;<br>" +
            "&nbsp;&nbsp;return root + 2;<br>" +
            "</div>" +

            "}<br>" +
            "function carpet() {<br>" +
            "&nbsp;&nbsp;let hurricane = 1;<br>" +
            "&nbsp;&nbsp;let water = hurricane + 5;<br>" +
            "&nbsp;&nbsp;return water - 3;<br>" +
            "}<br>" +
            "<div>" +

            "<p>The result of the given program is 8.</p>"


            ,


            "<p>In case no such link is given, you are free to decide how to find the target procedure.</p> " +
            "<p>Maybe you will use the browser search function, maybe you scroll until you find the target. It is really up to you.</p>" +
            "<p>In case you use the browser search function, keep in mind that in case a search field is open, that the experiment application does not notice when you push a button.<br>" +
               "In such situation you need to set the focus back to the browser (probably by pressing [Esc]).</p>"


            ,


            "<p>In the experiment, time will be measured between the moment code is shown to you until you pressed a key.<br>" +
            "You can make a break whenever the application tells you so.</p>" +
            "<p>Before the experiment start, five training tasks are given to you.</p>" +
            "<p>You have to do those tasks, but you can repeat training as long as you wish (but don't forget that " +
            "the experiment has not started while you are in the training phase).</p>" +
            "<p>In the experiment phase, you have to do 84 tasks (which sounds a lot, but it will take you less than 12 minutes, probably less than 10 minutes).</p>" +
            "<p>Please note, that the experiment is just finished, when you sent the resulting file to the experimenter.</p>"
    ];
}

export function pre_run_training_instructions(): string {
    return "<p>You entered the training phase.<br>" +
               "You finish a task by pressing the button that is the result of the main.</p>"
}

export function pre_run_experiment_instructions(): string {
    return "<p>You entered the experiment phase. Please, sit up straight and be concentrated, because the experiment directly starts once you press [Enter].</p>";
}

export function finish_pages(): string {
    return "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
        "Please, send the " +
        "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
        "<p>By sending that mail, you agree that " +
        "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
        "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
        "<a href='https://github.com/shanenbe/Experiments/tree/main/2026_Procedural_Abstraction/Agreement.pdf' target='_blank'>here</a>. " +
        "Note, that it is not necessary to send a signed version of the agreement to the experimenter.<br><br>" +
        "After sending your email, you can close this window.</p>" +
        "<p>Many thanks for your participation. In case you are interested in getting the experiment results after the experiment has been finished, leave me a message.<br>" +
        "-Stefan Hanenberg</p>"
}