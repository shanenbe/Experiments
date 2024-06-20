Install first the experiment environment. The experiment is written using Java. First, unpack the zip-file.

For windows:
The application comes with a .bat file. Executing this starts the training session or the experiment session.

For all other operating systems:
Please, install a current JRE (Java 15 or higher) on your machine. Then, navigate to the folder where you unzipped the app. There, start the jar-file via
%JAVA_HOME%/bin/java -jar BetterJavaProgrammierWithEvidence.iml.jar

The current user needs writing access to the folder where you start the application - there, a csv-file with the experiment data will we written.

Before starting the training session, make sure that you use a single screen and that the scree resolution is 1920x1080. Then, start the application. The app first asks for a so-called seed, which is a natural number. Please, use an arbitrary number (such as 2). DO NOT JUST JUMP OVER THIS DIALOG! Enter a user name - for the training session you can leave this open.

Then, the application starts by asking the question that has to be answered for all code snippets in the experiment: "What is the return". Just press ENTER. When you now press ENTER again, the training starts. You will see a piece of code and you need to decide what number is returned, which is always a number between 1 and 9. Once you entered a number, the app tells you what the correct answer was. When you press ENTER, a new piece of code will be shown to you.

One training session consists of 90 code snippets. Cancel the training session once you feel good prepared. In case, you need more than 90 code snippets, redo the training session as often as you like.

NOTE: You can alway make breaks when the app tells you that RETURN will show you the next task, but not when a new piece of code is shown to you that you have not yet answered to.

After the training session, start the experiment. Thereto, restart the app and DO NOT ENTER A NUMBER when you are asked for a seed. Then, enter a user name (as you like). Once the experiment stopps (after 90 code snippets), send the cvs-file (username.csv) to the experimenter.