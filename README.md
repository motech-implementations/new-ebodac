## Quick Start backend development
Clone this repository from GitHub:
 ```shell
 git clone https://github.com/motech-implementations/new-ebodac.git
 ```
1. Install MySql with
<pre>
$ sudo apt-get update
$ sudo apt-get install mysql-server
</pre>

2. Start the service with `./gradlew` or `gradle`. On first run it installs all 
dependencies like NPM, node modules etc. Once it is running, you should see 'Started Application in NN seconds'. 
Your console will not return to a prompt as long as the service is running. 
The service may write errors and other output to your console.
3. Best way for speed development is to add a `bootRun` Gradle configuration to IntelliJ Idea, and
run it with `Debug` option.
4. Hot-swapping Java classes without rerunning `./gradlew`: try clicking CTRL+F9 to build project (ie. all Java classes in classpath),
and accept a prompt asking about reloading changed classes.
5. Go to localhost:8080

## Frontend Hot-Reload with Webpack watch
1. Start Java server with `./gradlew` or `gradle` (if you want run local environment gradle).
2. Run `./gradlew webpackWatch` or `gradle webpackWatch` in separate terminal (or ideally in IntelliJ Idea)
3. Profit - your .scss, and .js files are reloaded automatically. Refresh your browser.

## IntelliJ Idea development
1. Install Lombok, MapStruct nad NodeJS plugins under File -> Settings -> Plugins -> Browse repositories... search for the Lombok, MapStruct support and NodeJS plugins and install them all.
2. Check the Enable annotation processing checkbox under File -> Settings -> Build, Execution, Deployment -> Compiler -> Annotation Processors.
3. Download the `intellij-java-google-style.xml` file from the http://code.google.com/p/google-styleguide/ repo. 
Under File -> Settings -> Editor -> Code Style import the google-styleguide (gear icon -> Import Scheme -> Intellij IDEA code style XML) and choose it as current code style for the project.
4. Enable ESLint under File -> Settings -> Languages and Frameworks -> JavaScript -> Code Quality Tools -> ESLint and set "Node interpreter" to `~/new-ebodac/.gradle/nodejs/node-v10.16.0-linux-x64/bin/node` and "ESLint package" to `~/new-ebodac/node_modules/eslint`
(you need to run `gradle build` or `./gradlew build` before this to install gradle and npm dependencies)

## Data model changes
1. Generate the migration using the gradle task (`./gradlew diffChangeLog`), the migration file will be saved at /resources/liquibase/changelog and have the following format yyyyMMddHHmmSS_changelog.xml (e.g. 20190101163444_changelog.xml)
2. Include the generated migration in the changelog by adding the following line to the liquibase-changelog.xml file: `<include file="{migration file name}" relativeToChangelogFile="false" />`

## Stopping the Service
To stop the service (when it is running with `./gradlew`) use Control-C.
