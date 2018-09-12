import commander from "commander";
import chalk from "chalk";

import intergrityGen from "./integrityGen";

commander
  .version("1.0.0")
  .command("generate")
  .alias("gen")
  .alias("g")
  .description("generate links based on url given")
  .action(async d => {
    if (d.length > 0) {
      try {
        const result = await intergrityGen(d);
        console.log(chalk.green(result));
      } catch (err) {
        console.error(chalk.red(`Invalid link for a CDN`));
      }
    } else {
      console.error(chalk.red(`Invalid entries. try generate <url>`));
    }
  });

commander.parse(process.argv);
