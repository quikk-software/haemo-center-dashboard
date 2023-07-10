import log from "loglevel";
import chalk from "chalk";
import prefix from "loglevel-plugin-prefix";

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};

if (process.env.NODE_ENV == "development") {
  log.setLevel("debug");
}

prefix.reg(log);

prefix.apply(log, {
  format(level, name, timestamp) {
    // @ts-ignore
    return `${chalk.gray(`[${timestamp}]`)} ${colors[level.toUpperCase()](
      level,
    )} ${chalk.green(`${name}:`)}`;
  },
});

export default log;
