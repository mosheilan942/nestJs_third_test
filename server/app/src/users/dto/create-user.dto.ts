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

  @IsString()
  @MinLength(4, { message: 'Username must have atleast 4 characters.' })
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @Matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, {
    message: 'email must be a valid email',
  })
  email: string;
  
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
  
}

