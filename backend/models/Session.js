const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({

    dateStart :  {type : Date,required : true }
})

module.exports = mongoose.model ('Session', sessionSchema);