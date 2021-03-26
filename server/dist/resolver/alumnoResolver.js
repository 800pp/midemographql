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
exports.AlumnoResolver = void 0;
const alumnoEntity_1 = require("../entity/alumnoEntity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
let AlumnoResolver = class AlumnoResolver {
    constructor() {
        this.alumnoRepository = typeorm_1.getRepository(alumnoEntity_1.Alumno);
    }
    findAllAlumno() {
        return this.alumnoRepository.find();
    }
    findOneAlumno(id) {
        return this.alumnoRepository.findOne(id);
    }
    saveAlumno(nombre, edad) {
        return __awaiter(this, void 0, void 0, function* () {
            const nuevoAlumno = yield this.alumnoRepository.create({ nombre: nombre, edad: edad });
            return this.alumnoRepository.save(nuevoAlumno);
        });
    }
    updateAlumno(id, nombre, edad) {
        return __awaiter(this, void 0, void 0, function* () {
            const esteAlumno = yield this.alumnoRepository.findOne(id);
            if (!esteAlumno) {
                return null;
            }
            esteAlumno.nombre = nombre || esteAlumno.nombre;
            esteAlumno.edad = edad || esteAlumno.edad;
            return this.alumnoRepository.save(esteAlumno);
        });
    }
    deleteAlumno(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const esteAlumno = yield this.alumnoRepository.findOneOrFail(id);
                this.alumnoRepository.delete(esteAlumno);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [alumnoEntity_1.Alumno]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlumnoResolver.prototype, "findAllAlumno", null);
__decorate([
    type_graphql_1.Query(() => alumnoEntity_1.Alumno, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlumnoResolver.prototype, "findOneAlumno", null);
__decorate([
    type_graphql_1.Mutation(() => alumnoEntity_1.Alumno),
    __param(0, type_graphql_1.Arg("nombre", () => String)),
    __param(1, type_graphql_1.Arg("edad", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], AlumnoResolver.prototype, "saveAlumno", null);
__decorate([
    type_graphql_1.Mutation(() => alumnoEntity_1.Alumno, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("nombre", () => String, { nullable: true })),
    __param(2, type_graphql_1.Arg("edad", () => type_graphql_1.Int, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], AlumnoResolver.prototype, "updateAlumno", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlumnoResolver.prototype, "deleteAlumno", null);
AlumnoResolver = __decorate([
    type_graphql_1.Resolver()
], AlumnoResolver);
exports.AlumnoResolver = AlumnoResolver;
//# sourceMappingURL=alumnoResolver.js.map