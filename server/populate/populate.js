/*Loading the .env file and creates environment variables from it
 */
require("dotenv").config();
const mongoose = require("mongoose");
const treeOfLifeGraph = require("./treeoflife.json");
const dangerLevelsGraph = require("./dangerlevels.json");

const speciesModel = require("../db/species.model");
const dangerLevelsModel = require("../db/danger.levels.model");

console.log(process.env.MONGO_URL);
const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
	console.error("Missing MONGO_URL environment variable");
	process.exit(1);
}

const populateSpecies = async () => {
	await speciesModel.deleteMany({});

	const parentBySpecies = {};
	treeOfLifeGraph.links.forEach((nodeLink) => {
		parentBySpecies[nodeLink.target] = parseInt(nodeLink.source);
	});
	const confidenceById = {
		0: "confident",
		1: "incertae sedis in putative position",
		2: "incertae sedis position unspecified",
	};
	const species = treeOfLifeGraph.nodes.map((node) => ({
		name: node.name,
		extinct: node.EXTINCT === "1",
		_id: parseInt(node.id),
		parent: parentBySpecies[node.id],
		confidence: confidenceById[node.CONFIDENCE],
		comment: null
	}));

	await speciesModel.create(...species);
	console.log("Species created");
};

const populateDangerLevels = async () => {
	await dangerLevelsModel.deleteMany({});

	const dangerLevels = dangerLevelsGraph.map(element => ({
		name: element.name,
		level: element.level
	}));
	
	await dangerLevelsModel.create(...dangerLevels);
	console.log("Danger levels created");
}

const main = async () => {
	await mongoose.connect(mongoUrl);

	await populateSpecies();
	await populateDangerLevels();

	await mongoose.disconnect();
};

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
