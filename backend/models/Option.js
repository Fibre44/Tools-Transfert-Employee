const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
    sessionId : {type : String, required : true, unique : true},
    matricule : {type : String, required : true },
    folderIn : {type : String, required : true },
    folderOut : {type :String, required : true },
    establishment : {type : String, required : true }

})

module.exports = mongoose.model ('Option', optionSchema);