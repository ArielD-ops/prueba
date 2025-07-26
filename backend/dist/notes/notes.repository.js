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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.NotesRepository = void 0;
// NotesRepository: Manages interaction with the database for notes and tags.
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var note_entity_1 = require("./entities/note.entity");
var tag_entity_1 = require("./entities/tag.entity");
var NotesRepository = /** @class */ (function () {
    function NotesRepository(noteRepository, tagRepository) {
        this.noteRepository = noteRepository;
        this.tagRepository = tagRepository;
    }
    NotesRepository.prototype.createNote = function (title, content) {
        return __awaiter(this, void 0, void 0, function () {
            var note;
            return __generator(this, function (_a) {
                note = this.noteRepository.create({ title: title, content: content, isArchived: false });
                return [2 /*return*/, this.noteRepository.save(note)];
            });
        });
    };
    NotesRepository.prototype.findActiveNotes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Recover all unarchived notes along with their labels.
                return [2 /*return*/, this.noteRepository.find({ where: { isArchived: false }, relations: ['tags'] })];
            });
        });
    };
    NotesRepository.prototype.findArchivedNotes = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Recover all archived notes along with their labels.
                return [2 /*return*/, this.noteRepository.find({ where: { isArchived: true }, relations: ['tags'] })];
            });
        });
    };
    NotesRepository.prototype.findNoteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Search for a note by its ID, including related tags
                return [2 /*return*/, this.noteRepository.findOne({ where: { id: id }, relations: ['tags'] })];
            });
        });
    };
    NotesRepository.prototype.updateNote = function (id, title, content, isArchived) {
        return __awaiter(this, void 0, void 0, function () {
            var note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findNoteById(id)];
                    case 1:
                        note = _a.sent();
                        if (!note)
                            return [2 /*return*/, null];
                        note.title = title;
                        note.content = content;
                        note.isArchived = isArchived;
                        return [2 /*return*/, this.noteRepository.save(note)];
                }
            });
        });
    };
    NotesRepository.prototype.deleteNote = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.noteRepository["delete"](id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.affected > 0];
                }
            });
        });
    };
    NotesRepository.prototype.addTagToNote = function (noteId, tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var note, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findNoteById(noteId)];
                    case 1:
                        note = _a.sent();
                        if (!note)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.tagRepository.findOne({ where: { name: tagName } })];
                    case 2:
                        tag = _a.sent();
                        if (!!tag) return [3 /*break*/, 4];
                        tag = this.tagRepository.create({ name: tagName });
                        return [4 /*yield*/, this.tagRepository.save(tag)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        note.tags = note.tags || [];
                        if (!note.tags.some(function (t) { return t.id === tag.id; })) {
                            note.tags.push(tag);
                        }
                        return [2 /*return*/, this.noteRepository.save(note)];
                }
            });
        });
    };
    NotesRepository.prototype.removeTagFromNote = function (noteId, tagId) {
        return __awaiter(this, void 0, void 0, function () {
            var note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findNoteById(noteId)];
                    case 1:
                        note = _a.sent();
                        if (!note)
                            return [2 /*return*/, null];
                        note.tags = note.tags.filter(function (tag) { return tag.id !== tagId; });
                        return [2 /*return*/, this.noteRepository.save(note)];
                }
            });
        });
    };
    NotesRepository.prototype.findNotesByTag = function (tagId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Retrieves all notes associated with a specific tag.
                return [2 /*return*/, this.noteRepository.find({ where: { tags: { id: tagId } }, relations: ['tags'] })];
            });
        });
    };
    NotesRepository.prototype.findAllTags = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Returns all tags available in the database
                return [2 /*return*/, this.tagRepository.find()];
            });
        });
    };
    NotesRepository = __decorate([
        (0, common_1.Injectable)()
        // Mark the class for dependency injection in NestJS.
        ,
        __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note))
        // TypeORM repository for operations on Note.
        ,
        __param(1, (0, typeorm_1.InjectRepository)(tag_entity_1.Tag))
    ], NotesRepository);
    return NotesRepository;
}());
exports.NotesRepository = NotesRepository;
