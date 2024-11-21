# Intro

This code is under permanent change, which makes it hard to document it. I still try to give my best 
(due to time constraints, I am not able to provide a better documentation than what you find here). 
Before you start, you need to decide whether you want to write the experiment code in JavaScript or Typescript. 
JavaScript is definitively the worse alternative, but it makes the tooling easier. 

Whatever you do, you need some html file that starts the experiment and that contains some div elements that are used by the experiment.

In case you have some questions, just drop me an email.

-Stefan

# Before you start
Again, you need to decide first whether you use JavaScript of TypeScript -- but you should always prefer to use TypeScript.
## JavaScript
When doing experiments in JavaScript, you need

1. a library file that contains the Nof1Experimentation code, and
1. you need to understand how you can access the experimentation code.

Probably the easiest way to access the library file is to get the code that was generated last. Download 

https://github.com/shanenbe/N-of-1-Experimentation/blob/main/___BUILD_LIB_FILE_TestExperiment/nof1experimentation.js

This (long) file is a webpacked version of the experimentation environment. Next, you need to see what functions are provided by the API. Take a look into the file

https://github.com/shanenbe/N-of-1-Experimentation/blob/main/___BUILD_LIB_FILE_TestExperiment/API_PROVIDER_FOR_WEBPACK_LIB_GENERATION.ts

You see there the name of the global variable that is used (today, this variable is called Nof1, it recently changed to it) with corresponding fields. 
For example, the line

``map['new_random_integer'] = random_integer_up_to_excluding;``

tells you that the API provides its function ``random_integer_up_to_excluding`` under the name ``new_random_integer`` in the global variable. 
From the list in the file you see all other functions that are provided via the global variable. 
The last line in the file tells you the name of the global variable:

``set_nof1(Nof1); // Note: the webpage needs to introduce the global variable Nof1``

This line says that the name of the global variable is ``Nof1``.

When using JavaScript, you hardly have to fight with JSON files, jcsonfig-files or webpack. It makes it easy to use the experimentation environment, but it makes it hard to write code (JavaScript).

## TypeScript
I really advice to use TypeScript (I just provide the JavaScript version, because of a lecture I provide, where most students are rather no codes -- 
and where I want to provide a very quick possibility to start experimentation). Please, use the TypeScript version (we really -- with strong evidence -- that the absence of static types costs you time). 
You can do it as follow.

1. clone the current repository
1. clone the repository 'https://github.com/shanenbe/N-of-1-Experimentation' into the current project (i.e., IN the already cloned repo).

The nice thing is, that you do not need to think too much about global variables or what functions are provided -- you can just us them. The bad thing is, that in order to make an experiment available via e.g. github, you need to webpack your project.

# Defining an experiment
The easiest way to start with an experiment is to use one of the two template-projects as starting points ()

