const mongoose = require('mongoose');

const { Schema } = mongoose;

const notesSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    desription:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default: "general"
    },
    date:{
        type:Date,
        default: Date.now,
    },
});

module.exports  = mongoose.model('note',notesSchema);