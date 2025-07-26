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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
// Note Entity: Represents a note with title, content, file status, and related tags.
const typeorm_1 = require("typeorm");
const tag_entity_1 = require("./tag.entity");
let Note = class Note {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Note.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Note.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Note.prototype, "isArchived", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tag_entity_1.Tag, { cascade: true })
    // Many-to-many relationship with Tag; “cascade: true” creates/updates tags next to the note.
    ,
    (0, typeorm_1.JoinTable)()
    // Generates the intermediate table to link notes and tags.
    ,
    __metadata("design:type", Array)
], Note.prototype, "tags", void 0);
Note = __decorate([
    (0, typeorm_1.Entity)()
    // Marks the class as an entity for TypeORM, generating a “note” table.
], Note);
exports.Note = Note;
