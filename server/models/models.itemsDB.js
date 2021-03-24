const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    Author: {
        type: String,
        required: [true,"What's the name of this item?"],
        minlength: [2,"Gotta have at least 2 letters"]
    }
    // Price: {
    //     type: Number,
    //     required: [true,"How much is this item"],
    //     min: [1,"Gotta be at least $1"]
    // },
    // Description:{
    //     type: String,
    //     required: [true,"Describe this item"],
    //     minlength:[14,"Gotta be at least 14 characters"]
    // }

}, {timestamps:true})

const Item = mongoose.model("Items", ItemSchema);

module.exports = Item;