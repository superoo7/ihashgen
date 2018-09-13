import commander from "commander";
import chalk from "chalk";
import inquirer, { Prompts } from "inquirer";
import generate from "./command/generate";
const config = require("../package.json");

const version = config.version || "unknown";

commander.version(version);

/**
 * Generate cdn url with hash
 * > ihashgen generate <cdn_url>
 * > ihashgen g <cdn_url>
 */
commander
  .command("generate <cdn_url>")
  .alias("g")
  .description("generate links based on url given")
  .option("-t, --type [css/js]", "specify file type (css/js)")
  .option("-a, --algo [sha384]", "specify hashing algorithm (sha384)")
  .action((d, args) => {
    return generate(d, args);
  });

console.log(chalk.bgBlue(`ihashgen v${version}`));

// nothing entered
if (process.argv.length === 2) {
  const questions = [
    {
      type: "list",
      name: "fileType",
      message: "Choose file type",
      choices: ["css", "js"]
    },
    {
      type: "list",
      name: "hashType",
      message: "Choose hashing algorithm use",
      choices: ["sha384"]
    },
    {
      type: "input",
      name: "cdnUrl",
      message: "Enter cdn url:"
    }
  ];
  const inq = inquirer.prompt(questions);
  inq.then((answer: any) => {
    return generate(answer.cdnUrl, {
      type: answer.fileType,
      algo: answer.hashType
    });
  });
}

commander.parse(process.argv);
