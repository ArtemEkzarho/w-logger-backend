import { Injectable } from '@nestjs/common';
import { CreateExerciseRequest } from './dto/create-exercise.request';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExerciseService {
  constructor(private readonly prismaService: PrismaService) {}
  async createExercise(data: CreateExerciseRequest, userId: number) {
    return this.prismaService.exercise.create({
      data: {
        ...data,
        userId,
      },
    });
  }
}
