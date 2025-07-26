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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
// NotesService: Handles the notes business logic and translates errors into HTTP exceptions.
const common_1 = require("@nestjs/common");
const notes_repository_1 = require("./notes.repository");
let NotesService = class NotesService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    // Injected repository for all data operations.
    createNote(title, content) {
        return this.notesRepository.createNote(title, content);
    }
    getActiveNotes() {
        return this.notesRepository.findActiveNotes();
    }
    getArchivedNotes() {
        return this.notesRepository.findArchivedNotes();
    }
    updateNote(id, title, content, isArchived) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update an existing note or throw a 404 if it's not found.
            const note = yield this.notesRepository.updateNote(id, title, content, isArchived);
            if (!note)
                throw new common_1.NotFoundException('Note not found');
            return note;
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete a note by ID or throw a 404 if it doesn't exist.
            const success = yield this.notesRepository.deleteNote(id);
            if (!success)
                throw new common_1.NotFoundException('Note not found');
        });
    }
    addTagToNote(noteId, tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add a tag to a note by ID or throw a 404 if the note doesn't exist.
            const note = yield this.notesRepository.addTagToNote(noteId, tagName);
            if (!note)
                throw new common_1.NotFoundException('Note not found');
            return note;
        });
    }
    removeTagFromNote(noteId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Removes a tag from a note, validates the existence of the note.
            const note = yield this.notesRepository.removeTagFromNote(noteId, tagId);
            if (!note)
                throw new common_1.NotFoundException('Note not found');
            return note;
        });
    }
    getNotesByTag(tagId) {
        // Retrieves all notes associated with a specific tag.
        return this.notesRepository.findNotesByTag(tagId);
    }
    getAllTags() {
        // Get all available tags.
        return this.notesRepository.findAllTags();
    }
};
NotesService = __decorate([
    (0, common_1.Injectable)()
    // Allows NestJS to inject this service where needed
    ,
    __metadata("design:paramtypes", [notes_repository_1.NotesRepository])
], NotesService);
exports.NotesService = NotesService;
