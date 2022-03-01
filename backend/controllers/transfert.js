const https = require('https');
const Identity = require('./../models/Identity');
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

        const identity = new Identity({
            sessionId : sessionId,
            ...searchMatricule
        })
        identity.save()
        .then(() => {
            res.status(200).json({message : 'Sauvegarde identiy ok'});        
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

        const civility = new CivilRegistration({
            sessionId : sessionId,
            ...searchMatricule
        })
        civility.save()
        .then(() => {
            res.status(200).json({message : 'Sauvegarde civilité ok'});        
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


    Identity.findOne({
      sessionId : sessionId,
      EmployeeId : matricule
    })
    .then ((data) => {

      const identityJSON = JSON.parse(data)
      console.log (identityJSON);

 
    })


  }