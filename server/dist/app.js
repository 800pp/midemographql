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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.App = void 0;
const typeorm_1 = require("typeorm");
const express = __importStar(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const alumnoResolver_1 = require("./resolver/alumnoResolver");
const usuarioResolver_1 = require("./resolver/usuarioResolver");
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
class App {
    static initServer() {
        return __awaiter(this, void 0, void 0, function* () {
            typeorm_1.createConnection();
            const app = express.default();
            const options = {
                host: "localhost",
                port: 3306,
                user: "root",
                password: "0000",
                database: "server1",
            };
            const sessionStore = new MySQLStore(options);
            app.use(session({
                key: "cookie1",
                name: "cookie1",
                secret: "algunsecreto",
                store: sessionStore,
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24,
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                },
            }));
            const apollo = new apollo_server_express_1.ApolloServer({
                schema: yield type_graphql_1.buildSchema({
                    resolvers: [alumnoResolver_1.AlumnoResolver, usuarioResolver_1.UsuarioResolver],
                    validate: false,
                }),
                context: ({ res, req }) => ({ res, req }),
            });
            apollo.applyMiddleware({
                app,
                cors: {
                    origin: ["http://localhost:3000", "http://localhost:4000"],
                    credentials: true,
                },
            });
            app.listen(4000);
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map