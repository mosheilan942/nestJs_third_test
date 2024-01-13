import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CarsService } from "../../services/cars.service";
import { Car, CreateCarInput } from "../scheme/cars.schema";

@Resolver(Car)
export class CarsResolver {
  constructor(
    private carsService: CarsService,
  ) {}

  @Query(() => [Car], {nullable: false})
  cars(): Promise<Car[]> {
    return this.carsService.findAll();
  }

  @Mutation(() => Car)
  createCar(@Args('input') input: CreateCarInput) {
    return this.carsService.create(input); 
  }

  @Mutation(() => Car)
  deleteCar(@Args('input') input: string) {
    return this.carsService.delete(input); 
  }

}