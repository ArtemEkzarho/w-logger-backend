import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseRequest } from './dto/create-exercise.request';
import { PrismaService } from '../prisma/prisma.service';
import { promises } from 'fs';
import { join } from 'path';
import { EXERCISE_IMAGES } from './exercise-images';

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

  async getExercises() {
    const exercises = await this.prismaService.exercise.findMany();

    return Promise.all(
      exercises.map(async (exercise) => ({
        ...exercise,
        imageExist: await this.imageExist(exercise.id),
      })),
    );
  }

  async getExercise(exerciseId: number) {
    try {
      return {
        ...(await this.prismaService.exercise.findUniqueOrThrow({
          where: { id: exerciseId },
        })),
        imageExist: await this.imageExist(exerciseId),
      };
    } catch (err) {
      throw new NotFoundException(`Exercise not found with ID ${exerciseId}`);
    }
  }

  private async imageExist(exerciseId: number) {
    try {
      await promises.access(
        join(`${EXERCISE_IMAGES}/${exerciseId}.jpg`),
        promises.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
}
