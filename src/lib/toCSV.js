const { parse } = require("json2csv");

const toCSV = content => {
  const fields = [
    "platform",
    "channel",
    "event_type",
    "number",
    "time",
    "emojis",
    "line"
  ];
  const opts = { fields };
  const csv = parse(content, opts);
  return csv;
};

module.exports = toCSV;
