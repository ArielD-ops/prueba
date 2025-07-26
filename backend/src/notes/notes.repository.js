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
exports.NotesRepository = void 0;
// NotesRepository: Manages interaction with the database for notes and tags.
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
const tag_entity_1 = require("./entities/tag.entity");
let NotesRepository = class NotesRepository {
    constructor(noteRepository, tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }
    createNote(title, content) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create and save a new note with isArchived status set to false
            const note = this.noteRepository.create({ title, content, isArchived: false });
            return this.noteRepository.save(note);
        });
    }
    findActiveNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Recover all unarchived notes along with their labels.
            return this.noteRepository.find({ where: { isArchived: false }, relations: ['tags'] });
        });
    }
    findArchivedNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            // Recover all archived notes along with their labels.
            return this.noteRepository.find({ where: { isArchived: true }, relations: ['tags'] });
        });
    }
    findNoteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Search for a note by its ID, including related tags
            return this.noteRepository.findOne({ where: { id }, relations: ['tags'] });
        });
    }
    updateNote(id, title, content, isArchived) {
        return __awaiter(this, void 0, void 0, function* () {
            // Updates note fields if it exists and persists changes.
            const note = yield this.findNoteById(id);
            if (!note)
                return null;
            note.title = title;
            note.content = content;
            note.isArchived = isArchived;
            return this.noteRepository.save(note);
        });
    }
    deleteNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Deletes a note by its ID and returns true if successful.
            const result = yield this.noteRepository.delete(id);
            return result.affected > 0;
        });
    }
    addTagToNote(noteId, tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            // Adds a tag to a note by its ID, creating the tag if it doesn't exist.
            const note = yield this.findNoteById(noteId);
            if (!note)
                return null;
            let tag = yield this.tagRepository.findOne({ where: { name: tagName } });
            if (!tag) {
                tag = this.tagRepository.create({ name: tagName });
                yield this.tagRepository.save(tag);
            }
            note.tags = note.tags || [];
            if (!note.tags.some(t => t.id === tag.id)) {
                note.tags.push(tag);
            }
            return this.noteRepository.save(note);
        });
    }
    removeTagFromNote(noteId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Unlinks the indicated tag from the note and saves the change.
            const note = yield this.findNoteById(noteId);
            if (!note)
                return null;
            note.tags = note.tags.filter(tag => tag.id !== tagId);
            return this.noteRepository.save(note);
        });
    }
    findNotesByTag(tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Retrieves all notes associated with a specific tag.
            return this.noteRepository.find({ where: { tags: { id: tagId } }, relations: ['tags'] });
        });
    }
    findAllTags() {
        return __awaiter(this, void 0, void 0, function* () {
            // Returns all tags available in the database
            return this.tagRepository.find();
        });
    }
};
NotesRepository = __decorate([
    (0, common_1.Injectable)()
    // Mark the class for dependency injection in NestJS.
    ,
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note))
    // TypeORM repository for operations on Note.
    ,
    __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag))
    // TypeORM repository for Tag operations.
    ,
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotesRepository);
exports.NotesRepository = NotesRepository;
