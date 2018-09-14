import chalk from "chalk";
import ora from "ora";

import intergrityGen, { cdnType, algoType } from "../";

const generate = async (
  d: string,
  args: { type?: cdnType; algo?: algoType }
) => {
  let { type, algo } = args;
  if (
    !d.match(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
  ) {
    console.error(chalk.red(`Invalid URL`));
  } else if (d.length > 0) {
    console.log(chalk.blue(`Generatring hashes for [${d}]`));
    const spinner = ora("Loading...").start();
    try {
      const result = await intergrityGen(d, type, algo);
      spinner.stop();
      console.log(chalk.blue(`Done hashing 🔑`));
      // convert file size
      const { value, name } =
        result.byte > 1000
          ? result.byte > 1000000
            ? {
                value: parseFloat(`${(result.byte / 1000000).toFixed(2)}`),
                name: "MB"
              }
            : {
                value: parseFloat(`${(result.byte / 1000).toFixed(2)}`),
                name: "kB"
              }
          : { value: parseFloat(result.byte.toFixed(2)), name: "bytes" };
      console.log(chalk.blue(`File Size: `), chalk.green(`${value} ${name}`));
      console.log(chalk.blue(`Hash: `), chalk.green(result.hash));
      console.log(chalk.blue(`Html: `), chalk.green(result.html));
    } catch (err) {
      spinner.stop();
      console.error(chalk.red(`Invalid link for a CDN.`));
    }
  } else {
    console.error(chalk.red(`Invalid entries. try generate <url>.`));
  }
  return;
};

export default generate;
