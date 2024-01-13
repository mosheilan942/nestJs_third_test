import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'typeorm';



@ObjectType()
export class Car {

  @Field(() => String)
  _id: ObjectId;

  @Field(() => String)
  company: string;

  @Field(() => String)
  model?: string;

  @Field(() => String)
  type?: string;
}

@InputType()
export class CreateCarInput {

  @Field(() => String)
  company: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  type: string;
}