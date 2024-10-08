import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../../../../core/roles/role.enum";

export type UserDocument = User & Document;
//User Wallet
export interface Wallet {
  id: string;
  state: string;
  walletSetId: string;
  custodyType: string;
  refId: string;
  name: string;
  address: string;
  blockchain: string;
  accountType: string;
  updateDate: string;
  createDate: string;
}

//User Nft 
export interface NFT{ 
nftTokenId : number,
token : {
  id: string,
  blockchain : string,
  tokenAddress :string,
  name : string
}
} 
@Schema()
export class User {
  @Prop({required: true})
  firstName: string;

  @Prop({required: true})
  lastName: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;
  

  @Prop({ enum: Object.values(Role), default: Role.Developer })
  role: Role;

  @Prop()
  birthDate: string;

  @Prop()
  avatar: string;

  @Prop()
  gender: string;

  @Prop()
  phoneNumber: string;

 

  @Prop()
  twoFactorCode: string;

  @Prop()
  twoFactorExpiration: Date;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  wallets : Wallet[];

  @Prop()
  nfts : NFT[];
}

export const UserSchema = SchemaFactory.createForClass(User);
