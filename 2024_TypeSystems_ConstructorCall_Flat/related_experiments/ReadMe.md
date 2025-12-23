This directory contains subdirectories consisting of recalculations of controlled experiments on type systems found in the literature.

Each directory contains a csv-file containing the data used for the recalculations (called ./year_FirstAuthor_Measurements.csv, where year is the publications's year, FirstAuthor is the first author's name). 
The omv files (called ./year_FirstAuthor_Analysis.omv) are the recomputations based on the software Jamovi (version 2.6.44.0 was used).

Not all results are recomputed. First, because some papers do not refer to quantitative results (2009_Daly), others already report that no differences between type systems were measured (2010_Hanenberg)

## ./1977 Gannon

J. D. Gannon. An experimental evaluation of data type conventions. Commun. ACM, 20(8):584–595, August 1977.

The data is taken from the paper. The dependent variable of the experiment is number of errors. The independent variables is the type system (ST=Static types). Each participant was assigned to one of two groups where one group did one task with the type system and the other task without the type system.

When comparing the results for each round (first task, second task) in separation reveals the following results: 
- For the first round, the Mann-Whitney-U-Test reveals no differences (p=.745) 
- For the second round, there is a significant difference (p <.001, the solutions with static types caused less errors)
 
I.e., there is a strong indicator for an ordering effect that mainly determines the results. Another interpretation can be that static types do
no matter for the first, but for the second task (there are no groups that give the second task in the first round, respectively the first task in the second round).

Minor points: Removing outliers does not change this interpretation (needs to be done by hand via adding the filter in the file).

There is one additional analysis using an ANOVA. While there is a global type effect, there is an indicator for an ordering effect (type*group). The interpretation is the same as the one 
based on the Mann-Whitney-U-Test.

## ./1998_Prechelt

Prechelt, Lutz and Tichy, Walter F., A Controlled Experiment to Assess the Benefits of Procedure Argument Type Checking, IEEE Trans. Softw. Eng. 24, 4 (1998), pp. 302--312.

The data is taken from https://page.mi.fu-berlin.de/prechelt/packages/tcheck_package.zip, 
which is the original source of the Experiment by Prechelt and Tichy (it is the first author's webpage). The provided csv file is a translation of that data to a current format.

The analysis is only done on the time required by participants (measured in hours with one decimal place as delivered in the measurements). 

One ANOVA was performed on Compiler (ANSI C = type checked), Position (first or second), and Problem (task 1 or 2), but reveals only a significant result for position (p < .001). 
The interaction position*problem is approaching significance (p=.086) suggesting that Problem A takes longer than B when done as first task (but this difference does not appear in the second task).

Translating the absolute times into ranks reveals a slightly different picture. Running again an ANOVA (this time on the ranks as dependent variable) 
shows an effect of position (p < .001) and a significant interaction position*compiler, suggesting that there is difference between static and dynamic for a second task (but not in the first task).

That both analyses differ is probably an indicator for some outliers. But the second analysis is close to the analysis done by Prechelt and Tichy (based on ranks, not absolute numbers),

## ./2000_Prechelt

Prechelt, L., "An empirical comparison of seven programming languages", Computer 33, 10 (2000), pp. 23-29.

The data is taken from https://page.mi.fu-berlin.de/prechelt/packages/jccpprtTR.csv (author's webpage).

In a first step, each language was assigned to a type system (static = C, C++, Java; dynamic = perl, python, rexx, tcl), this additional column was added to the author's csv file.

An ANOVA was performed only on the dependent variable working time and type system, which reveals strong (p<.001) and large (eta squared=.255) effect of type system. A Tukey-Test reveals that on average the static type system required about 200% more time.

m(static)=14.32, m(dynamic)=3.82, i.e, m(static)/m(dynamic) = 3.75

There are some indicators for drastic outliers (all for Java), but removing those outliers (two largest) does not change much:

2 outliers removed: m(static)=12.13, m(dynamic)=3.82, i.e., m(static)/m(dynamic) = 3.18
3 outliers removed: m(static)=11.38, m(dynamic)=3.82, i.e., m(static)/m(dynamic) = 2.98

I.e., in all cases the interpretation is, that the static language required much more time (factor 2 to 3).

## 2009_Daly (NOT CONTAINED)

Daly, Mark, Sazawal, Vibha, and Foster, Jeffrey S., "Work In Progress: an Empirical Study of Static Typing in Ruby", in Workshop on Evaluation and Usability of Programming Languages and Tools (PLATEAU) 2009 (2009).

No details about measurements are given in the paper. No sources for the data are available.

## 2010_Hanenberg (NOT CONTAINED)

Hanenberg, Stefan, "An Experiment about Static and Dynamic Type Systems: Doubts about the Positive Impact of Static Type Systems on Development Time", Proceedings of OOPSLA 2010, pp. 22--35.

The data is available in the paper. However, the paper already reports no differences between two groups, i.e., the results were not recomputed.

## 2011_Stuchlick

Stuchlik, Hanenberg, "Static vs. Dynamic Type Systems: An Empirical Study about the Relationship between Type Casts and Development Time", in Proceedings of the 7th Symposium on Dynamic Languages, pp. 97-106.

The data is available in the paper, i.e. the recalculation is based on this reported data.

A repeated measures ANOVA was performed on the variables type system, start language and task. Type system was significant (p=.003), task (p<.001), and
there is a strong interaction effect task and start language (p =.035). 

Type system and start language is approaching significance (p=.06), i.e., based on the typical line of argumentation
that there must be a significant interaction effect, we cannot confirm the existence of an interaction effect between type system and some other variable and we 
can say that the static type system required longer than the dynamic type system: m(static)=1122s, m(dynamix)=857, m(static)/m(dynamic)=1.31.

However, taking into account that p =.06 is approaching significance, one should be aware that the argument is not as strong as it seems 
(and assuming the existence of an interaction effect does not reveal a significant difference between the type system for the group starting with a dynamic language).


## 2012_Mayer

Mayer, Hanenberg, Robbes, Tanter, Stefik, "An empirical study of the influence of static type systems on the usability of undocumented software", Proceedings of OOPSLA 2012, pp. 683--702.

The measurements are contained in the paper (and extracted from it).

A repeated measured ANOVA was performed on the variables type system, task, and start language (the last one is a between subject variable) on the 
dependent variable time.

Type system alone is no significant variable (p = .186), but task (p < .001) and the interactions task*start language (p<.001), and type system*start language (p<.001) are.

As the main outcome, there is a strong disordinal interaction effect between start language and type system, i.e., one should not interpret any results of the variable type system.

## 2012_Kleinschmager

Kleinschmager, Robbes, Stefik, Hanenberg, Stefan, Tanter, "Do static type systems improve the maintainability of software systems? An empirical study", ICPC 2012, pp. 153-162.

The data is contained in the paper and the recalculation is based on these numbers. 

The repeated measured ANOVA was done for each kind of task (CIT = class identification task, SEFT = semantic error fixing time, TEFT = type error fixing time) in separation (due to different numbers of tasks for each kind of task).


CIT: While type system is significant (p <.001), there is a strong interaction effect between type system and the start language (p < .001) and only a difference 
between the type system can be seen for the group starting with the dynamic type system (not for those ones starting with the static type system). 
Additionally, there is a strong interaction effect (p < .001) between the task and the type system: the differences between type system strongly 
depends on the concrete tasks.

SEFT: Type system is a significant variable (p < .001), but there is a strong disordinal interaction between type system and start language (p < .001): 
the static type system required more time than the dynamically typed variant if the start language was statically typed, but it required less time if the start
language was dynamically typed.

TEFT: For type error fixing time, the result is quite clear. While the variable start language is significant, the variable type system is
significant, too, and there is no interaction effect with any other variable: m(static)=193s, m(dynamic)=892, m(dynamic)/m(static)=4.62.

Our interpretation is, that only for TEFT a result was clearly shown.

## 2013_Hoppe

Hoppe, Hanenberg, Do Developers Benefit from Generic Types? An Empirical Comparison of Generic and Raw Types in Java, OOPSLA 2013, pp. 457–474.

The data is taken from the paper. The paper has three different kinds of tasks (class identification task=CIT, type error fixing task=TFT, and an extension task =ExtT).
The analysis of the tasks was done in separation.

CIT:
Although there is some tendency towards an interaction effect (types * start types; p = .068), the factor type can be interpreted independent of the second factor and there is a strong
positive effect of generic types in comparison to raw types (p = .001; m(raw)= 2502, m(generic)=1138, m(raw)/m(generic)=2.20).

TEFT:
For the teft tasks, there is neither an significant effect of types (p=.152), nor of the start language (p=.874), no an interaction effect (p=.238).

ExtT:
For the extension task, there is a clear type effect (p<.001).

## 2014_Petersen

Petersen, Hanenberg, Robbes. An empirical comparison of static
and dynamic type systems on api usage in the presence of an ide: Java vs. groovy with
eclipse. ICPC 2014, pages 212–222.

The data is taken from the paper. While task is signifikant (and there is a tendency towards an interaction effect), the main effect type system interacts with the start language in a hybrid way (where the main factor can be interpreted independent of the second factor, p < .001):
m(static)=892, m(dynamic)=1971, m(dynamic)/m(static) = 2.21.

## 2014_Endrikat

Endrikat, Hanenberg, Robbes, Stefik. How do api documentation
and static typing affect api usability? ICSE 2014, pages 632–642.

The data is taken from the paper. There are two factors (type system, documentation). While documentation is only approaching significance (p=.075), the type system effect is strong (p=.007) and large (.301)
with m(dynamic)/m(static) = 8488/5456 =1.56.

## 2015_Fischer

Fischer, Hanenberg. An empirical investigation of the effects of type
systems and code completion on api usability using typescript and javascript in ms visual
studio. OOPSLA 2015, pp. 154–167.

The data is taken from the paper. There are three factors (type system, start language, code completion ).
While there is a hybrid interaction effect between type system and start language (p = .036), the main 
effect can be interpreted independent of the second factor. Type system is strong (p<.001) and large (part. eta square = .183).
m(dynamix) / m (static)= 2707 / 1629 = 1.66.

## 2016_Okon

Okon, Hanenberg. Can we enforce a benefit for dynamically typed languages
in comparison to statically typed ones? a controlled experiment. ICPC 2016, pages 1–10.

The data is taken from the paper. We did the analysis of two tasks in separation with the additional factors type system and group.

For task1 & 2, there is a strong effect of the type system (p<.001), but there is also 
a strong interection effect with group (=.014) suggesting, that one cannot just state that the static type system required more time (which is the case on average, p =.004). 

For tash 3&4 there is a significant effect of the type system (without any further interaction effect):
m(dynamic)/m(static) = 2507 / 1567 = 1.60.

## 2018_Harlin (NOT INCLUDED)

There is no raw data for the study available somewhere, so it is not possible to recalculate the results.





