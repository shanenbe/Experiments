# Introduction

This code is under permanent change, which makes it hard to document it. I still try to give my best 
(due to time constraints, I am not able to provide a better documentation than what you find here). 
Before you start, you need to decide whether you want to write the experiment code in JavaScript or Typescript. 
JavaScript is definitively the worse alternative, but it makes the tooling easier. 

Please, use some serious IDE for writing experiment code. I used JetBrain's WebStorm for that, but you might prefer
something else.

In case you have questions, drop me an email.

-Stefan

## JavaScript or TypeScript
You have the choice to use JavaScript or Typescript and I really advice to use TypeScript (I just provide the JavaScript version, because of a lecture I provide, where most students are rather no codes -- 
and where I want to provide a very quick possibility to start experimentation). Please, use the TypeScript version (we really know -- with strong evidence -- that the absence of static types costs you time). 
You can do it as follow.

1. clone the current repository
1. clone the repository https://github.com/shanenbe/N-of-1-Experimentation into the current project (i.e., IN the already cloned repo).

The nice thing is, that you do not need to think too much about global variables or what functions are provided -- you can just us them. The bad thing is, that in order to make an experiment available via e.g. github, you need to webpack your project.

When you decide to use JavaScript (well, think twice), there are no special steps that need to be done.

# Defining an experiment
The easiest way to start with an experiment is to use one of the two template-projects as starting point (either using JavaScript or Typescript). 

## JavaScript
For JavaScript, start with the template project https://github.com/shanenbe/Experiments/tree/main/20xx_HelloWorld_JavaScript, consisting of 
three files (``experiment_configuration2.js``, ``index.html``, ``nof1experimentation.js``). 

The only file you need to touch is ``experiment_configuration2.js`` (the file ``nof1experimentation.js`` contains the experimentation API 
 packed into one single file via webpack). This file originates from: https://github.com/shanenbe/N-of-1-Experimentation/blob/main/___BUILD_LIB_FILE_TestExperiment/nof1experimentation.js. 
Next, you need to see what functions are provided by the API. Take a look into the file

https://github.com/shanenbe/N-of-1-Experimentation/blob/main/___BUILD_LIB_FILE_TestExperiment/API_PROVIDER_FOR_WEBPACK_LIB_GENERATION.ts

You see there the name of the global variable that is used (today, this variable is called Nof1, it recently changed to it) with corresponding fields.
For example, the line

``map['new_random_integer'] = random_integer_up_to_excluding;``

tells you that the API provides its function ``random_integer_up_to_excluding`` under the name ``new_random_integer`` in the global variable.
From the list in the file you see all other functions that are provided via the global variable.
The last line in the file tells you the name of the global variable:

``set_nof1(Nof1);``

This line says that the name of the global variable is ``Nof1``.

When using JavaScript, you hardly have to fight with JSON files, jcsonfig-files or webpack. It makes it easy to use the experimentation environment, but it makes it hard to write code (JavaScript).

You can start the experiment by running the html file in a browser (respectively by running the html file in debug mode using an IDE).

## TypeScript 
For TypeScript, start with the template project https://github.com/shanenbe/Experiments/tree/main/20xx_HelloWorld_TypeScript). Again, when doing a typescript project, 
you need the repository 'https://github.com/shanenbe/N-of-1-Experimentation'. 

You can start the TypeScript experiment by running the file ``index_with_ts_module.html``. There is another file ``index.html``. 
This file can be used to start the experiment once you have webpacked everything (NOTE: Without webpacking, starting ``index.html`` causes an exception).

## Changing the experiment definition
Most of the code in ``experiment_configuration2.js``, respectively ``experiment_configuration2.ts`` should be self-explaining. 
As a starting point, start defining your independent variables in the experiment, then define the number of repetitions.
Then, you probably want to define how a task is  shown to participants. Thereto, you pass a (parameterless) lambda expression to ``task.do_print_task``. You also
probably want to change what is shown to participants once a response is given. Thereto, you need to assign a (again, parameterless) lambda expression
to ``task.do_print_after_task_information``.

## Changing the measurement

### Reaction time vs. time to finish 
The template experiment defines an experiment as a ``reaction_time`` experiment (where the time is measured until the participant reacts on some stimulus). 
Furthermore, the experiment is defined as a key press experiment (i.e. the time measurement stops when the participant presses a button). 
This is what needs to be passed to the parameter measurement.

Javascript: ``measurement: Nof1.Reaction_time(Nof1.keys(["0", "1", "2", "3"]))``
TypeScript: ``measurement: Reaction_Time(keys(["0", "1", "2", "3"]))`` 


A different option is ``Time_to_finish`` where the measurement stops when a correct answer is given. 
Configuring an experiment as time to finish has some implications: you need to define whether or not an input was correct. 
You do that by defining the expected answer and by passing a lambda function (with one string parameter) to task.accepts_answer_function:

``t.expected_answer="42"``

TypeScript: ``task.accepts_answer_function = (given_answer:string) => {return given_answer=="42";}``

And finally, you need to define what should be shown after a participant gave a right answer:

``task.do_print_error_message = (given_answer:string) => {...}``        
``task.do_print_after_task_information = () => {...}``

### Keys vs. text input
Defining a measurement via ``keys`` defines the keys that need to be pressed as a response. An alternative to that is configure the measurements 
via ``text_input_experiment`` where participants use a textbox to respond to some stimulus. For example, the following line defines (in Typescript)
that a task has a text input (in a time to finish experiment).

TypeScript: ``Time_to_finish(text_input_experiment)`` 


### Webpacking a TypeScript experiment
Unfortunately, using TypeScript requires some additional effort in order to provide the experiment to participants (either as a client html page or via, e.g., github).

First, you need to install webpack on your machine, next, you need to start the webpack with the appropriate configuration. The template directory 
https://github.com/shanenbe/Experiments/tree/main/20xx_HelloWorld_TypeScript contains three required files for packing your project via 
webpack: ``tsconfig.json``, ``package.json``, and ``webpack.config.cjs``. In case you use WebStorm, you need to generate an npm runner, where 
you pass the package.json to. This file contains a webpack runner ``"webpack --config webpack.config.cjs"`` that starts webpack for the project.

Once you started webpack, it generates a file ``experiment_configuration2.js`` in https://github.com/shanenbe/Experiments/tree/main/20xx_HelloWorld_TypeScript. 
Now, you can run ``index.html`` to start the experiment.

In case you want to provide your experiment via github, you need to push the html file and ``experiment_configuration2.js``. Then, you can start the experiment via the link

https://USERNAME.github.io/REPO_NAME/DIRECTORY/index.html

where USERNAME is your github username, REPO_NAME is the name of your repository, and DIRECTORY the directory in your repository that contains the html file.

# Some notes on HTML, etc.
Depending on what your experiment is about, you probably want to write html strings in the browser. You can use the ``writer`` object passed to the experiment confiuration and
call methods such as ``print_html_on_stage`` where you pass a string that is directly printed on the page. In case, you rather do not want to bother about html, you can convert a 
string into html (using writer.convert_string_to_html_string, where whitespaces and new lines are translated).