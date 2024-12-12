/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExcelModule } from './upload/excel.module';
import { FinanceModule } from './finance/finance.module';
import { PrismaService } from './prisma/prisma.service';
import { RoomsModule } from './graphics/rooms.module';
import { GraficoFModule } from './graficoF/graficoF.module';
import { GraficoGModule } from './graficoG/graficoG.module';
import { TablesModule } from './mesas/tables.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    ExcelModule,
    FinanceModule,
    RoomsModule,
    GraficoFModule,
    GraficoGModule,
    TablesModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: 'SendGrid',
          auth: {
            user: 'apikey', // This is the string literal 'apikey', not a placeholder
            pass: configService.get<string>('SENDGRID_API_KEY'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@example.com>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), 
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
