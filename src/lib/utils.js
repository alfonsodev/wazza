const fs = require("fs");
const path = require("path");
const { CLIError } = require("@oclif/errors");

module.exports = {
  extractNumber: line => {
    let plusPos = line.indexOf("+");
    if (!plusPos > 0) {
      return "";
    }
    let number = "";
    for (let i = plusPos; i < line.length; i++) {
      if (line[i] === ":") {
        return number.replace(/\s/g, "");
      } else if (line.substr(i, 5) === " left") {
        return number.replace(/\s/g, "");
      }

      number += line[i];
    }
  },
  isDirectory: path => fs.lstatSync(path).isDirectory(),
  getDirFiles: directoryPath => {
    try {
      const files = fs.readdirSync(directoryPath);
      const textFiles = [];
      files.forEach(function(file) {
        if (path.extname(file) === ".txt") textFiles.push(file);
      });
      return textFiles;
    } catch (err) {
      throw new CLIError(`Unable to scan directory ${directoryPath}`);
    }
  }
};
