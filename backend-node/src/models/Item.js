const { Schema, model } = require('mongoose')

const itemSchema = new Schema({
  brandName: { type: String, required: true },
  model: { type: String, required: true},
  quality: { type: Number, enum: [1,2,3,4,5,6,7,8,9,10], required: true },
  approved: { type: Boolean, default: true },
  description: { type: String,  default: '' },
  photo: { type: String, required: true},
  price: { type: Number, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Item = model("Item", itemSchema)

module.exports = Item