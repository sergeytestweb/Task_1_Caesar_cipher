export function exit(error) {
    process.on('exit', code => {
        process.stderr.write(`${error.message}. Status code: ${code}`)
    });
};