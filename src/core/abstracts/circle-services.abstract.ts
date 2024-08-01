import { Observable } from "rxjs";
import { ContractExecResponse } from "src/use-cases/user/user.use-case";

export abstract class ICircleService {
    abstract createUser(userData: any): any;
    abstract createUserToken(userData: any): any;
    abstract createUserWallet(
      userName: string,
      userId: string,
      userToken: string,
    ): any;
    abstract finalTransaction(transactionData: any): any;
    abstract Transaction(asset: any): any;
    abstract GetWgetUser(userData: any): any;
    abstract getallet(walletData: any, userToken: string): any;
    abstract executeContract(abiParameters: string[], walletId: string):Promise<any>;
    abstract createDevelopWallet(userData: any): any;
    abstract deployNftExperience(walletData : any);
    // add more abstract methods as needed
  }
  