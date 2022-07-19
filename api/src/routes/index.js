const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routesCountry = require("./countries.js");
const routesActivity = require("./activities.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const router = Router();

router.use("/countries", routesCountry);

router.use("/activities", routesActivity);

module.exports = router;
