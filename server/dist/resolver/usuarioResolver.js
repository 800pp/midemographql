"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UsuarioResolver = void 0;
const usuarioEntity_1 = require("../entity/usuarioEntity");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const argon = __importStar(require("argon2"));
let FieldError = class FieldError {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    type_graphql_1.ObjectType()
], FieldError);
let UsuarioResponse = class UsuarioResponse {
};
__decorate([
    type_graphql_1.Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UsuarioResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", usuarioEntity_1.Usuario)
], UsuarioResponse.prototype, "usuario", void 0);
UsuarioResponse = __decorate([
    type_graphql_1.ObjectType()
], UsuarioResponse);
let UsuarioResolver = class UsuarioResolver {
    constructor() {
        this.usuarioRepository = typeorm_1.getRepository(usuarioEntity_1.Usuario);
    }
    findAllUsuario() {
        return this.usuarioRepository.find();
    }
    findOneUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const esteAlumno = yield this.usuarioRepository.findOneOrFail(id);
            return {
                usuario: esteAlumno,
                errors: [
                    {
                        field: "api",
                        message: "Error con el api",
                    },
                ],
            };
        });
    }
    saveUsuario(nombre, contrasena, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield argon.hash(contrasena);
            if (nombre.length <= 4) {
                return {
                    errors: [
                        {
                            field: "nombre",
                            message: "El nombre debe tener más de 4 caracteres",
                        },
                    ],
                };
            }
            if (contrasena.length <= 4) {
                return {
                    errors: [
                        {
                            field: "contrasena",
                            message: "La contraseña debe tener más de 4 caracteres",
                        },
                    ],
                };
            }
            const esteAlumno = yield this.usuarioRepository.create({
                nombre: nombre,
                contrasena: hash,
            });
            const nuevoAlumno = yield this.usuarioRepository.save(esteAlumno);
            req.session.usuarioId = nuevoAlumno.id;
            return {
                usuario: nuevoAlumno,
            };
        });
    }
    updateNombreUsuario(id, nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const esteUsuario = yield this.usuarioRepository.findOne(id);
            if (!esteUsuario) {
                return null;
            }
            esteUsuario.nombre = nombre || esteUsuario.nombre;
            return this.usuarioRepository.save(esteUsuario);
        });
    }
    updateContrasenaUsuario(contrasena) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const esteUsuario = yield this.usuarioRepository.findOneOrFail();
                const nuevaContrasena = yield argon.hash(contrasena);
                esteUsuario.contrasena = nuevaContrasena;
                return this.usuarioRepository.save(esteUsuario);
            }
            catch (_a) {
                return null;
            }
        });
    }
    deleteUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const esteUsuario = yield this.usuarioRepository.findOneOrFail(id);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    logIn(nombre, contrasena, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parcialAlumno = this.usuarioRepository.create({
                    nombre: nombre,
                });
                const esteAlumno = yield this.usuarioRepository.findOneOrFail(parcialAlumno);
                if (!(yield argon.verify(esteAlumno.contrasena, contrasena))) {
                    return {
                        errors: [
                            {
                                field: "contraseña",
                                message: "Las contraseñas no coinciden",
                            },
                        ],
                        usuario: esteAlumno,
                    };
                }
                req.session.usuarioId = esteAlumno.id;
                return {
                    usuario: esteAlumno,
                };
            }
            catch (err) {
                if ((err.code = "INTERNAL_SERVER_ERROR")) {
                    return {
                        errors: [
                            {
                                field: "usuario",
                                message: "No se encuentra usuario",
                            },
                        ],
                    };
                }
                return {
                    errors: [
                        {
                            field: "qpi",
                            message: "Hubo un problema con el api",
                        },
                    ],
                };
            }
        });
    }
    verificarSesion({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.session.usuarioId);
                return yield this.usuarioRepository.findOneOrFail({
                    id: req.session.usuarioId,
                });
            }
            catch (_a) {
                return null;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [usuarioEntity_1.Usuario]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioResolver.prototype, "findAllUsuario", null);
__decorate([
    type_graphql_1.Query(() => UsuarioResponse, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "findOneUsuario", null);
__decorate([
    type_graphql_1.Mutation(() => UsuarioResponse),
    __param(0, type_graphql_1.Arg("nombre", () => String)),
    __param(1, type_graphql_1.Arg("contrasena", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "saveUsuario", null);
__decorate([
    type_graphql_1.Mutation(() => usuarioEntity_1.Usuario, { nullable: true }),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("nombre", () => String, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "updateNombreUsuario", null);
__decorate([
    type_graphql_1.Mutation(() => usuarioEntity_1.Usuario, { nullable: true }),
    __param(0, type_graphql_1.Arg("contrasena", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "updateContrasenaUsuario", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "deleteUsuario", null);
__decorate([
    type_graphql_1.Query(() => UsuarioResponse),
    __param(0, type_graphql_1.Arg("nombre", () => String)),
    __param(1, type_graphql_1.Arg("contrasena", () => String)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "logIn", null);
__decorate([
    type_graphql_1.Query(() => usuarioEntity_1.Usuario, { nullable: true }),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuarioResolver.prototype, "verificarSesion", null);
UsuarioResolver = __decorate([
    type_graphql_1.Resolver()
], UsuarioResolver);
exports.UsuarioResolver = UsuarioResolver;
//# sourceMappingURL=usuarioResolver.js.map