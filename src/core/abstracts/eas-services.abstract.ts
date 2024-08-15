
export abstract class IEASService {
    abstract createContractAttestation(threshold: number, paymentAmountInETH: string): Promise<string>;
    abstract createDeveloperAttestation(attestationUID : string): Promise<any>;
}