# Collection of experiments on programming and source code

This repo contains a bunch of N-of-1 experiments that I designed once. Some are older experiments that were originally written in Java and that I converted now to JavaScript in order to ease the execution of experiments (sorry for using the dynamically typed language JavaScript -- we KNOW that dynamically typed languages cost additional development time in comparison to statically typed ones. Actually, the lib used for the experiments are written in TypeScript. I still use JavaScript for the experiments, because it makes deployment slightly easier for me). 

You can start each experiment just by clicking on the links in the list below.

In case you are interested in N-of-1 experiments in programming and software science, you might be interested in the following paper (available via public access)

[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

Each experiment generates a csv file at the end of the experiment. The present code does not do the analysis automatically (just load the csv into your preferred stats program and run an ANOVA).


Note that this is NOT the source code repository for the software used in each experiment (which can be found [here](https://github.com/shanenbe/N-of-1-Experimentation)) - the experiments 
just use some versions of the mentioned repository in their file lib.js (probably in different version - I will not keep the experiments in sync with the code repo in order not to change experiments that were already executed). The present repository is the source code repository for the experiment definitions.

In case you have questions or comments, just drop me an email.

-Stefan


The following experiments are currently available:

## 1. Indentation - nested ifs
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation/index.html)

This experiment (described in detail in a paper that is not yet published) checks the effect of indentation on (nested) if-statements. Each shown if-statement consists of 7 (nested) if-statements.

The experiment is a 2x3x3 N-of-1 trial (with 5 repetitions per treatment combination) with the following independent variables:

- indentation (indented, non-indented): Indented code uses 4 whitespaces for each indentation level.
- read_indent (4, 6, 8): It is the lines to be read in the indented code (only those lines that are necessary)
- diff (0, 2, 4): The differences between the lines that need to be read in the non-indented code (it is assumed that even those lines that could be jumped over need to be read - except the return statements) and the indented code.

Number of repetitions: 5.

The first variable is the main variable in the experiment (since it is about indented and non-indented code), the interaction between the latter ones is the most interesting one (because such interaction explains the differences between indented and non-indented code).

There is predecessor of that experiment where manually chosen tasks were given to participants: 
[Morzeck, Hanenberg, Werger, Gruhn, "Intendation in Source Code: A Randomized Control Trial on the Readability of Control Flows in Java Code with Large Effects", ICSoft 2023](https://doi.org/10.5220/0012087500003538)
A preprint can be found [here]().


## 2. Indentation - JSON-Objects
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation_JSON/index.html)

The experiment tests the readability time of JSON-objects by asking the single quesion "how many fields does the outermost object have?".

The experiment is a 2x3 N-of-1 trial (5 repetitions per treatment combination) with the following independent variables:

- indentation (indented, non-indented): Indented code uses 4 whitespaces for each indentation level.
- answer (1, 3, 5): The number of fields the outermost object has.

The first variable is the main variable in the experiment (since it is about indented and non-indented code). The second variable is more a "technical variable" where we think that its' contribution to the experiment is not much (i.e., it does not interact with the main variable).

## 3. Strings with Questionmarks: Backslash, Composition, Containment
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_String_Expressions_Escaping_vs_NonSingleLiteral_vs_Composition/index.html)

Checks how strings should be composed. 

The experiment randomly generated expressions and it is up to the participant to decide whether the (Boolean) expression is valid.
The different string representations are
  - Escaping: strings might have escaped quotation marks)
  - Containment: the outer string uses ' while inner string use " - similar to JavaScript)
  - Composition: a string with quotation marks is a string composition (using + as a concat operator) where a variable QUOTE represents the quotation mark.

It is a 3x3 experiment with 4 repetitions per treatment combination - the first variable is the style (Excaping, etc.), the second one is the position where one decides whether or not the expression is correct (-1 means that the whole string needs to be read).

Probably the big result of the study is: string composition is probably the worst choice to do for string generation.

## 4. CamelCase, Snake_Case
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2024_CamelCase_Underscore/index.html)
