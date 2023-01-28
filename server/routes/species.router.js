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

speciesRouter.get("/:id", async (req, res) => {
	const species = await SpeciesModel.findById(req.params.id)
  	return res.json(species);
})

speciesRouter.patch('/:id', async ( req, res) => {
	const species = req.body
	console.log(species)
	SpeciesModel.findByIdAndUpdate(req.params.id, species, {new: true }).then((equipment) => {
		if(!equipment) {  
		  return res.status(404).send(`equipment doesn't exist`)
		}
		console.log('species updated')
		res.send(species)
	  }).catch(error => {
		res.status(500).send(error)
	  })
})

  

module.exports = speciesRouter;
