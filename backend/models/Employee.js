const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({

    sessionId : {type : String, required : true, unique: true},
    EmployeeIdOrigin : {type : String, required : true},
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
    Address : {type : String, required : false},
    Address2 : {type : String, required : false},
    Address3 : {type : String, required : false},
    PostalCode : {type : String, required : false},
    City : {type : String, required : false},
    Country : {type : String, required : false},
    CountryLabel : {type : String, required : false},
    CodeInsee : {type : String, required : false},
    PhoneNumber : {type : String, required : false},
    PhoneMobile : {type : String, required : false},
    Establishment : {type : String, required : false},
    Sex : {type : String, required : true},
    StatisticalCode : {type : String, required : false},
    Organization1 : {type : String, required : false},
    Organization2 : {type : String, required : false},
    Organization3 : {type : String, required : false},
    Organization4 : {type : String, required : false},
    FreeSalary1 : {type : Number, required : false},
    FreeSalary2 : {type : Number, required : false},
    FreeSalary3 : {type : Number, required : false},
    FreeSalary4 : {type : Number, required : false},
    FreeDate1 : {type : Date, required : false},
    FreeDate2 : {type : Date, required : false},
    FreeDate3 : {type : Date, required : false},
    FreeDate4 : {type : Date, required : false},
    FreeBool1 : {type : Boolean, required : false},
    FreeBool2 : {type : Boolean, required : false},
    FreeBool3 : {type : Boolean, required : false},
    FreeBool4 : {type : Boolean, required : false},
    SocialNumber : {type : String, required : false},
    CreateContract : {type : Boolean, required : false}
})

module.exports = mongoose.model ('employee', employeeSchema);

/**
 * {
    "Name": "string",
    "MaidenName": "string",
    "FirstName": "string",
    "Civility": "string",
    "Sex": "string",
    "Address": "string",
    "Address2": "string",
    "Address3": "string",
    "PostalCode": "string",
    "City": "string",
    "Country": "string",
    "Establishment": "string",
    "EmployeeId": "string",
    "StatisticalCode": "string",
    "Organization1": "string",
    "Organization2": "string",
    "Organization3": "string",
    "Organization4": "string",
    "FreeSalary1": 0,
    "FreeSalary2": 0,
    "FreeSalary3": 0,
    "FreeSalary4": 0,
    "FreeSalary5": 0,
    "FreeCombo1": "string",
    "FreeCombo2": "string",
    "FreeCombo3": "string",
    "FreeCombo4": "string",
    "FreeDate1": "2022-03-01T17:06:23.377Z",
    "FreeDate2": "2022-03-01T17:06:23.377Z",
    "FreeDate3": "2022-03-01T17:06:23.377Z",
    "FreeDate4": "2022-03-01T17:06:23.377Z",
    "FreeBool1": true,
    "FreeBool2": true,
    "FreeBool3": true,
    "FreeBool4": true,
    "ResourceId": "string",
    "EntryDate": "2022-03-01T17:06:23.377Z",
    "BirthDate": "2022-03-01T17:06:23.377Z",
    "SocialNumber": "string",
    "CreateContract": true
  }
 */
