import { Logger } from "./Logger"


export class PromiseHandler<T> {

    public readonly promise: Promise<T>

    public resolve: (value: T | PromiseLike<T>) => void
    public reject: (reason?: any) => void

    public constructor() {
        this.resolve = ()=>{}
        this.reject = ()=>{}

        var self = this
        this.promise = new Promise<T>((resolve, reject) => {
            self.resolve = resolve
            self.reject = reject
        })
    }

}

const LOGGER = new Logger(PromiseHandler.name)