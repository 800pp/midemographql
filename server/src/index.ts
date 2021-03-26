import "reflect-metadata";
import { App } from "./app";

App.initServer()
  .then((_) => {
    console.log("Aviso: Conexión segura!");
  })
  .catch((error) => {
    console.log(error);
  });

/*Error de conexion con respecto al usuario y contreseña con mysql8.0: 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '0000';
flush privileges;
en el workbench*/

/*
import * as express from 'express'
import {Routes} from "./routes/Routes";
import bodyParser = require("body-parser");
class App {
public app: express.Application;
    public routePrv: Routes;
constructor() {
// initializing express in this application
        this.app = express();
// support application/json type post data
        this.app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
// for routing the http request to controller
        this.routePrv = new Routes();
        this.routePrv.routes(this.app);
}
}
export default new App().app;
*/
