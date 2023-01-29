const { json } = require('body-parser');
const {Router} = require('express');
const InputSpeciesModel = require('../db/input.species.model');

const InputSpeciesRouter = new Router();

InputSpeciesRouter.get("/", async (req, res) => {
    const inputSpecies = await InputSpeciesModel.find({});
    return res.json(inputSpecies);
})

InputSpeciesRouter.post("/", async (req, res, next) => {
    const species = req.body;
    
    try {
        const saved = await InputSpeciesModel.create(species)
        return res.json(saved)
    } catch(err) {
        return next(err);
    }
})

module.exports = InputSpeciesRouter;