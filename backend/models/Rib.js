const mongoose = require('mongoose');

const ribSchema = mongoose.Schema ({

    sessionId : {type : String, required : true, unique: true},
    Auxiliary : {type : String, required : true},
    BankStatmentNb : {type : Number, required : true },
    BankName : {type : String, required : false },
    City : {type : String, required : false},
    Country : {type : String, required : false},
    CountryLabel : {type : String, required : false},
    Currency : {type : String, required : false},
    BICCode : {type : String, required : false},
    Company : {type : String, required : false},
    BankStatmentForPayroll : {type : Boolean, required : false},
    AdvanceBankStatment : {type : Boolean, required : false},
    ProfFeesBankStatment : {type : Boolean, required : false},
    IbanCode : {type : String, required : true},
    EmployeeId : {type : String, required : true},
    Name : {type : String, required : false},
    FirstName : {type : String, required : false},
    EntryDate : {type : Date, required : false},
    ExitDate : {type : Date, required : false}

})

module.exports = mongoose.model('rib',ribSchema);


/**
 * "Id": "00000000-0000-0000-0000-000000000000",
      "Auxiliary": "string",
      "BankStatmentNb": 0,
      "IsMainBankStatment": true,
      "BankName": "string",
      "City": "string",
      "Country": "string",
      "CountryLabel": "string",
      "Currency": "string",
      "BICCode": "string",
      "Company": "string",
      "BankStatmentForPayroll": true,
      "AdvanceBankStatment": true,
      "ProfFeesBankStatment": true,
      "IbanCode": "string",
      "EmployeeId": "string",
      "Name": "string",
      "FirstName": "string",
      "EntryDate": "2022-03-01T17:06:23.365Z",
      "ExitDate": "2022-03-01T17:06:23.365Z"
 */