const lineByLine = require("n-readlines");
const { parse } = require("json2csv");
const ReadLines = require("read-lines");
const moment = require("moment");
const ee = require("extract-emoji");
const str = require("string-to-stream");
const utils = require("./utils");
const fs = require("fs");
const pushid = require("pushid");

const readFile = (dataFilePath, dateFormat = "") => {
  let fileDescriptor;
  const data = [];
  return new Promise((resolve, reject) => {
    let message = "";
    const liner = new lineByLine(dataFilePath);
    let rawLine;
    var channel = "";
    while ((rawLine = liner.next())) {
      let line = rawLine.toString("utf-8");
      let exp = /\[(.*?)\]/g;
      let found = line.match(exp);
      if (found) {
        message = line;
        let results = found[0]
          .replace("[", "")
          .replace("]", "")
          .replace(" ", "")
          .split(",");

        const time = moment(
          results[0] + " " + results[1],
          "DD/MM/YYYY HH:mm:ss"
        );
        var event_type = "";
        const reg_exp_left = / left$/g;
        let number = utils.extractNumber(line);
        if (
          line.match(
            /\].*Messages to this group are now secured with end-to-end encryption./g
          )
        ) {
          channel = line.match(/\] (.*)\:/)[1];
          number = "";
        } else if (line.includes("joined using this group's invite link")) {
          event_type = "user_joins";
        } else if (line.match(reg_exp_left)) {
          event_type = "user_left";
        } else if (line.includes("created this group")) {
          event_type = "user_creates_channel";
        } else if (line.includes("‎image omitted")) {
          event_type = "user_sends_image";
        } else {
          event_type = "user_texts";
        }

        data.push({
          platform: "whatsapp",
          channel,
          event_type,
          number,
          time: time.format(dateFormat),
          emojis: ee.extractEmoji(line).join(" "),
          line: message
        });
      } else {
        message += line;
      }
    }
    resolve(data);
  });
};
module.exports = readFile;
