export function intro_pages() {

    return "<p>Hi, thx for participating. You will be shown a number of if-statements where one </p>";
}

export function pre_run_training_instructions(): string {
    return "<p>You entered the training phase. You can skip the training by pressing [Esc].</p>"
}

export function pre_run_experiment_instructions(): string {
    return "<p>You entered the experiment phase.</p>";
}

export function finish_pages(): string {
    return "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).<br><br>" +
        "Please, send the " +
        "downloaded file to the experimenter: " + "<a href='mailto:stefan.hanenberg@uni-due.de'>stefan.hanenberg@uni-due.de</a></p>" +
        "<p>By sending that mail, you agree that " +
        "your (anonymized) data will be used for scientific analyses where your data (together with others in an " +
        "anonymized way) will be published.<br><br>I.e., you agree with the information sheet, see " +
        "<a href='https://github.com/shanenbe/Experiments/blob/main/2025_Rust_Readability/Agreement.pdf' target='_blank'>here</a>. " +
        "Note, that it is not necessary to send a signed version of the agreement to the experimenter.<br><br>" +
        "After sending your email, you can close this window.</p>" +
        "<p>Many thanks for your participation.<br>" +
        "-Stefan Hanenberg</p>"
}