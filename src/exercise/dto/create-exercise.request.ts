import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExerciseRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  weight: number;
}
