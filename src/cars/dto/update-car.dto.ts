import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';
import { ObjectId } from 'typeorm';

export class UpdateCarDto extends PartialType(CreateCarDto) {
    readonly _id: ObjectId;
}