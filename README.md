# Collection of experiments on programming and source code

This repo contains some N-of-1 experiments. You can start each experiment just by clicking on the links in the list below.

In case you are interested in N-of-1 experiments in programming and software science, you might be interested in the following paper (open access):

[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

Each experiment generates a csv file at the end of the experiment. The present code does not do the analysis automatically (just load the csv into your preferred stats program and run an ANOVA).


Note that this is NOT the source code repository for the software used in each experiment (which can be found [here](https://github.com/shanenbe/N-of-1-Experimentation)) - the experiments 
just use some versions of the mentioned repository in their file lib.js (probably in different version - I will not keep the experiments in sync with the code repo in order not to change experiments that were already executed). 
The present repository is the source code repository for the experiment definitions. However, if you still want to write your own experiments,
take a look at [this link](https://github.com/shanenbe/Experiments/blob/main/HowTo.md).

In case you have questions or comments, just drop me an email.

-Stefan


## 1. Indentation in Source Code 
### 1.1 Nested ifs
[[click here start the experiment]](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation/index.html) The experiment should take (without training) about 20-30 minutes. 
It is is a remake of the experiment described in:

[Hanenberg, Morzeck, Gruhn, "Indentation and reading time: a randomized control trial on the differences between generated indented and non-indented if-statements", Empirical Software Engineering, Vol 29, No 5, 2024.](https://doi.org/10.1007/s10664-024-10531-y)

There is a predecessor of that experiment where manually chosen tasks were given to participants: 

[Morzeck, Hanenberg, Werger, Gruhn, "Intendation in Source Code: A Randomized Control Trial on the Readability of Control Flows in Java Code with Large Effects", ICSoft 2023](https://doi.org/10.5220/0012087500003538)

### 1.2 JSON-Objects
The experiment should take (without training) about 20-30 minutes. [click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2023_Indentation_JSON/index.html) 
The experiment tests the readability time of JSON-objects by asking the single quesion "how many fields does the outermost object have?". The experiment is described in:

[Hanenberg,Morzeck, Werger, Gries, Gruhn, "Indentation and Reading Time: A Controlled Experiment on the Differences Between Generated Indented and Non-indented JSON Objects", Communications in Computer and Information Science 2104, Springer, 2024, pp. 50-75.](https://doi.org/10.1007/978-3-031-61753-9_4)

## 3. Type Systems - constructor calls
- Flat experiment: [click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2024_TypeSystems_ConstructorCall_Flat/index.html)
- Hierarchical experiment: [click here start the experiment](https://htmlpreview.github.io/?https://raw.githubusercontent.com/shanenbe/Experiments/main/2024_TypeSystems_ConstructorCall/index.html)

## 4. Type System DSL
[click here start the experiment](https://shanenbe.github.io/Experiments/2024_LanguageTypesDSL_Readability/index.html)



## 5. Strings with Questionmarks: Backslash, Composition, Containment
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
