"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesModule = void 0;
// Note Management Module
// - Groups everything needed to create, read, update, and delete notes.
// - Connects Note and Tag entities to the database via TypeORM.
// - Exposes the controller and providers that orchestrate the logic and data access.
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const note_entity_1 = require("./entities/note.entity");
const tag_entity_1 = require("./entities/tag.entity");
const notes_controller_1 = require("./notes.controller");
const notes_service_1 = require("./notes.service");
const notes_repository_1 = require("./notes.repository");
let NotesModule = class NotesModule {
}; //Module in charge of all the functionality related to notes and labels.
NotesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([note_entity_1.Note, tag_entity_1.Tag])],
        controllers: [notes_controller_1.NotesController],
        providers: [notes_service_1.NotesService, notes_repository_1.NotesRepository],
    })
], NotesModule);
exports.NotesModule = NotesModule;
