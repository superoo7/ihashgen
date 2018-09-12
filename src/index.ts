import commander from "commander";
import chalk from "chalk";
const ora = require("ora");

import intergrityGen from "./integrityGen";

commander
  .version("1.0.0")
  .command("generate <cdn_url>")
  .alias("g")
  .description("generate links based on url given")
  .action(async d => {
    if (d.length > 0) {
      console.log(chalk.blue(`Generatring hashes for [${d}]`));
      const spinner = ora("Loading...").start();
      try {
        const result = await intergrityGen(d);
        spinner.stop();
        console.log(chalk.green(result));
      } catch (err) {
        spinner.stop();
        console.error(chalk.red(`Invalid link for a CDN`));
      }
    } else {
      console.error(chalk.red(`Invalid entries. try generate <url>`));
    }
  });

commander.parse(process.argv);
