import {
    Injectable,
    UnauthorizedException,
    NotFoundException,
    OnModuleInit,
  } from "@nestjs/common";
  import { User } from "../../core/entities";
  import {
    IDataServices,
    IBcryptService,
    ICircleService,
  } from "../../core/abstracts";
  import {
    CreateUserDto,
    UpdateUserDto,
    UpdateUserPasswordDto,
  } from "../../core/dtos";
  import { UserFactoryService } from "./user-factory.service";
  
  import { BASE_URL } from "../../configuration";

  import { firstValueFrom } from "rxjs";
  import { Role } from "../../core/roles/role.enum";
  import { Wallet } from "src/frameworks/data-services/mongo/model";
  
  export interface WalletsResponse {
    data: {
      wallets: Wallet[];
    };
  }
  @Injectable()
  export class UserUseCases implements OnModuleInit {
    constructor(
      private dataServices: IDataServices,
      private userFactoryService: UserFactoryService,
      private bcryptService: IBcryptService,
      private circleservice: ICircleService,
    ) {}
    async onModuleInit(): Promise<void> {
      setTimeout(async () => {
        const adminEmail = "Groupeg2024@gamil.com";
        const adminExists = await this.dataServices.users.findByAttribute(
          "email",
          adminEmail,
        );
        if (adminExists) {
          console.log("Admin already exists");
        }
        if (!adminExists) {
          const adminUserDetails: any = {
            firstName: "Admin",
            lastName: "RH",
            avatar: undefined,
            email: adminEmail,
            password: "GroupeG@123",
            gender: "male",
            phoneNumber: "11111111",
            role: Role.Admin,
            birthDate: "2000-00-00",
          };
  
          try {
            await this.createUser(adminUserDetails);
            console.log("Admin user created successfully");
          } catch (error) {
            console.error("Failed to create admin user:", error);
          }
        }
      }, 1000);
    }
    getAllUsers(): Promise<User[]> {
      return this.dataServices.users.getAll();
    }
  
    async getUserById(id: any): Promise<User> {
      // const circleWalletResponse = await firstValueFrom(
      //   await this.circleservice.executeContract(
      //     [
      //       '0x64e6f74bb7ae45b76beeef05f51c310bdbba39c6',
      //       'ipfs://QmbN3jaurunvwJxVDaL2Z8uQ7FgiTpfAnpLJxDELXoVMaE'
      //     ],
      //     'b74bcb7b-d5e8-51fa-a72b-916f7135c6e4'
      //   )
      // );
      // console.log("circleWalletResponse", circleWalletResponse)
      // return circleWalletResponse as any;
      return this.dataServices.users.get(id);
    }
    
  
    async createUser(createUserDto: CreateUserDto): Promise<User> {
      try {
        const userExist = await this.dataServices.users.findByAttribute(
          "email",
          createUserDto.email,
        );
        if (userExist) {
          throw new UnauthorizedException("User already exist.");
        }
        createUserDto.password = await this.bcryptService.hashPassword(
          createUserDto.password,
        );
        const user = this.userFactoryService.createNewUser(createUserDto);
        const createdUser = await this.dataServices.users.create(user);
        return createdUser;
      } catch (error) {
        throw error;
      }
    }
    async createAccount(
      createUserDto: CreateUserDto,
      file: Express.Multer.File,
    ): Promise<any> {
      try {
        const userExist = await this.dataServices.users.findByAttribute(
          "email",
          createUserDto.email,
        );
        if (userExist) {
          throw new UnauthorizedException("User already exist.");
        }
  
        createUserDto.password = await this.bcryptService.hashPassword(
          createUserDto.password,
        );
        createUserDto.role = Role.Developer;
        createUserDto.avatar = file
        ? `${BASE_URL}/uploads/${file.filename}`
        : null;
        
  
        const adminEmail = "Groupeg2024@gamil.com";
        const adminExists = await this.dataServices.users.findByAttribute(
          "email",
          adminEmail,
        );
        const circleWalletResponse: WalletsResponse = await firstValueFrom(
          await this.circleservice.createDevelopWallet(createUserDto),
        );
        //Circle API's not working 
        console.log("working till now");
        //Circle API's not working 
        
        console.log("circleWalletResponse", circleWalletResponse.data);
  
        const userWallet: Wallet[] = circleWalletResponse.data.wallets;
  
        const newUser = this.userFactoryService.createNewUser({
          ...createUserDto,
          wallets: userWallet,
        });
        const createdUser = await this.dataServices.users.create(newUser);
      } catch (error) {
        throw error;
      }
    }
  
  
    
    async updateUserPassword(
      userId: string,
      updateUserPasswordDto: UpdateUserPasswordDto,
    ): Promise<boolean> {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new UnauthorizedException("User not found.");
      }
      const isValid = await this.bcryptService.comparePassword(
        updateUserPasswordDto.currentPassword,
        user.password,
      );
      if (!isValid) {
        throw new UnauthorizedException("Invalid Password!.");
      }
      user.password = await this.bcryptService.hashPassword(
        updateUserPasswordDto.newPassword,
      );
      await this.dataServices.users.update(userId, user);
      return true;
    }
    async findUserByEmail(email: string): Promise<User> {
      const user = await this.dataServices.users.findByAttribute("email", email);
  
      if (!user) throw new NotFoundException("User not found.");
      return user;
    }
    async deleteUser(id: string): Promise<boolean> {
      const user = await this.dataServices.users.delete(id);
      return user ? true : false;
    }
  
    async usersStats(): Promise<number> {
      return await this.dataServices.users.countByCriteria({
        role: Role.Developer,
      });
    }
    async updateUser(
      userId: string,
      updateUserDto: UpdateUserDto,
      file: Express.Multer.File,
    ): Promise<User> {
      try {
        const userToUpdate = await this.dataServices.users.get(userId);
        if (!userToUpdate) {
          throw new NotFoundException('User not found');
        }
    
        updateUserDto.avatar = file
          ? `${BASE_URL}/uploads/${file.filename}`
          : undefined;
        const updatedUser = this.userFactoryService.updateUser(updateUserDto);
        return this.dataServices.users.update(userId, updatedUser);
      } catch (error) {
        throw error;
      }
    }
  }
  