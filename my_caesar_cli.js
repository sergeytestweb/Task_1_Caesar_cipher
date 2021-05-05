import fs from 'fs';
import { program } from 'commander';
import { pipeline } from 'stream';
import { inputStream, outputStream, exitStream } from './src/streams';
import { encoder, decoder } from './src/coder';
import { through2 } from 'through2';
import { validator } from './src/validator';

program
    .storeOptionsAsProperties(true)
    .option('-a, --action <string>', 'action encode, decode') 
    .option('-s, --shift <number>', 'shift')
    .option('-i, --input <string>', 'input file')
    .option('-o, --output <string>', 'output file')

program.parse(process.argv);
const action = program.action;
const shift = program.shift;

validator(action, shift);

pipeline (
    inputStream(program.input),
    through2(action.toString()) === 'encode' ? encoded(+shift > 26 ? (shift % 26).toFixed() : shift) : decoded(+shift > 26 ? (shift % 26).toFixed() : shift),
    (err) => {
        exitStream(err);
    }
);