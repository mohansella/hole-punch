export enum NATType {
    OpenInternet,
    SymmetricUdpFirewall,
    FullCone,
    RestrictedCone,
    PortRestrictedCone,
    Symmetric
}

interface HolePunch {

    detectNATType: () => Promise<NATType>;

}