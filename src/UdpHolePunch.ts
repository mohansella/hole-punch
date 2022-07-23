import { StunServer } from "./StunServer"
import { HolePunch, NATType } from "./HolePunch"
import { createSocket, RemoteInfo, Socket } from "dgram"
import { Logger } from "./Logger"

enum DetectState {
    NOT_STARTED,
    T1_SAMEADDRESS_SAMEPORT,
    T2_DIFFADDRESS_DIFFPORT,
    T3_SAMEADDRESS_DIFFPORT
}

class Detector {

    private detectState: DetectState = DetectState.NOT_STARTED

    constructor(private socket: Socket, private listener: (t: NATType, err?: Error)=>void) {

    }

}


export class UdpHolePunch implements HolePunch {

    private ipaddress: string
    private port: number
    private stunServer: StunServer
    private socket: Socket

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
    }

    private onSocketClose() {
        LOGGER.info(`onSocketClose`)
    }

    private onSocketConnect() {
        LOGGER.info(`onSocketConnect`)
    }

    private onSocketError() {
        LOGGER.info(`onSocketError`)
    }

    private onSocketListening() {
        LOGGER.info(`onSocketListening`)
    }
    
    private onSocketMessage(msg: Buffer, rinfo: RemoteInfo) {
        LOGGER.info(`onSocketMessage`)
    }

    public async detectNATType() {
        LOGGER.info(`detectNATType`)
        return NATType.FullCone
    }
    
}

const LOGGER: Logger = new Logger(UdpHolePunch.name)
