const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type:String},
    price:{type:String},
    description:{type:String},
    category:{type:String},
    image:{},
    rating: {type: Number, default: 0}
})
module.exports = Product = mongoose.model('products', productSchema)