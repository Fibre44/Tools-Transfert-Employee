const mongoose = require('mongoose');
const identitySchema = mongoose.Schema({

    sessionId : {type : String, required : true, unique: true},
    EmployeeId : {type : String, required : true},
    Name : {type : String, required : false},
    FirstName : {type : String, required : false},
    EntryDate : {type : Date, required : false},
    ExitDate : {type : Date, required : false},
    FirstNameBis : {type : String, required : false},
    Surname : {type : String, required : false},
    Civility : {type : String, required : false},
    CivilityLabel : {type : String, required : false},
    Gender : {type : String, required : false},
    GenderLabel : {type : String, required : false},
    BirthName : {type : Date, required : false},
    Adress : {type : String, required : false},
    Adress2 : {type : String, required : false},
    Adress3 : {type : String, required : false},
    PostCode : {type : String, required : false},
    City : {type : String, required : false},
    Country : {type : String, required : false},
    CountryLabel : {type : String, required : false},
    CodeInsee : {type : String, required : false},
    PhoneNumber : {type : String, required : false},
    PhoneMobile : {type : String, required : false},
    Email : {type : String, required : false},
    Establishment : {type : String, required : false},
    EstablishmentLabel : {type : String, required : false},
    Sex : {type : String, required : true}

})

module.exports = mongoose.model ('identity', identitySchema);

