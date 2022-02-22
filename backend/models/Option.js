const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    session : {type : String, required : true, unique : true},
    employee : {type : String, required : true },
    folderIn : {type : String, required : true },
    folderOut : {type :String, required : true },
    establishment : {type : String, required : true },
    ventil : {type : Boolean,required : true },
    assignmentCode : {type : String, required : true},
    freeZones : {type : Boolean, required : true}

})

module.exports = mongoose.model ('Option', optionSchema);