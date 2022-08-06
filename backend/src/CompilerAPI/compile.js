const router = require("express").Router();
const createCodeFile = require("./createCodeFile");
const removeCodeFile = require("./removeCodeFile");

const {
    executeJava,
    executePython,
    executeCorCPP,
    executeJavaScript,
    executeGo,
    executePhp
} = require("./executeCode");


const supportedLanguages = ["java", "cpp", "py", "c", "js", "go", "php"];
const compilerVersions = [
    "18.0.2",
    "12.1.0",
    "3.9.13",
    "12.1.0",
    "16.15.1",
    "1.19.0",
    "8.1.8"
];



//API Endpoint
router.post("/", async (req, res) => {
    let output = "";
    const { language = "java", code, input = "" } = req.body;

    if (code === undefined || code.trim() === "")
        output = "No code specified to execute.";
    if (!supportedLanguages.includes(language))
        output = `Language ${language} is not supported. Please refer to docs to know the supported languages.`;

    if (output === "") {
        const codeFile = createCodeFile(language, code);

        console.log("\n*" + language.toUpperCase() + " program executing..................");
        console.log("\nFile name -> ", codeFile, "\n\n",
            "Program ------> ", "\n\n", code, "\n",
            input ? `\nInput --->\n ${input}` : "");

        switch (language) {
            case "java":
                output = await executeJava(codeFile, input);
                break;
            case "py":
                output = await executePython(codeFile, input);
                break;
            case "cpp":
                output = await executeCorCPP(codeFile, input);
                break;
            case "c":
                output = await executeCorCPP(codeFile, input);
                break;
            case "js":
                output = await executeJavaScript(codeFile, input);
                break;
            case "go":
                output = await executeGo(codeFile, input);
                break;
            case "php":
                output = await executePhp(codeFile, input);
                break;
        }

        removeCodeFile(codeFile.split(".")[0], language);


        //replacing dir name with main.extension name
        let filePathAndName = __dirname + "\\codes\\" + codeFile;

        if (output.output) {
            output.output = output.output.replace(filePathAndName, `main.${language}`);
        } else {
            // output.error = output.error.replace(filePathAndName, `main.${language}`);
        }

        console.log(output);
    }



    res.status(200).send(output);
})

router.get("/list", (req, res) => {
    let versionObj = [];
    for (let i = 0; i < supportedLanguages.length; i++) {
        versionObj.push({
            language: supportedLanguages[i],
            compilerVersion: compilerVersions[i],
        });
    }
    res.status(200).send(versionObj);
})

module.exports = router;