const https = require('https');
const Employee = require('./../models/Employee');
const CivilRegistration = require('./../models/CivilRegistration');
const Rib = require('./../models/Rib');

exports.identity = (req, res, next) => {

    const matricule = req.body.options.matricule;
    const sessionId = req.body.options.sessionId;

    const password = Buffer.from(req.body.login).toString('base64');
    const urlIdentity =process.env.URLAPI+"v1/Employee/OData/Identity?folderId="+req.body.options.folderIn
  
    const options = {
          port: 443,
          method: 'GET',
          headers:{
            Authorization: 'Basic '+password//+req.body.login
       }
    };

    //Récupération des données Identity
    https.get(urlIdentity,options, (resp) => {
    let data = '';
  
  
    // Un morceau de réponse est reçu
    resp.on('data', (chunk) => {
    data += chunk;
    console.log(res.status);
    });
  
    // La réponse complète à été reçue. On affiche le résultat.
    resp.on('end', () => {

        const identityJSON = JSON.parse(data);
        const searchMatricule = identityJSON.Items.find(identity => identity.EmployeeId = matricule)
        let sex = ''
        if (searchMatricule.Civility == 'MR'){
          sex = 'H'
        }else{
          sex = 'F'
        }

        const employee = new Employee({
            sessionId : sessionId,
            Sex : sex,
            Address : searchMatricule.Adress1,
            Address2 : searchMatricule.Adress2,
            Address3 : searchMatricule.Adress3,
            PostalCode : searchMatricule.PostCode,
            EmployeeIdOrigin : searchMatricule.EmployeeId,
            ...searchMatricule
        })
        employee.save()
        .then(() => {
            res.status(200).json({message : 'Sauvegarde de l API get Identity ok'});        
        })
        .catch((error) => {
              res.status(404).json({
                error: error
              });
            }
          );
    });
  
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

    //
  }

  exports.civilRegistration = (req, res, next) => {

    const matricule = req.body.options.matricule;
    const sessionId = req.body.options.sessionId;

    const password = Buffer.from(req.body.login).toString('base64');
    const urlCivilty =process.env.URLAPI+"/v1/Employee/OData/CivilRegistration?folderId="+req.body.options.folderIn
  
    const options = {
          port: 443,
          method: 'GET',
          headers:{
            Authorization: 'Basic '+password//+req.body.login
       }
    };

    //Récupération des données Identity
    https.get(urlCivilty,options, (resp) => {
    let data = '';
  
  
    // Un morceau de réponse est reçu
    resp.on('data', (chunk) => {
    data += chunk;
    console.log(res.status);
    });
  
    // La réponse complète à été reçue. On affiche le résultat.
    resp.on('end', () => {

        const civilityJSON = JSON.parse(data);
        const searchMatricule = civilityJSON.Items.find(civility => civility.EmployeeId = matricule)

        Employee.findOne({
          sessionId : sessionId,
          EmployeeIdOrigin : matricule
        })
        .then((employee) => {

          console.log(searchMatricule);

          employee.SocialNumber = searchMatricule.SocialNumber
          employee.BirthDate = searchMatricule.BirthDate

          console.log(employee.SocialNumber);

          employee.save()
          .then(() => res.status(201).json({ message: "Mise à jour de la civilité"}))
          .catch(error => res.status(400).json({ error }));
        })
      
    });
  
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  }

  exports.rib = (req, res, next)=> {

    const matricule = req.body.options.matricule;
    const sessionId = req.body.options.sessionId;

    const password = Buffer.from(req.body.login).toString('base64');
    const urlRib =process.env.URLAPI+"/v1/Employee/OData/RIB?folderId="+req.body.options.folderIn
  
    const options = {
          port: 443,
          method: 'GET',
          headers:{
            Authorization: 'Basic '+password//+req.body.login
       }
    };

    //Récupération des données Identity
    https.get(urlRib,options, (resp) => {
    let data = '';
  
  
    // Un morceau de réponse est reçu
    resp.on('data', (chunk) => {
    data += chunk;
    console.log(res.status);
    });
  
    // La réponse complète à été reçue. On affiche le résultat.
    resp.on('end', () => {

        const ribJSON = JSON.parse(data);
        const searchMatricule = ribJSON.Items.find(rib => rib.EmployeeId = matricule)

        const rib = new Rib({
            sessionId : sessionId,
            ...searchMatricule
        })
        rib.save()
        .then(() => {
            res.status(200).json({message : 'Sauvegarde rib ok'});        
        })
        .catch((error) => {
              res.status(404).json({
                message : 'Echec sauvegarde rib',
                error: error
              });
            }
          );
    });
  
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

  }

  exports.migration = (req, res, next) => {

    const sessionId = req.body.options.sessionId;
    const matricule = req.body.options.matricule;
    const password = Buffer.from(req.body.login).toString('base64');
    const urlPostEmployee =process.env.URLAPI+"/v1/Employee?folderId="+req.body.options.folderOut
    
    Identity.findOne({
      sessionId : sessionId,
      EmployeeId : matricule
    })
    .then((dataSource) => {
      
      const data = {
        Name: dataSource.Name,
        FirstName: dataSource.FirstName,
        Civility: dataSource.Civility,
        Sex: dataSource.Sex,
        Address: dataSource.Adress1,
        Address2: dataSource.Adress2,
        Address3: dataSource.Adress3,
        PostalCode: dataSource.PostCode,
        City: dataSource.City,
        "Country": "string",
        "Establishment": "string",
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

      const options = {
        port: 443,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+password,
          'Content-Length': data.length,

        }
      }
      
      const req = https.request(urlPostEmployee,options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
      req.on('error', error => {
        console.error(error)
      })
      
      req.write(data)
      req.end()    
    })


  
  }