import { createReadStream } from "fs";
import { exit, stderr } from "process";

export function inputStream(input) {
  if (input) {
    return createReadStream(input, "utf8");
  }
  return process.stdin;
}

export function outputStream(output) {
  if (output) {
    try {
      fs.accessSync(output);
      return fs.createWriteStream(output, {
        flags: "a",
      });
    } catch (err) {
      process.stderr.write("No such output file");
      exit();
    }
  }
  return process.stdout;
}

export function exitStream(e) {
  if (e) {
    stderr.write("No such input file");
    exit(e);
  }
}
