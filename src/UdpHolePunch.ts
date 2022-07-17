import { StunServer } from "./StunServer"

export class UdpHolePunch {

    private ipaddress: string
    private port: number
    private stunServer: StunServer

    constructor(port: number, ipaddress?: string, stunServers?: string[]) {
        this.ipaddress = ipaddress? ipaddress : "0.0.0.0"
        this.port = port
        this.stunServer = new StunServer(stunServers)
    }

}