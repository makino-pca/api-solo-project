const express = require("express");
const app = express();
app.use(express.json());

const playerController = require("./player/player.controller");

const setupExpressServer = () => {
    /* return configured express app */
    app.get("/players", playerController.getAll);
    app.get("/players/:id", playerController.getById);
    app.post("/players", playerController.create);
    app.put("/players/:id", playerController.update);
    app.delete("/players/:id", playerController.delete);

    return app;
};

module.exports = { setupExpressServer };
