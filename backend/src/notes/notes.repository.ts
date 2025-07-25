// NotesRepository: Manages interaction with the database for notes and tags.
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
// Mark the class for dependency injection in NestJS.
export class NotesRepository {
  constructor(
    @InjectRepository(Note)
    // TypeORM repository for operations on Note.
    private noteRepository: Repository<Note>,
    @InjectRepository(Tag)
    // TypeORM repository for Tag operations.
    private tagRepository: Repository<Tag>,
  ) {}

  async createNote(title: string, content: string): Promise<Note> {
    // Create and save a new note with isArchived status set to false
    const note = this.noteRepository.create({ title, content, isArchived: false });
    return this.noteRepository.save(note);
  }

  async findActiveNotes(): Promise<Note[]> {
    // Recover all unarchived notes along with their labels.
    return this.noteRepository.find({ where: { isArchived: false }, relations: ['tags'] });
  }

  async findArchivedNotes(): Promise<Note[]> {
    // Recover all archived notes along with their labels.
    return this.noteRepository.find({ where: { isArchived: true }, relations: ['tags'] });
  }

  async findNoteById(id: number): Promise<Note | null> {
    // Search for a note by its ID, including related tags
    return this.noteRepository.findOne({ where: { id }, relations: ['tags'] });
  }

  async updateNote(id: number, title: string, content: string, isArchived: boolean): Promise<Note | null> {
    // Updates note fields if it exists and persists changes.
    const note = await this.findNoteById(id);
    if (!note) return null;
    note.title = title;
    note.content = content;
    note.isArchived = isArchived;
    return this.noteRepository.save(note);
  }

  async deleteNote(id: number): Promise<boolean> {
    // Deletes a note by its ID and returns true if successful.
    const result = await this.noteRepository.delete(id);
    return result.affected > 0;
  }

  async addTagToNote(noteId: number, tagName: string): Promise<Note | null> {
    // Adds a tag to a note by its ID, creating the tag if it doesn't exist.
    const note = await this.findNoteById(noteId);
    if (!note) return null;
    let tag = await this.tagRepository.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = this.tagRepository.create({ name: tagName });
      await this.tagRepository.save(tag);
    }
    note.tags = note.tags || [];
    if (!note.tags.some(t => t.id === tag.id)) {
      note.tags.push(tag);
    }
    return this.noteRepository.save(note);
  }

  async removeTagFromNote(noteId: number, tagId: number): Promise<Note | null> {
    // Unlinks the indicated tag from the note and saves the change.
    const note = await this.findNoteById(noteId);
    if (!note) return null;
    note.tags = note.tags.filter(tag => tag.id !== tagId);
    return this.noteRepository.save(note);
  }

  async findNotesByTag(tagId: number): Promise<Note[]> {
    // Retrieves all notes associated with a specific tag.
    return this.noteRepository.find({ where: { tags: { id: tagId } }, relations: ['tags'] });
  }

  async findAllTags(): Promise<Tag[]> {
    // Returns all tags available in the database
    return this.tagRepository.find();
  }
}