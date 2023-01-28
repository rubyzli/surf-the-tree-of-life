const { Router } = require("express");
const SpeciesModel = require("../db/species.model");

const speciesRouter = new Router();

speciesRouter.get("/", async (req, res) => {
	const species = await SpeciesModel.find()
		.limit(100)
		.sort({ created: "asc" });
	return res.json(species);
});

speciesRouter.get('/search', async(req, res) => {
	let searchQuery = req.query.search;
	let searchedSpecies = await SpeciesModel.find({ name: { $regex: `^${searchQuery}`, $options: 'i'}})
	res.json(searchedSpecies);
})

  

module.exports = speciesRouter;
