"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var process = require("process");
var common_1 = require("@nestjs/common"); // Importing Module decorator from NestJS.
var typeorm_1 = require("@nestjs/typeorm"); // Importing TypeOrmModule for database integration.
var notes_module_1 = require("./notes/notes.module"); // Importing NotesModule which contains the notes-related functionality.
var config_1 = require("@nestjs/config");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_NAME,
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true
                }),
                notes_module_1.NotesModule, //The Notes module is imported so that its services, controllers, and entities are available in the AppModule.
            ]
        })
    ], AppModule);
    return AppModule;
}()); //Root module that integrates TypeORM and notes functionality.
exports.AppModule = AppModule;
