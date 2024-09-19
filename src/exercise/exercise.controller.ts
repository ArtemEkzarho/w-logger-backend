/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateExerciseRequest } from './dto/create-exercise.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { ExerciseService } from './exercise.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { EXERCISE_IMAGES } from './exercise-images';

@Controller('exercises')
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

  @Post(':exerciseId/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: EXERCISE_IMAGES,
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.exerciseId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadExerciseImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getExercises() {
    return this.exerciseService.getExercises();
  }

  @Get(':exerciseId')
  @UseGuards(JwtAuthGuard)
  async getExercise(@Param('exerciseId') exerciseId: string) {
    return this.exerciseService.getExercise(+exerciseId);
  }
}
