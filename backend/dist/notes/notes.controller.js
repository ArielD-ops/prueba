"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.NotesController = void 0;
// NotesController: exposes endpoints for managing notes and their tags.
var common_1 = require("@nestjs/common");
var NotesController = /** @class */ (function () {
    // We inject NotesService to separate responsibility:
    // This controller is responsible for receiving requests,
    // The service does the business logic.
    function NotesController(notesService) {
        this.notesService = notesService;
    }
    // Create a new note with provided title and content.
    NotesController.prototype.createNote = function (body) {
        return this.notesService.createNote(body.title, body.content);
    };
    // Returns the list of notes that have not yet been archived.
    NotesController.prototype.getActiveNotes = function () {
        return this.notesService.getActiveNotes();
    };
    // Show all notes marked as archived.
    NotesController.prototype.getArchivedNotes = function () {
        return this.notesService.getArchivedNotes();
    };
    // Update the title, content, or archiving status of a note.
    NotesController.prototype.updateNote = function (
    // The ID of the note to update is passed as a parameter.
    id, body) {
        return this.notesService.updateNote(id, body.title, body.content, body.isArchived);
    };
    // Delete a note by its ID.
    NotesController.prototype.deleteNote = function (id) {
        return this.notesService.deleteNote(id);
    };
    // Add an existing or new tag to the indicated note.
    NotesController.prototype.addTagToNote = function (id, body) {
        return this.notesService.addTagToNote(id, body.tagName);
    };
    // Removes the relationship between note and tag.
    NotesController.prototype.removeTagFromNote = function (id, tagId) {
        return this.notesService.removeTagFromNote(id, tagId);
    };
    // List all notes that share a specific tag
    NotesController.prototype.getNotesByTag = function (tagId) {
        return this.notesService.getNotesByTag(tagId);
    };
    // Returns the complete catalog of available tags.
    NotesController.prototype.getAllTags = function () {
        return this.notesService.getAllTags();
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], NotesController.prototype, "createNote");
    __decorate([
        (0, common_1.Get)()
    ], NotesController.prototype, "getActiveNotes");
    __decorate([
        (0, common_1.Get)('archived')
    ], NotesController.prototype, "getArchivedNotes");
    __decorate([
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)())
    ], NotesController.prototype, "updateNote");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe))
    ], NotesController.prototype, "deleteNote");
    __decorate([
        (0, common_1.Post)(':id/tags'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Body)())
    ], NotesController.prototype, "addTagToNote");
    __decorate([
        (0, common_1.Delete)(':id/tags/:tagId'),
        __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
        __param(1, (0, common_1.Param)('tagId', common_1.ParseIntPipe))
    ], NotesController.prototype, "removeTagFromNote");
    __decorate([
        (0, common_1.Get)('tags/:tagId'),
        __param(0, (0, common_1.Param)('tagId', common_1.ParseIntPipe))
    ], NotesController.prototype, "getNotesByTag");
    __decorate([
        (0, common_1.Get)('tags')
    ], NotesController.prototype, "getAllTags");
    NotesController = __decorate([
        (0, common_1.Controller)('notes')
    ], NotesController);
    return NotesController;
}());
exports.NotesController = NotesController;
