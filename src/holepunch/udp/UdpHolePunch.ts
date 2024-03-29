import { StunServer } from "../stun/StunServer"
import { HolePunch, NATType } from "../HolePunch"
import { createSocket, RemoteInfo, Socket } from "dgram"
import { Logger } from "../logger/Logger"
import { PromiseHandler } from "../utils/PromiseHandler"
import { Utilities } from "../utils/Utilities"

enum DetectState {
    NOT_STARTED,
    T1_SAMEADDRESS_SAMEPORT,
    T2_DIFFADDRESS_DIFFPORT,
    T3_SAMEADDRESS_DIFFPORT
}

class Detector {

    private detectState: DetectState = DetectState.NOT_STARTED
    private txid_string: String
    private txid_byte: Buffer

    constructor(private socket: Socket) {
        this.txid_byte = Utilities.getRandomInt128()
        this.txid_string = Utilities.toDashedString(this.txid_byte)
    }

}


export class UdpHolePunch implements HolePunch {

    private ipaddress: string
    private port: number
    private stunServer: StunServer
    private socket: Socket

    private socketReady: PromiseHandler<void>


    constructor(port: number, ipaddress?: string, stunServers?: string[]) {
        this.ipaddress = ipaddress? ipaddress : "0.0.0.0"
        this.port = port
        this.stunServer = new StunServer(stunServers)
        
        //craete udp socket
        this.socket = createSocket("udp4")
        this.socket.addListener("close", this.onSocketClose.bind(this))
        this.socket.addListener("connect", this.onSocketConnect.bind(this))
        this.socket.addListener("error", this.onSocketError.bind(this))
        this.socket.addListener("listening", this.onSocketListening.bind(this))
        this.socket.addListener("message", this.onSocketMessage.bind(this))

        this.socket.bind(this.port, this.ipaddress)
        this.socketReady = new PromiseHandler<void>()
    }

    private onSocketClose() {
        LOGGER.info(`onSocketClose`)
    }

    private onSocketConnect() {
        LOGGER.info(`onSocketConnect`)
    }

    private onSocketError(err: Error) {
        this.socketReady.reject(err)
        LOGGER.error(`socket bind error:${err.message}`)
        throw err
    }

    private onSocketListening() {
        LOGGER.info(`socket bind success on ${this.ipaddress}:${this.port}`)
        this.socketReady.resolve()
    }
    
    private onSocketMessage(msg: Buffer, rinfo: RemoteInfo) {
        LOGGER.info(`onSocketMessage`)
    }

    public async detectNATType() {        
        //first wait for the socket to be ready
        await this.socketReady.promise

        let detector = new Detector(this.socket)
        

        LOGGER.info(`detectNATType requested`)
        return NATType.FullCone
    }
    
}

const LOGGER: Logger = new Logger(UdpHolePunch.name)
