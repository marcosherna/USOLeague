import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
  MICROSOFT = "microsoft",
}

export class RegisterDto {
  @IsOptional()
  @IsString()
  imgProfile?: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @MinLength(6)
  password?: string; // if autProvider === local, is required

  @IsEnum(AuthProvider, {
    message: `El proveedor debe ser uno de: ${Object.values(AuthProvider).join(
      ", "
    )}`,
  })
  authProvider!: AuthProvider;

  @IsOptional()
  @IsString()
  providerId?: string; // if autProvider !== local, is required
 
  public isLocal() : boolean{
    return this.authProvider === AuthProvider.LOCAL;
  }
 
}
