const mongoose = require("mongoose")

const workerSchema = mongoose.Schema({
    name: String,
    branch: String,
    position: String,
    department: String,
})

module.exports = mongoose.model("Worker", workerSchema)

