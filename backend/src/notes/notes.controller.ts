// NotesController: exposes endpoints for managing notes and their tags.
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  // We inject NotesService to separate responsibility:
// This controller is responsible for receiving requests,
// The service does the business logic.
  constructor(private notesService: NotesService) {}
  // Create a new note with provided title and content.
  @Post()
  createNote(@Body() body: { title: string; content: string }) {
    return this.notesService.createNote(body.title, body.content);
  }
// Returns the list of notes that have not yet been archived.
  @Get()
  getActiveNotes() {
    return this.notesService.getActiveNotes();
  }
// Show all notes marked as archived.
  @Get('archived')
  getArchivedNotes() {
    return this.notesService.getArchivedNotes();
  }
  
  // Update the title, content, or archiving status of a note.
  @Put(':id')
  updateNote(
    // The ID of the note to update is passed as a parameter.
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { title: string; content: string; isArchived: boolean },
  ) {
    return this.notesService.updateNote(id, body.title, body.content, body.isArchived);
  }
  // Delete a note by its ID.
  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) id: number) {
    return this.notesService.deleteNote(id);
  }
  // Add an existing or new tag to the indicated note.
  @Post(':id/tags')
  addTagToNote(@Param('id', ParseIntPipe) id: number, @Body() body: { tagName: string }) {
    return this.notesService.addTagToNote(id, body.tagName);
  }
  // Removes the relationship between note and tag.
  @Delete(':id/tags/:tagId')
  removeTagFromNote(@Param('id', ParseIntPipe) id: number, @Param('tagId', ParseIntPipe) tagId: number) {
    return this.notesService.removeTagFromNote(id, tagId);
  }
  // List all notes that share a specific tag
  @Get('tags/:tagId')
  getNotesByTag(@Param('tagId', ParseIntPipe) tagId: number) {
    return this.notesService.getNotesByTag(tagId);
  }
  // Returns the complete catalog of available tags.
  @Get('tags')
  getAllTags() {
    return this.notesService.getAllTags();
  }
}