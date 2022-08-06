const fs = require("fs"),
  path = require("path");


//Deleting code file
const removeCodeFile = (uuid, lang) => {
  const codeFile = path.join(__dirname, `codes/${uuid}.${lang}`),
    outputFile = path.join(__dirname, `classes/${uuid}.out`);

  try {
    fs.unlinkSync(codeFile);
    //file removed
  } catch (err) {
    // console.error(err);
  }

  try {
    fs.unlinkSync(outputFile);
    //file removed
  } catch (err) {
    // console.error(err);
  }
};

module.exports = removeCodeFile;

