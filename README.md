# Wazza

Wazza is a utility to parse one or multiple whatsapp backup files into csv or json file formats. **only tested for group backups**

## Features:

- √ group chat exports
- ? one to one chat exports
- √ csv and json file formats
- √ individual .txt files
- √ directories of .txt (files are combined into one csv or json export)

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
wazza _chat.txt > export.csv
```

If you have a folder with multiple exports from different channels,  
but you want to combine them into one single csv or json file, you can  
pass a folder as an argument instead of a file.  
Just make sure all files have `.txt` extension.  
Example, given you have a folder called `exports/` than contains one or more `.txt` files.

```
wazza exports/ > export.csv
```

or

```
wazza -f json exports/ > export.json
```

and the export file will contain the combination of all exported .txt files.

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
