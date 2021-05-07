exports.validator = (action, shift) => {
  if (!(typeof action === "string") && !shift)
    process.stderr.write(
      'error: required option "-a, --action string" , "-s, --shift number" not specified'
    );
  else if (shift < 0) process.stderr.write("error: enter shift >= than 0");
  else if (typeof action !== "string")
    process.stderr.write(
      'error: required option "-a, --action string" not specified'
    );
  else if (!shift)
    process.stderr.write(
      'error: required option "-s, --shift number" not specified'
    );
  else if (isNaN(parseInt(shift)))
    process.stderr.write(
      'error: required option "-s, --shift action" is not specified correctly. Please enter number'
    );
  else if (action !== "encode" && action !== "decode")
    process.stderr.write(
      'error: required option "-a, --action string" is not specified correctly. applied parameters: "encoded" or "decoded"'
    );
  return false;
}
