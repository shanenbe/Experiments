# Indentation Experiments

So far, this repo contains three experiments on indentation. Two came from previous publications, one is more a spontaneous one (a collegue assumed a certain effect of a certain notation).

All experiments are N-of-1 experiments, see:
[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

In case you have questions or comments, just drop me an email.

-Stefan


## 1. Indentation - nested ifs
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation/index.html)

This experiment is a remake of the experiment described in:

[Hanenberg, Morzeck, Gruhn, "Indentation and reading time: a randomized control trial on the differences between generated indented and non-indented if-statements", Empirical Software Engineering, Vol 29, No 5, 2024.](https://doi.org/10.1007/s10664-024-10531-y)

It checks the effect of indentation on (nested) if-statements (each shown if-statement consists of 7 (nested) if-statements).

The experiment is a 2x3x3 N-of-1 trial with the following independent variables:

- indentation (indented, non-indented): Indented code uses 4 whitespaces for each indentation level.
- read_indent (4, 6, 8): It is the lines to be read in the indented code (only those lines that are necessary)
- diff (0, 2, 4): The differences between the lines that need to be read in the non-indented code (it is assumed that even those lines that could be jumped over need to be read - except the return statements) and the indented code.

Number of repetitions: 5.

The first variable is the main variable in the experiment (since it is about indented and non-indented code), the interaction between the latter ones is the most interesting one (because such interaction explains the differences between indented and non-indented code).

There is predecessor of that experiment where manually chosen tasks were given to participants: 
[Morzeck, Hanenberg, Werger, Gruhn, "Intendation in Source Code: A Randomized Control Trial on the Readability of Control Flows in Java Code with Large Effects", ICSoft 2023](https://doi.org/10.5220/0012087500003538)
A preprint can be found [here]().

## 1.1 Indentation - alternative style
Derek assumed that a different code format style could matter. Here is the experiment.

[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation_Dereks_Hypothesis/index.html)

## 2. Indentation - JSON-Objects
[click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation_JSON/index.html)

The experiment tests the readability time of JSON-objects by asking the single quesion "how many fields does the outermost object have?". The experiment is described in:

[Hanenberg,Morzeck, Werger, Gries, Gruhn, "Indentation and Reading Time: A Controlled Experiment on the Differences Between Generated Indented and Non-indented JSON Objects", Communications in Computer and Information Science 2104, Springer, 2024, pp. 50-75.](https://doi.org/10.1007/978-3-031-61753-9_4)

The experiment is a 2x3 N-of-1 trial (5 repetitions per treatment combination) with the following independent variables:

- indentation (indented, non-indented): Indented code uses 4 whitespaces for each indentation level.
- answer (1, 3, 5): The number of fields the outermost object has.

The first variable is the main variable in the experiment (since it is about indented and non-indented code). The second variable is more a "technical variable" where we think that its' contribution to the experiment is not much (i.e., it does not interact with the main variable).