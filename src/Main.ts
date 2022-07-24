import { StunServer } from "./holepunch/stun/StunServer"
import { UdpHolePunch } from "./holepunch/udp/UdpHolePunch"

class Main {
    
    public static async main() {
        StunServer.setGlobalServers(["77.72.169.210:3478"])
        let udpHolePunch = new UdpHolePunch(8080)
        await udpHolePunch.detectNATType()
    }

}

if(require.main == module) {
    Main.main()
}