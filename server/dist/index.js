"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./app");
app_1.App.initServer()
    .then((_) => {
    console.log("Aviso: Conexión segura!");
})
    .catch((error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map