import chalk, {Chalk} from "chalk";
import moment from "moment";


export class Logger {

    public constructor(private name: String) {

    }

    public info(message: String) {
        Logger.log(this.name, "info", message, chalk.white);
    }

    public warn(message: String) {
        Logger.log(this.name, "warn", message, chalk.yellow);
    }

    public error(message: String) {
        Logger.log(this.name, "error", message, chalk.red);
    }

    private static log(name: String, level: String, message: String, chalkins: Chalk) {
        let colormsg = chalkins(`[${level}] [${name}] ${message}`)
        let log = `${moment().format("YYYY-MM-DD hh:mm:ss.SSS")} ${colormsg}`
        console.log(log)
    }

}