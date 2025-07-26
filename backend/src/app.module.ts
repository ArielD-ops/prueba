import * as process from 'process';
import { Module } from '@nestjs/common'; // Importing Module decorator from NestJS.
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeOrmModule for database integration.
import { NotesModule } from './notes/notes.module'; // Importing NotesModule which contains the notes-related functionality.
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create tables (for dev only).
    }),
    NotesModule, //The Notes module is imported so that its services, controllers, and entities are available in the AppModule.
  ],
})
export class AppModule {} //Root module that integrates TypeORM and notes functionality.