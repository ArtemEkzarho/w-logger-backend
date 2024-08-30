import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExerciseRequest } from './dto/create-exercise.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ExerciseService } from './exercise.service';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createExercise(
    @Body() body: CreateExerciseRequest,
    @CurrentUser() user: TokenPayload,
  ) {
    return this.exerciseService.createExercise(body, user.userId);
  }
}
