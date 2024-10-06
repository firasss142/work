import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UseGuards,
    UseInterceptors,
    UploadedFile,
  } from "@nestjs/common";
  import {
    CreateUserDto,
    UpdateUserDto,
    UpdateUserPasswordDto,
  } from "../core/dtos";
  import { ContractExecResponse, UserUseCases } from "../use-cases/user/user.use-case";
  import {
    ApiBody,
    ApiTags,
    ApiParam,
    ApiBearerAuth,
    ApiConsumes,
  } from "@nestjs/swagger";
  import { RolesGuard } from "../core/roles/roles.guard";
  import { Role } from "../core/roles/role.enum";
  import { Roles } from "../core/roles/role.decorator";
  import { JwtAuthGuard } from "../core/guards/jwtauth.guard";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { imageAndPdfFilter, storage } from "../configuration/multer.config";
  
  @ApiTags("api/user")
  @Controller("api/user")
  export class UserController {
    constructor(private userUseCases: UserUseCases) {}
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()    
    @Get(":id")
    @ApiParam({ name: "id", type: String, description: "ID of the user" })
    async getById(@Param("id") id: any) {
      return this.userUseCases.getUserById(id);
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @Get("email/:email")
    @ApiParam({ name: "email", type: String, description: "email of the user" })
    async getUserByEmail(@Param("email") email: string) {
      return this.userUseCases.findUserByEmail(email);
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @ApiBearerAuth()
    @Roles(Role.Admin)
    async getAll() {
      return this.userUseCases.getAllUsers();
    }
  
    // @Post()
    // @ApiBody({ type: CreateUserDto })
    // async createUser(@Body() userDto: CreateUserDto) {
    //   try {
    //     const newUser = await this.userUseCases.createUser({ ...userDto });
    //     return newUser;
    //   } catch (error) {
    //     return { error: "Unable to create user" };
    //   }  
    // }
  
    @ApiConsumes("multipart/form-data")
    @Post()
    @UseInterceptors(
      FileInterceptor("avatar", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )
    @ApiBody({ type: CreateUserDto })
    async createAccount(
      @Body() userDto: CreateUserDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      try {
        const newArtist = await this.userUseCases.createAccount(
          {
            ...userDto,
          },
          file,
        );
        return newArtist;
      } catch (error) {
        return { error: "Unable to create artist account" };
      }
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiConsumes("multipart/form-data")
    @Put(":id")
    @UseInterceptors(
      FileInterceptor("avatar", {
        storage: storage,
        fileFilter: imageAndPdfFilter,
      }),
    )
    @ApiParam({ name: "id", type: String, description: "ID of the user" })
    @ApiBody({ type: UpdateUserDto })
    updateUser(
      @Param("id") userId: string,
      @UploadedFile() file: Express.Multer.File,
      @Body() updateUserDto: UpdateUserDto,
    ) {
      return this.userUseCases.updateUser(userId, updateUserDto, file);
    }
  
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.Admin)
    // @ApiBearerAuth()
    // @ApiConsumes("multipart/form-data")
    // @Put("/artist/:id")
    // @ApiParam({ name: "id", type: String, description: "ID of the user" })
    // updateAccount(@Param("id") userId: string) {
    //   return this.userUseCases.appendAttestationToUser(userId);
    // }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @Put(":userId/password")
    async updateUserPassword(
      @Param("userId") userId: string,
      @Body() updateUserPasswordDto: UpdateUserPasswordDto,
    ) {
      return this.userUseCases.updateUserPassword(userId, updateUserPasswordDto);
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<boolean> {
      return this.userUseCases.deleteUser(id);
    }
  
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @Get("users/count")
    async usersStats(): Promise<number> {
      return this.userUseCases.usersStats();
    }
    //Nft deployment controller

@Post("deploy/nft")
async nftExec(
  @Body() body: { ABI: string[], walletId: string }
): Promise<ContractExecResponse> {
  try {
    console.log("Received ABI:", body.ABI);
    console.log("Received Wallet ID:", body.walletId);
    const { ABI, walletId } = body;
    const mintNft = await this.userUseCases.nftExec(ABI, walletId);
    console.log("NFT Deployment Response:", mintNft);
    return mintNft;
  } catch (error) {
    console.error("Error deploying NFT:", error.message);
    throw new Error("Failed to deploy NFT");
  }
}
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin)
@Post('create-contract-attestation')
  async createContractAttestation(
    @Body('threshold') threshold: number,
    @Body('paymentAmount') paymentAmount: string,
    @Body('developerAddress') developerAddress: string
  ) {
    const contractAttestationUid = await this.userUseCases.createContractAttestation(threshold, paymentAmount,developerAddress);
    // Handle the contract attestation UID as needed (e.g., store it, return it)
    return { contractAttestationUid };
  }

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Developer)
  @Post('create-developer-attestation')
  async createDeveloperAttestation(
    @Body("ContractID") contractAttestationUid : string 
  ) {
    if (!contractAttestationUid) {
      throw new Error('Contract attestation UID not found');
    }
    const developerAttestationUid = await this.userUseCases.createDeveloperAttestation(contractAttestationUid);
    // Handle the developer attestation UID as needed
    return { developerAttestationUid };
  }
}
