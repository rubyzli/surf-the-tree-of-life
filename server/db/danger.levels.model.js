const mongoose = require('mongoose');

const { Schema } = mongoose;

const DangerLevelsSchema = new Schema({
    name: String,
    level: Number
})

module.exports = mongoose.model("DangerLevels", DangerLevelsSchema);