import { IsString } from "class-validator";
// TODO nestjs-zod deprecated

export class CreateTokenDto {
  @IsString()
    clerkToken: string;
}
