
export class StunServer {

    private static SERVERS: Set<string> = new Set<string>();

    private servers: Map<string, number> = new Map<string, number>();

    constructor(servers? : string[]) {
        if(servers && servers.length) {
            servers.forEach(x => { this.servers.set(x, 0)});
        } else if(StunServer.SERVERS.size) {
            StunServer.SERVERS.forEach( x => {this.servers.set(x, 0)})
        } else {
            throw Error(`stun servers neither provided nor set globally`)
        }
    }

    public static setGlobalServers(servers: string[]) {
        this.SERVERS.clear();
        servers.forEach(x => {this.SERVERS.add(x)})
    }

    public static getGlobalServers() : string[] {
        let toReturn: string[] = []
        this.SERVERS.forEach(x => {toReturn.push(x)})
        return toReturn;
    }

}