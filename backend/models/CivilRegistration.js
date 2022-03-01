const mongoose = require('mongoose');
const civilRegistrationSchema = mongoose.Schema({

    sessionId : {type : String, required : true, unique: true},
    NationalityLabel : {type : String, required : false},
    BirthDate : {type : Date, required : false},
    BirthCountry : {type : String, required : false},
    BirthCountryLabel : {type : String, required : false},
    SocialNumber : {type : String, required : false},
    OtherSocialNumber : {type : String, required : false},
    FamilyStatus : {type : String, required : false},
    FamilyStatusLabel : {type : String, required : false},
    ResidencePermitNumber : {type : String, required : false},
    ResidencePermitDeliveredBy : {type : String, required : false},
    ResidencePermitExpirationDate : {type : Date, required : false},
    EmployeeId : {type : String, required : true},
    Name : {type : String, required : true},
    FirstName : {type : String, required : false},
    EntryDate : {type : Date, required : false},
    ExitDate : {type : Date, required : false}

})

module.exports = mongoose.model('civilRegistration',civilRegistrationSchema);

/**
 * Nationality": "string",
      "NationalityLabel": "string",
      "BirthDate": "2022-03-01T17:06:23.358Z",
      "BirthCountry": "string",
      "BirthCountryLabel": "string",
      "BirthDepartment": "string",
      "BirthCityLabel": "string",
      "SocialNumber": "string",
      "OtherSocialNumber": "string",
      "FamilyStatus": "string",
      "FamilyStatusLabel": "string",
      "ResidencePermitNumber": "string",
      "ResidencePermitDeliveredBy": "string",
      "ResidencePermitExpirationDate": "2022-03-01T17:06:23.358Z",
      "EmployeeId": "string",
      "Name": "string",
      "FirstName": "string",
      "EntryDate": "2022-03-01T17:06:23.358Z",
      "ExitDate": "2022-03-01T17:06:23.358Z"
 */