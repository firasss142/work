import { firstValueFrom } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { IEASService } from "../../core/abstracts";
import { ethers } from 'ethers';
import {
    EAS,
    SchemaEncoder,
    createOffchainURL,
    AttestationShareablePackageObject
} from "@ethereum-attestation-service/eas-sdk";
import { HttpService } from "@nestjs/axios"; 
import { HttpException, Injectable } from "@nestjs/common";
import { EAS_CONTRACT_ADDRESS, PROVIDER, SIGNER, CONTRACT_SCHEMA_UID, DEVELOPER_SCHEMA_UID } from "src/configuration";

export type StoreAttestationRequest = { filename: string; textJson: string };

@Injectable()
export class EASService implements IEASService {
  private readonly easContractAddress: string = EAS_CONTRACT_ADDRESS;
  private readonly provider: string = PROVIDER;
  private readonly signer: string = SIGNER;

  constructor(private httpService: HttpService) {}

  // Step 1: Create Contract Attestation
  async createContractAttestation(threshold: number, paymentAmountInETH: string): Promise<string> {
    try {
      // Set up Ethereum provider and signer using credentials from configuration
      const provider = new ethers.JsonRpcProvider(this.provider);
      const signer = new ethers.Wallet(this.signer, provider);
      
      // Initialize EAS (Ethereum Attestation Service) with the contract address and signer
      const eas = new EAS(this.easContractAddress, { signer });
      await eas.connect(signer);
      
      // Encode the schema data with threshold and payment amount
      const schemaEncoder = new SchemaEncoder("uint256 threshold, uint256 paymentAmount");
      const paymentAmountInWei = ethers.parseUnits(paymentAmountInETH, "ether");

      const encodedData = schemaEncoder.encodeData([
        { name: "threshold", value: threshold, type: "uint256" },
        { name: "paymentAmount", value: paymentAmountInWei, type: "uint256" },
      ]);

      const transaction = await eas.attest({
        schema: CONTRACT_SCHEMA_UID,  // Schema for the contract attestation
        data: {
          recipient: '0x0000000000000000000000000000000000000000',  // Use an appropriate recipient if needed
          revocable: true,  // Adjust according to your schema requirements
          data: encodedData,
        }
      });

      const newAttestationUID = await transaction.wait();
      console.log('New Contract Attestation UID:', newAttestationUID);

      return newAttestationUID;

    } catch (error) {
      console.error("Error creating contract attestation:", error);
      throw error;
    }
  }

  // Step 2: Create Developer Attestation that references the Contract Attestation
  async createDeveloperAttestation(attestationUID : string): Promise<any> {
    try {
      // Set up Ethereum provider and signer using credentials from configuration
      const provider = new ethers.JsonRpcProvider(this.provider);
      const signer = new ethers.Wallet(this.signer, provider);
      
      // Initialize EAS (Ethereum Attestation Service) with the contract address and signer
      const eas = new EAS(this.easContractAddress, { signer });
      await eas.connect(signer);
      
      // Encode the reference to the contract attestation
      const schemaEncoder = new SchemaEncoder("bytes32 refUID");
      const encodedData = schemaEncoder.encodeData([
        { name: "refUID", value:attestationUID, type: "bytes32" },
      ]);

      const transaction = await eas.attest({
        schema: DEVELOPER_SCHEMA_UID,  // Schema for the developer attestation
        data: {
          recipient: '0x0000000000000000000000000000000000000000',  // Use an appropriate recipient if needed
          revocable: true,  // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        }
      });

      const receipt = await transaction.wait();
      console.log('Transaction receipt:', transaction.receipt);
      
            return receipt;



    } catch (error) {
      console.log(error);
      throw error;
    } 
  }

}
