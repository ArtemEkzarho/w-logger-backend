import { Module } from '@nestjs/common';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ExerciseGateWay } from './exercise.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, ExerciseGateWay],
})
export class ExerciseModule {}
