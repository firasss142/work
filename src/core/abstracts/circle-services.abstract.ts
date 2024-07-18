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
    abstract executeContract(abiParameters: string[], walletId: string): any;
    abstract createDevelopWallet(userData: any): any;
    // add more abstract methods as needed
  }
  