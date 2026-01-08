const mongoose = require("mongoose");

const cricketSchema = mongoose.Schema({
    pName: {
        type: String,
    },
    profes: {
        type: String,
    },
    number: {
        type: Number,
    },
});

module.exports = mongoose.model("Cricket", cricketSchema);