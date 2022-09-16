const mongoose = require("mongoose")

const workerSchema = mongoose.Schema({
    name: String,
    branch: String,
    role: String,
    department: String,
})

module.exports = mongoose.model("Worker", workerSchema)

