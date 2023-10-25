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

## 1. Indentation
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation/index.html)

This experiment checks the effect of indentation on (nested) if-statements. Each shown if-statement consists of 7 (nested) if-statements.

The experiment is a 2x3x3 N-of-1 trial with the following three independent variables:

- indentation (indented, non-indented): Indented code uses 4 whitespaces for each indentation level.
- read_indent (4, 6, 8): It is the lines to be read in the indented code (only those lines that are necessary)
- diff (0, 2, 4): The differences between the lines that need to be read in the non-indented code (it is assume that even those lines that could be jumped over need to be read) and the indentec code.


