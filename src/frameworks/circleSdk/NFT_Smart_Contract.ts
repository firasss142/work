import {HttpService} from "@nestjs/axios" ; 
import { HttpException } from "@nestjs/common";
import {v4 as uuidv4} from "uuid";
import { catchError,map } from "rxjs/operators";
import { firstValueFrom } from "rxjs";
import {response} from "express"


export const deployfNFTContract = async (httpService : HttpService) => {
    const apikey = "apikey";
    const url = "https://api.circle.com/v1/w3s/templates/76b83278-50e2-4006-8b63-5b1a2a814533/deploy"
    const NFT_Template_ID : string = "76b83278-50e2-4006-8b63-5b1a2a814533";
    const idempotencyKey :string = uuidv4() ; 
    const walletAdminId :String = "0x1d363857c2eb118dceea7ce729937f19b500d676";
    const ciphertext:string = await "CipherText "
    const templateParameters = {
        name: 'My First NFT Contract',
        defaultAdmin: '<ADDRESS>',
        primarySaleRecipient: '<ADDRESS>',
        royaltyRecipient: '<ADDRESS>',
        royaltyPercent: 0
      }
    const  fee = {
        type: 'level',
        config: {
          feeLevel: 'MEDIUM'
        } 
    }
    const payload = {
        idempotencyKey : idempotencyKey,
        blockchain: "ETH-SEPOLIA",
        walletId : walletAdminId,
        name : "My first Nft CONTRACT",
        entitySecretCiphertext : ciphertext,
        templateParameters : templateParameters,
        feeLevel : fee
}

    return httpService.post(
        url,
        payload,{
        headers : {
            Authorization : `Bearer ${apikey}`,
            "content-type" : "application/json",
            accept : "application/json"
        }
    }
    )
    .pipe(
        map((response) =>{ 
            console.log(response.data);
            response.data}),
        catchError((e) => {
            console.log("error : " , e);
            throw new HttpException(e.response.data,e.response.status);
        })
    )
}

/*

{
  "data": {
    "contractIds": ["b7c35372-ce69-4ccd-bfaa-504c14634f0d"],
    "transactionId": "601a0815-f749-41d8-b193-22cadd2a8977"
  }
}
Contract Address Found on the console : 0x21234321423422342252522
*/


export const createContractExecutionTransaction = async (httpService : HttpService) => {
    const apikey = "apikey";
    const url = "https://api.circle.com/v1/w3s/developer/transactions/contractExecution"
    const idempotencyKey :string = uuidv4() ; 
    const walletAdminId :String = "0x1d363857c2eb118dceea7ce729937f19b500d676";
    const ciphertext:string = await "CipherText ";
    const CDI = "QmZ7F2Hy1F9rYHNRCibHP25qovAGxDL9HZy4JChBJMzw5a"
    const contractAddress = "Contract Address Holder"
    const payload = { 
        idempotencyKey : idempotencyKey,
        abiFunctionSignature :"mintTo(address,string)",
        abiParameters : [
            walletAdminId,
            CDI
        ],
        contractAddress : contractAddress,
        entitySecretCiphertext : ciphertext,
        fee : {
            type : 'level',
            config : {
                feelevel: 'Medium'
            }
        },
        walletId : walletAdminId
        }

        return httpService.post(
            url,
            payload,{
            headers : {
                Authorization : `Bearer ${apikey}`,
                "content-type" : "application/json",
                accept : "application/json"
            }
        }
        )
        .pipe(
            map((response) => {
                console.log(response.data);
                return response.data;
            }),
            catchError(e =>{
                console.log("error : ", e);
                    throw new HttpException(e.response.data,e.response.status);
            })
        )
}


export const getNFTsForWallet = (walletId,apiKey,httpService : HttpService) =>{
    const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/nfts?pageSize=10`;
    return httpService.get(
        url,
        {
            headers : {
                accept : "application/json",
                authorization : `Bearer ${apiKey}`
            }
        }
    )
}   


/*
***@file to IPFS 
***@Response retrieve the CID OR IpfsHash
*/


const pinFileToIPFS = async ()=> {
    const axios = require("axios");
    const FormData = require("form-data");
    const fs = require("fs");

    try {
      const formData = new FormData();
      const file = fs.createReadStream("./hello.txt");
      formData.append("file", file);

      const pinataMetadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({
        cidVersion: 1,
      });
      formData.append("pinataOptions", pinataOptions);

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: `Bearer `,
            ...formData.getHeaders()
          },
        }
      );
      return res.data.IpfsHash;
    } catch (error) {
      console.error("Error uploading file to IPFS:", error);
      throw new HttpException(error.response.data, error.response.status);
    }
  }


  /*
    deployfNFTContract = async () => {
    const NFT_Template_ID : string = "76b83278-50e2-4006-8b63-5b1a2a814533";
    const url = `https://api.circle.com/v1/w3s/templates/${NFT_Template_ID}/deploy`;
    const idempotencyKey :string = uuidv4() ; 
    const walletAdminId :String = "0x1d363857c2eb118dceea7ce729937f19b500d676";
    const entity = await firstValueFrom(this.getEntity());
    const cyph = this.generateEntitySecretCiphertext(
      entity["data"]["publicKey"]);
    const templateParameters = {
        name: 'My Third NFT Contract',
        defaultAdmin: walletAdminId,
        primarySaleRecipient: walletAdminId,
        royaltyRecipient: walletAdminId,
        royaltyPercent: 0
      }
    const  fee = {
        type: 'level',
        config: {
          feeLevel: 'MEDIUM'
        } 
    }
    const data = {
        idempotencyKey : idempotencyKey,
        blockchain: "ETH-SEPOLIA",
        walletId : walletAdminId,
        name : "My first Nft CONTRACT",
        entitySecretCiphertext : cyph,
        templateParameters : templateParameters,
        feeLevel : fee
}

return this.httpService
.post(url,data, {
  headers: {
    Authorization: `Bearer ${this.apiKey}`,
    "Content-Type": "application/json",
    accept: "application/json",
  },
})
.pipe(
  map((response) => {
    console.log(response);
    return response.data;
  }),
  catchError((e) => {
    console.log("e", e);
    throw new HttpException(e.response.data, e.response.status);
  }),
);
}

*/