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
exports.Tag = void 0;
// Tag Entity: defines each tag assignable to a note, with its identifier and name.
const typeorm_1 = require("typeorm");
let Tag = class Tag {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
    // Unique identifier for each tag.
    ,
    __metadata("design:type", Number)
], Tag.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
    // Name of the tag, which can be used to categorize notes.
    ,
    __metadata("design:type", String)
], Tag.prototype, "name", void 0);
Tag = __decorate([
    (0, typeorm_1.Entity)()
    // Marks the class as an entity for TypeORM, generating a “tag” table.
], Tag);
exports.Tag = Tag;
