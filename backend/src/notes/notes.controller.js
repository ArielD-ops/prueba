"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesController = void 0;
// NotesController: exposes endpoints for managing notes and their tags.
const common_1 = require("@nestjs/common");
const notes_service_1 = require("./notes.service");
let NotesController = class NotesController {
    // We inject NotesService to separate responsibility:
    // This controller is responsible for receiving requests,
    // The service does the business logic.
    constructor(notesService) {
        this.notesService = notesService;
    }
    // Create a new note with provided title and content.
    createNote(body) {
        return this.notesService.createNote(body.title, body.content);
    }
    // Returns the list of notes that have not yet been archived.
    getActiveNotes() {
        return this.notesService.getActiveNotes();
    }
    // Show all notes marked as archived.
    getArchivedNotes() {
        return this.notesService.getArchivedNotes();
    }
    // Update the title, content, or archiving status of a note.
    updateNote(
    // The ID of the note to update is passed as a parameter.
    id, body) {
        return this.notesService.updateNote(id, body.title, body.content, body.isArchived);
    }
    // Delete a note by its ID.
    deleteNote(id) {
        return this.notesService.deleteNote(id);
    }
    // Add an existing or new tag to the indicated note.
    addTagToNote(id, body) {
        return this.notesService.addTagToNote(id, body.tagName);
    }
    // Removes the relationship between note and tag.
    removeTagFromNote(id, tagId) {
        return this.notesService.removeTagFromNote(id, tagId);
    }
    // List all notes that share a specific tag
    getNotesByTag(tagId) {
        return this.notesService.getNotesByTag(tagId);
    }
    // Returns the complete catalog of available tags.
    getAllTags() {
        return this.notesService.getAllTags();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getActiveNotes", null);
__decorate([
    (0, common_1.Get)('archived'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getArchivedNotes", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "deleteNote", null);
__decorate([
    (0, common_1.Post)(':id/tags'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "addTagToNote", null);
__decorate([
    (0, common_1.Delete)(':id/tags/:tagId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tagId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "removeTagFromNote", null);
__decorate([
    (0, common_1.Get)('tags/:tagId'),
    __param(0, (0, common_1.Param)('tagId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getNotesByTag", null);
__decorate([
    (0, common_1.Get)('tags'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getAllTags", null);
NotesController = __decorate([
    (0, common_1.Controller)('notes'),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
exports.NotesController = NotesController;
