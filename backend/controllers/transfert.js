const https = require('https');
const Employee = require('./../models/Employee');
const Rib = require('./../models/Rib');

exports.identity = (req, res, next) => {

  const matricule = req.body.options.matricule;
  const sessionId = req.body.options.sessionId;

  const password = Buffer.from(req.body.login).toString('base64');
  const urlIdentity =process.env.URLAPI+"/v1/Employee/OData/Identity?folderId="+req.body.options.folderIn
  
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

      let identityJSON = JSON.parse(data);
      console.log(identityJSON);
      let searchMatricule = identityJSON.Items.find(identity => identity.EmployeeId = matricule)
      let sex = ''
        if (searchMatricule.Civility == 'MR'){
          sex = 'M'
        }else{
          sex = 'F'
        }

        let employee = new Employee({
            sessionId : sessionId,
            Sex : sex,
            Address : searchMatricule.Adress1,
            Address2 : searchMatricule.Adress2,
            Address3 : searchMatricule.Adress3,
            PostalCode : searchMatricule.PostCode,
            EmployeeIdOrigin : searchMatricule.EmployeeId,
            CreateContract : false,
            ...searchMatricule
        })

        console.log(employee);

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

    let matricule = req.body.options.matricule
    let sessionId = req.body.options.sessionId

    let password = Buffer.from(req.body.login).toString('base64');
    let urlCivilty =process.env.URLAPI+"/v1/Employee/OData/CivilRegistration?folderId="+req.body.options.folderIn
  
    let options = {
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

        let civilityJSON = JSON.parse(data);
        let searchMatriculeCivility = civilityJSON.Items.find(civility => civility.EmployeeId = matricule)

        Employee.findOne({
          sessionId : sessionId,
          EmployeeIdOrigin : matricule
        })
        .then((employee) => {

          employee.SocialNumber = searchMatriculeCivility.SocialNumber
          employee.BirthDate = searchMatriculeCivility.BirthDate 
   
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

    let matricule = req.body.options.matricule;
    let sessionId = req.body.options.sessionId;

    let password = Buffer.from(req.body.login).toString('base64');
    let urlRib =process.env.URLAPI+"/v1/Employee/OData/RIB?folderId="+req.body.options.folderIn
  
    let options = {
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

      let ribJSON = JSON.parse(data);
      let searchMatricule = ribJSON.Items.find(rib => rib.EmployeeId = matricule)

        let rib = new Rib({
            sessionId : sessionId,
            ...searchMatricule
        })
        console.log(rib);
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

    const sessionId = req.body.options.sessionId
    const matricule = req.body.options.matricule
    const establishment = req.body.options.establishment
    const entryDate = req.body.options.date
    const password = Buffer.from(req.body.login).toString('base64');
    const urlPostEmployee =process.env.URLAPI+"/v1/Employee?folderId="+req.body.options.folderOut
    
    Employee.findOne({
      sessionId : sessionId,
      EmployeeIdOrigin : matricule
    })
    .then((dataSource) => {
      console.log(dataSource)
      /**
       * ko à retester
       *delete dataSource._id;
      delete dataSource.sessionId;
      delete dataSource.__v;
      delete dataSource.EmployeeIdOrigin;
       */


      let DataEmployee = {

        Name : dataSource.Name,
        FirstName : dataSource.FirstName,
        EntryDate : entryDate,
        ExitDate : dataSource.ExitDate,
        FirstNameBis : dataSource.FirstNameBis,
        Surname : dataSource.Surname,
        Civility : dataSource.Civility,
        CivilityLabel : dataSource.CivilityLabel,
        Gender : dataSource.Gender,
        GenderLabel : dataSource.GenderLabel,
        BirthName : dataSource.BirthName,
        Address : dataSource.Address,
        Address2 : dataSource.Address2,
        Address3 : dataSource.Address3,
        PostalCode : dataSource.PostalCode,
        City : dataSource.City,
        Country : dataSource.Country,
        CountryLabel : dataSource.CountryLabel,
        CodeInsee : dataSource.CodeInsee,
        PhoneNumber : dataSource.PhoneNumber,
        PhoneMobile : dataSource.PhoneMobile,
        Email : dataSource.Email,
        Establishment : establishment,
        Sex : dataSource.Sex,
        StatisticalCode : dataSource.StatisticalCode,
        Organization1 : dataSource.Organization1,
        Organization2 : dataSource.Organization2,
        Organization3 : dataSource.Organization3,
        Organization4 : dataSource.Organization4,
        FreeSalary1 : dataSource.FreeSalary1,
        FreeSalary2 : dataSource.FreeSalary2,
        FreeSalary3 : dataSource.FreeSalary3,
        FreeSalary4 : dataSource.FreeSalary4,
        FreeDate1 : dataSource.FreeDate1,
        FreeDate2 : dataSource.FreeDate2,
        FreeDate3 : dataSource.FreeDate3,
        FreeDate4 : dataSource.FreeDate4,
        FreeBool1 : dataSource.FreeBool1,
        FreeBool2 : dataSource.FreeBool2,
        FreeBool3 : dataSource.FreeBool3,
        FreeBool4 : dataSource.FreeBool4,
        SocialNumber : dataSource.SocialNumber,
        CreateContract : dataSource.CreateContract
      }


      dataSource.Establishment = establishment
      dataSource.EntryDate = entryDate

      const data = JSON.stringify(DataEmployee)

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
        console.log(`statusCode: ${res.statusCode} `)

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

    //Voir pour récupérer le code matricule en retour de l'API


  
  }