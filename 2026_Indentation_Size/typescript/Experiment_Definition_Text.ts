export function intro_pages() {

    return [
                "<p>Thanks for participating. This experiment is about indentation and takes about 10-12 minutes experimentation time. You will be shown source code " +
                "fragments where an if statement's condition is highlighted. You have to enter the number of the closing bracket for that " +
                "if statement. For example, the following code is similar to a task in the experiment</br>" +
                "<p><code>" +
                "if(treecons){<br>" +
                "&nbsp&nbspif(tablesum){<br>" +
                "&nbsp&nbsp&nbsp&nbspif(<span style='background-color: red'>chairspoonhelp</span>){<br>" +
                "&nbsp&nbsp&nbsp&nbsp}3<br>" +
                "&nbsp&nbsp}1<br>" +
                "}2</code></p>" +
                "<p>The right answer for this task is the number <code>3</code> that you have to press." +
                "</p>" +
                "<p>Sometimes there are (similar to IDEs) lines next to the if statements." +

                "<p><code>" +
                "<span style='border-left:3px solid lightgray; padding-left:3px; margin:0; display: inline-block;'>if(treecons){<br>" +
                "&nbsp&nbsp&nbsp&nbsp<span style='border-left:3px solid lightgray; padding-left:0px; margin:0; display: inline-block;'>if(<span style='background-color: red'>tablesum</span>){<br>" +
                "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span style='border-left:3px solid lightgray; padding-left:0px; margin:0; display: inline-block;'>if(chairspoonhelp){<br>" +
                "}3</span><br></br>" +
                "}1</span><br>" +
                "}2</span></code></p>" +
                "</p>" +
                "<p>The right answer for this task is the number 1 that you have to press.</p>"

                ,

                "<p>The experiment starts with a training phase. You can run as many training tasks as you like. The training session is not measured in the experiment.</p>" +
                "<p>Before starting with training, please change your browser to fullscreen (F11 on Windows)."

                ,

                "<p>Please, make sure that the following rectangle can be completely seen on your screen. Depending on the browser and the machine, this can be done by pressing [Ctrl] and [+] or [-]. </p>" +
                "<code>" +
                "*".repeat(130)+"<br>" +
                ("*" + "&nbsp".repeat(128)+"*<br>").repeat(22) +
                "*".repeat(130)+
                "</code>"


        ,

        "<p>Training starts, as soon as you press [Enter].</p>" +
                "<p>Please note, after the experiment a file is downloaded that you have to send to the experimenter.</p>"
    ];
}

export function pre_run_training_instructions(): string {
    return "<p>You entered the training phase. You can skip the training by pressing [Esc]. Please, put your fingers already on the keyboard.</p>"
}

export function pre_run_experiment_instructions(): string {
    return "<p>You entered the experiment phase. Please, put your fingers already on the keyboard.</p>";
}

export function finish_pages(): string {
    return "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
        "Please, send the " +
        "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
        "<p>By sending that mail, you agree that " +
        "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
        "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
        "<a href='./Agreement.pdf' target='_blank'>here</a>. " +
        "Note, that it is not necessary to send a signed version of the agreement to the experimenter.<br><br>" +
        "After sending your email, you can close this window.</p>" +
        "<p>Many thanks for your participation.<br>" +
        "-Stefan Hanenberg</p>"
}