const { createReadStream } = require ("fs");
const { exit, stderr } = require ("process");
const os = require('os');
const fs = require('fs');

exports.inputStream = input => {
  if (input) {
    return createReadStream(input, "utf8");
  }
  return process.stdin;
}

exports.outputStream = (path) => {
  let reuslt;
  if (path) {
    reuslt = fs.createWriteStream(path, { flags: 'a' });
    reuslt.on('close', function () {
      fs.createWriteStream(path, { flags: 'a' }).write(os.EOL);
    });
  } else {
    reuslt = process.stdout;
  }
  return reuslt;
};

exports.exitStream = e => {
  if (e) {
    stderr.write("No such input file");
    exit(e);
  }
}
