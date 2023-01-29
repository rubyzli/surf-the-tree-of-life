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

InputSpeciesRouter.delete("/:id", async (req, res) => {
    let species = await InputSpeciesModel.findByIdAndDelete(req.params.id);
    return res.send({'Deleted': species})
})

module.exports = InputSpeciesRouter;