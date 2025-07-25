// NotesService: Handles the notes business logic and translates errors into HTTP exceptions.
import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepository } from './notes.repository';

@Injectable()
// Allows NestJS to inject this service where needed
export class NotesService {
  constructor(private notesRepository: NotesRepository) {}
  // Injected repository for all data operations.

  createNote(title: string, content: string) {
    return this.notesRepository.createNote(title, content);
  }

  getActiveNotes() {
    return this.notesRepository.findActiveNotes();
  }

  getArchivedNotes() {
    return this.notesRepository.findArchivedNotes();
  }

  async updateNote(id: number, title: string, content: string, isArchived: boolean) {
    // Update an existing note or throw a 404 if it's not found.
    const note = await this.notesRepository.updateNote(id, title, content, isArchived);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async deleteNote(id: number) {
    // Delete a note by ID or throw a 404 if it doesn't exist.
    const success = await this.notesRepository.deleteNote(id);
    if (!success) throw new NotFoundException('Note not found');
  }

  async addTagToNote(noteId: number, tagName: string) {
    // Add a tag to a note by ID or throw a 404 if the note doesn't exist.
    const note = await this.notesRepository.addTagToNote(noteId, tagName);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  async removeTagFromNote(noteId: number, tagId: number) {
    // Removes a tag from a note, validates the existence of the note.
    const note = await this.notesRepository.removeTagFromNote(noteId, tagId);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }

  getNotesByTag(tagId: number) {
    // Retrieves all notes associated with a specific tag.
    return this.notesRepository.findNotesByTag(tagId);
  }

  getAllTags() {
    // Get all available tags.
    return this.notesRepository.findAllTags();
  }
}