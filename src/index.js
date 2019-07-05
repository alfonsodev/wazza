#!/usr/bin/env node

const readFile = require("./lib/readFile");
const toCSV = require("./lib/toCSV");
const { Command, flags } = require("@oclif/command");
const { CLIError } = require("@oclif/errors");

class WazzaCommand extends Command {
  async run() {
    const { flags, args } = this.parse(WazzaCommand);
    const data = await readFile(args.input, flags.date || "");

    if (flags.format === "csv") {
      console.log(toCSV(data));
    } else if (flags.format === "json") {
      console.log(JSON.stringify(data));
    }
  }
}
WazzaCommand.args = [{ name: "input" }];
WazzaCommand.description = `Wazza is a whatsapp backup parser

It supports csv and json file formats
- Example, exporting to csv:
wazza _chat.txt > export.csv

- Example exporting to json:
wazza -f json _chat.txt > export.json

- Example exporting date/time with format like "Jul 5th 19"

wazza -f csv -d "MMM Do YY"_chat.txt > export.json

Other date format examples:

"MMMM Do YYYY, h:mm:ss a" converts to "July 5th 2019, 4:19:57 am"
"dddd" converts to "Friday"
"MMM Do YY" converts to "Jul 5th 19"
"YYYY [escaped] YYYY" converts to "2019 escaped 2019"

Internally Wazza uses momentjs to format dates,
for complete list of formats see https://momentjs.com format() function.
`;

WazzaCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  format: flags.string({
    char: "f",
    default: "csv",
    options: ["csv", "json"],
    description: "csv or json"
  }),
  date: flags.string({
    char: "d",
    description: "date format, see https://momentjs.com for all posible formats"
  })
};

module.exports = WazzaCommand;
