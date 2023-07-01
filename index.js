const { program } = require("commander");
const categorizeFile = require("./categorizeFile");

program
  .arguments("<context>")
  .option("--type <type>", "Specify the file type(s) to process")
  .option("-n,--name", "Specify the file name category")
  .option("-m,--modify", "Specify the file modify category")
  .option("-s,--size", "Specify the file size category")
  .option("--output [output]", "Specify the output directory for a single file")
  .action((context, options) => {
    const { type, name, modify, size } = options;

    if (!context) {
      console.log("Error: The context parameter is required.");
      program.help();
      return;
    }

    const optionCount = Object.keys(options).length - 1; // Trừ đi 1 để loại bỏ tham số context
    if (optionCount > 4) {
      console.log("Error: Maximum of 4 optional parameters allowed.");
      program.help();
      return;
    }

    const shouldCategorize = type || name || modify || size;

    if (!shouldCategorize) {
      console.log("Error: At least one of --type, --name, --modify, or --size options must be specified.");
      program.help();
      return;
    }

    categorizeFile(context, { type, name, modify, size, output: options.output });
  });

program.parse(process.argv);
