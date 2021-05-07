const fs = require('fs')
const { program } = require('commander');
const { pipeline } = require('stream');
const { inputStream, outputStream, exitStream } = require('./src/streams')
const { encoded, decoded } = require('./src/coder');
const { exit } = require('process');
const through2 = require('through2');
const { validator } = require('./src/validator')

program
    .storeOptionsAsProperties(true)
    .option('-a, --action <string>', 'action encode/decode')
    .option('-s, --shift <number>', 'shift')
    .option('-i, --input <string>', 'input file')
    .option('-o, --output <string>', 'output file')

program.parse(process.argv);
const action = program.action
const shift = program.shift

validator(action, shift);

pipeline (
    inputStream(program.input),
    through2(action.toString() === 'encode' ? encoded(+shift > 26 ? (shift%26).toFixed() : shift) : decoded(+shift > 26 ? (shift%26).toFixed() : shift)),
    outputStream(program.output),
    (err) => {
        exitStream(err)
      }
)