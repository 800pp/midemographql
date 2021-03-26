import { createConnection } from "typeorm";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AlumnoResolver } from "./resolver/alumnoResolver";
import { UsuarioResolver } from "./resolver/usuarioResolver";
import { MyContext } from "./types/types";

//NO PROPER TYPES!
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

export class App {
  static async initServer() {
    createConnection();

    const app = express.default();

    const options = {
      host: "localhost",
      port: 3306,
      user: "root",
      password: "0000",
      database: "server1",
    };

    const sessionStore = new MySQLStore(options);

    app.use(
      session({
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
      })
    );

    const apollo = new ApolloServer({
      schema: await buildSchema({
        resolvers: [AlumnoResolver, UsuarioResolver],
        validate: false,
      }),
      context: ({ res, req }): MyContext => ({ res, req }),
    });

    apollo.applyMiddleware({
      app,
      cors: {
        origin: ["http://localhost:3000", "http://localhost:4000"],
        credentials: true,
      },
    });

    app.listen(4000);
  }
}
