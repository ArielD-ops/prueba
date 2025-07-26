"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NotesModule = void 0;
// Note Management Module
// - Groups everything needed to create, read, update, and delete notes.
// - Connects Note and Tag entities to the database via TypeORM.
// - Exposes the controller and providers that orchestrate the logic and data access.
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var note_entity_1 = require("./entities/note.entity");
var tag_entity_1 = require("./entities/tag.entity");
var notes_controller_1 = require("./notes.controller");
var notes_service_1 = require("./notes.service");
var notes_repository_1 = require("./notes.repository");
var NotesModule = /** @class */ (function () {
    function NotesModule() {
    }
    NotesModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([note_entity_1.Note, tag_entity_1.Tag])],
            controllers: [notes_controller_1.NotesController],
            providers: [notes_service_1.NotesService, notes_repository_1.NotesRepository]
        })
    ], NotesModule);
    return NotesModule;
}()); //Module in charge of all the functionality related to notes and labels.
exports.NotesModule = NotesModule;
