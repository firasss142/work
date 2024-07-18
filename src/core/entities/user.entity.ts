import {Role} from "../roles/role.enum";
import {Wallet} from "src/frameworks/data-services/mongo/model"
export class User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    birthDate: string;
    avatar: string;
    gender: string;
    phoneNumber: string;
    twoFactorCode: string;
    twoFactorExpiration: Date;
    wallets: Wallet[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  }
  