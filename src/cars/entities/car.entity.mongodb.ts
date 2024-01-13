import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectId } from 'typeorm';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {

  @Prop({ required: true, type: String })
  company: string;

  @Prop({ required: true, type: String, unique:true })
  model: string;

  @Prop({ required: true, type: String, enum: ["electric", "gasoline", "hybrid"], })
  type: string;
  
}


export const CarSchema = SchemaFactory.createForClass(Car);