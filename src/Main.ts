import { StunServer } from "./StunServer";
import { UdpHolePunch } from "./UdpHolePunch";

class Main {
    
    public static main() {
        StunServer.setGlobalServers(["77.72.169.210:3478"]);
        let udpHolePunch = new UdpHolePunch(8080);
    }

}

if(require.main == module) {
    Main.main();
}