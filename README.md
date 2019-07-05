# Wazza

Wazza is a utility to parse whatsapp backup files to csv or json file formats.
It supports csv and json file formats.
** only tested for group backups **

## How to export Whatsapp group conversations.

- From the Whatsapp **mobile** app, open a group
- Tap on the group name.
- Scroll down and tap on Export file.

## Using Wazza command line tool.

install wazza command line tool globally

```
npm i -g wazza
```

Then you can run wazza command, for example

```
cd ~/Downloads
wazza -f csv _chat.txt > export.csv
```

## Options

- format: `-f` option indicates the format which can be `csv` or `json`
- date: `-d` option indicates the date-time format, here are some examples:
  - "MMMM Do YYYY, h:mm:ss a" converts to "July 5th 2019, 4:19:57 am"
  - "dddd" converts to "Friday"
  - "MMM Do YY" converts to "Jul 5th 19"
  - "YYYY [escaped] YYYY" converts to "2019 escaped 2019"

Internally wazza uses `momentjs` to format dates,
for complete list of formats see https://momentjs.com format() function.

## Example, exporting to csv:

```
wazza -f csv _chat.txt > export.csv
```

where `_chat.txt` is the file or path to the backup file.

## Example exporting to json:

```
wazza -f json _chat.txt > export.json
```

## Example exporting date/time with format like "Jul 5th 19"

```
wazza -f csv -d "MMM Do YY"_chat.txt > export.json
```
