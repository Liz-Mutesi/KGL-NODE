const mongoose = require("mongoose")

const workerSchema = mongoose.Schema({
    name: String,
    branch: String,
    desigantion: String,
})

module.exports = mongoose.model("Worker", workerSchema)

