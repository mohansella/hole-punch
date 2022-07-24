

interface ServerInfo {
    hostport: String
    rank: number
}

export class StunServer {

    private static SERVERS: Set<String> = new Set<String>()

    private servers: Map<String, ServerInfo> = new Map<String, ServerInfo>()

    constructor(servers? : String[]) {
        if(servers && servers.length) {
            servers.forEach(x => { this.addServer(x)})
        } else if(StunServer.SERVERS.size) {
            StunServer.SERVERS.forEach( x => {this.addServer(x)})
        } else {
            throw Error(`stun servers neither provided nor set globally`)
        }
    }

    private addServer(hostport: String) {
        this.servers.set(hostport, {
            hostport: hostport,
            rank: 0
        })
    }

    public getServers() {
        return StunServer.getSortedServers(this).map(x=> x.hostport)
    }

    private static getSortedServers(stunServer: StunServer) {
        let toReturn: ServerInfo[] = []
        stunServer.servers.forEach(x=> {toReturn.push(x)})
        return toReturn.sort((a, b) => { return a.rank - b.rank })
    }

    public static setGlobalServers(servers: String[]) {
        this.SERVERS.clear()
        servers.forEach(x => {this.SERVERS.add(x)})
    }

    public static getGlobalServers() : String[] {
        let toReturn: String[] = []
        this.SERVERS.forEach(x => {toReturn.push(x)})
        return toReturn
    }

}