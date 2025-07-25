// Note Management Module
// - Groups everything needed to create, read, update, and delete notes.
// - Connects Note and Tag entities to the database via TypeORM.
// - Exposes the controller and providers that orchestrate the logic and data access.
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Tag } from './entities/tag.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesRepository } from './notes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
})
export class NotesModule {} //Module in charge of all the functionality related to notes and labels.