export enum NATType {
    Unknown,
    OpenInternet,
    SymmetricUdpFirewall,
    FullCone,
    RestrictedCone,
    PortRestrictedCone,
    Symmetric
}

export interface HolePunch {

    detectNATType: () => Promise<NATType>;

}