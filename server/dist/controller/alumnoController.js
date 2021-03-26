"use strict";
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
exports.AlumnoController = void 0;
const alumnoEntity_1 = require("../entity/alumnoEntity");
const typeorm_1 = require("typeorm");
class AlumnoController {
    constructor() {
        this.alumnoRepository = typeorm_1.getRepository(alumnoEntity_1.Alumno);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alumnoRepository.find();
        });
    }
    add(alumno) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.alumnoRepository.save(alumno);
        });
    }
}
exports.AlumnoController = AlumnoController;
//# sourceMappingURL=alumnoController.js.map