import { Module } from '@nestjs/common'; // Importing Module decorator from NestJS.
import { TypeOrmModule } from '@nestjs/typeorm'; // Importing TypeOrmModule for database integration.
import { NotesModule } from './notes/notes.module'; // Importing NotesModule which contains the notes-related functionality.

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'notes_app',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Auto-create tables (for dev only).
    }),
    NotesModule, //The Notes module is imported so that its services, controllers, and entities are available in the AppModule.
  ],
})
export class AppModule {} //Root module that integrates TypeORM and notes functionality.