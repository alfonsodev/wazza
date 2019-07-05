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
  }
};
