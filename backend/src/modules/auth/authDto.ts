import { Exclude, Expose, Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
  MICROSOFT = "microsoft",
}

export class UserDto {
  @Expose()
  @IsInt()
  id!: number;

  @IsString()
  @Transform(({ obj }) => obj.imgProfile)
  @Expose({ name: "img_profile" })
  imgProfile!: string;

  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @Exclude()
  @IsString()
  @IsOptional()
  password!: string;

  @IsEnum(AuthProvider, {
    message: `El proveedor debe ser uno de: ${Object.values(AuthProvider).join(
      ", "
    )}`,
  })
  @Transform(({ obj }) => obj.autProvider)
  @Expose({ name: "auth_provider" })
  authProvider!: AuthProvider;

  @IsString()
  @Transform(({ obj }) => obj.providerId)
  @Expose({ name: "provider_id" })
  providerId!: string;

  @IsBoolean()
  @Transform(({ obj }) => obj.isActive)
  @Expose({ name: "is_active" })
  isActive!: boolean;

  @Type(() => Date)
  @IsDate()
  @Transform(({ obj }) => obj.createdAt)
  @Expose({ name: "created_at" })
  createdAt!: Date;

  @Type(() => Date)
  @IsDate()
  @Transform(({ obj }) => obj.updatedAt)
  @Expose({ name: "updated_at" })
  updatedAt!: Date;
}

export class UserRegisterDto {
  @IsOptional()
  @IsString()
  @Expose({ name: "img_profile" })
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
  @Expose({ name: "auth_provider" })
  authProvider!: AuthProvider;

  @IsOptional()
  @IsString()
  @Expose({ name: "provider_id" })
  providerId?: string; // if autProvider !== local, is required

  public isLocal(): boolean {
    return this.authProvider === AuthProvider.LOCAL;
  }
}

export class UserSignInDto {
  @IsEnum(AuthProvider, {
    message: `El proveedor debe ser uno de: ${Object.values(AuthProvider).join(
      ", "
    )}`, 
  }) 
  @Expose({ name: "auth_provider" })
  authProvider!: AuthProvider;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  password!: string;

  @IsString() 
  @Expose({ name: "provider_id" })
  @IsOptional()
  providerId!: string;

  public isLocal(): boolean {
    return this.authProvider === AuthProvider.LOCAL;
  }
}
