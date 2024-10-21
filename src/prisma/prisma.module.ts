import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaService } from './prisma.service'; 

@Module({
  providers: [PrismaService],
  exports: [PrismaService], 
})
export class PrismaModule {}
=======
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
>>>>>>> 53eaf4a6a17cf3f21a4c9455c1faf51cdf9922f3
