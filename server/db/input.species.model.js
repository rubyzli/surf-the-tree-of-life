const mongoose = require("mongoose");

const { Schema } = mongoose;

const InputSpeciesSchema = new Schema({
	name: String,
	extinct: Boolean,
	parent: Number,
	confidence: String,
	comment: String, 
    description: String,
	dangerlevel: String
});

module.exports = mongoose.model("InputSpecies", InputSpeciesSchema);