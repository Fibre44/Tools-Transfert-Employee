const https = require('https');

exports.getDataAPI = (req, res , next)  =>{

  const password = Buffer.from(req.body.login).toString('base64');

    const options = {        
        port: 443,
        method: 'GET',
        headers:{
          Authorization: 'Basic '+password//+req.body.login
     }
  };
  https.get(req.body.url,options, (resp) => {
  let data = '';


  // Un morceau de réponse est reçu
  resp.on('data', (chunk) => {
  data += chunk;
  console.log(res.status);
  });

  // La réponse complète à été reçue. On affiche le résultat.
  resp.on('end', () => {
  res.status(200).json(data);

  });

  }).on("error", (err) => {
  console.log("Error: " + err.message);
  });
}

exports.postApi = (req, res , next ) =>{

  dataPost=JSON.stringify(req.body.employee)

  const password = Buffer.from(req.body.login).toString('base64');

  const options = {        
      port: 443,
      method: 'POST',
      headers:{
        Authorization: 'Basic '+password,//+req.body.login
        'Content-Type': 'application/json',
        'Content-Length': dataPost.length
     },
    
      
    }
    const reqPost = https.request(req.body.url,options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    
    reqPost.on('error', error => {
      console.error(error)
    })
    
    reqPost.write(dataPost)

    reqPost.end()
    
}

exports.putApi = (req, res , next ) =>{

  dataPost=JSON.stringify(req.body.employee)

  const password = Buffer.from(req.body.login).toString('base64');

  const options = {        
      port: 443,
      method: 'PUT',
      headers:{
        Authorization: 'Basic '+password,//+req.body.login
        'Content-Type': 'application/json',
        'Content-Length': dataPost.length
     },
    
      
    }
    const reqPost = https.request(req.body.url,options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
        process.stdout.write(d)
      })
    })
    
    reqPost.on('error', error => {
      console.error(error)
    })
    
    reqPost.write(dataPost)

    reqPost.end()
    
}

