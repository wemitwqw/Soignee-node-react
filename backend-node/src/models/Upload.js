const { Schema, model } = require('mongoose')

var imageSchema = new Schema({
    name: String,
    desc: String,
});

const Image = model("Image", imageSchema)

module.exports = Image