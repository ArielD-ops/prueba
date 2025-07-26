"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Note = void 0;
// Note Entity: Represents a note with title, content, file status, and related tags.
var typeorm_1 = require("typeorm");
var tag_entity_1 = require("./tag.entity");
var Note = /** @class */ (function () {
    // Marks the class as an entity for TypeORM, generating a “note” table.
    function Note() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Note.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Note.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)()
    ], Note.prototype, "content");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], Note.prototype, "isArchived");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return tag_entity_1.Tag; }, { cascade: true })
        // Many-to-many relationship with Tag; “cascade: true” creates/updates tags next to the note.
        ,
        (0, typeorm_1.JoinTable)()
        // Generates the intermediate table to link notes and tags.
    ], Note.prototype, "tags");
    Note = __decorate([
        (0, typeorm_1.Entity)()
        // Marks the class as an entity for TypeORM, generating a “note” table.
    ], Note);
    return Note;
}());
exports.Note = Note;
