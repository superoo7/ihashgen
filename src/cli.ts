import commander from "commander";
import chalk from "chalk";
import ora from "ora";
const config = require("../package.json");

import intergrityGen, { cdnType, algoType } from "./integrityGen";

commander
  .version(config.version)
  .command("generate <cdn_url>")
  .alias("g")
  .description("generate links based on url given")
  .option("-t, --type [css/js]", "specify file type (css/js)")
  .option("-a, --algo [sha384]", "specify hashing algorithm (sha384)")
  .action(async (d, args) => {
    let type: cdnType = args.type ? args.type : undefined;
    let algo: algoType = args.algo ? args.algo : undefined;
    if (d.length > 0) {
      console.log(chalk.blue(`Generatring hashes for [${d}]`));
      const spinner = ora("Loading...").start();
      try {
        const result = await intergrityGen(d, type, algo);
        spinner.stop();
        console.log(chalk.blue(`Done hashing 🔑`));
        console.log(chalk.blue(`Hash: `), chalk.green(result.hash));
        console.log(chalk.blue(`Html: `), chalk.green(result.html));
      } catch (err) {
        spinner.stop();
        console.error(chalk.red(`Invalid link for a CDN.`));
      }
    } else {
      console.error(chalk.red(`Invalid entries. try generate <url>.`));
    }
  });

commander.parse(process.argv);
