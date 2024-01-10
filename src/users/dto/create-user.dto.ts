import { defaults } from 'argon2';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength
} from 'class-validator';
// import { defaultIfEmpty, from } from 'rxjs';
// import { Unique } from 'typeorm';
// import { Category } from './category.entity';


const passwordRegEx =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,20}$/;

export class CreateUserDto {

  id?: string;

  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(2, { message: 'Username must have atleast 2 characters.' })
  @IsNotEmpty()
  username: string;

  // @IsNotEmpty()
  // @IsEmail(null, { message: 'Please provide valid Email.' })
  // email: string;

  @IsInt()
  age: number;
  
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
  
  @IsString()
  @IsEnum(['f', 'm'])
  gender: string;

  @IsString()
  @IsOptional()
  refreshToken?: string;
}

