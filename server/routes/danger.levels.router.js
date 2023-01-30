const {Router} = require('express');
const dangerLevelsModel = require('../db/danger.levels.model');

const DangerLevelsRouter = new Router();

DangerLevelsRouter.get("/", async (req, res) => {
    const dangerLevels = await dangerLevelsModel.find();
    return res.json(dangerLevels);
})

module.exports = DangerLevelsRouter;