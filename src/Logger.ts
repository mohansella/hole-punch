import moment from "moment";


export class Logger {

    public constructor(private name: String) {

    }

    public info(message: String) {
        Logger.log(this.name, "info", message);
    }

    public warn(message: String) {
        Logger.log(this.name, "warn", message);
    }

    public error(message: String) {
        Logger.log(this.name, "error", message);
    }

    private static log(name: String, level: String, message: String) {
        console.log(`${moment().format("YYYY-MM-DD hh:mm:ss.SSS")}`, `${name}`, `[${level}] ${message}`)
    }

}