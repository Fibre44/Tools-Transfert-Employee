const urlServer = "http://localhost:3000"
const urlAPI = ["v1/Folder/ListFolders","v1/Employee/OData/Identity?folderId=","/v1/Establishment/OData/Establishment?folderId="]
const button = document.getElementsByClassName("button")


function startSession (){

  button[0].addEventListener("click", () => {

    fetch (urlServer+"/session")
    .then((res)=>{
      if (res.ok) {
        return res.json();
    }   
    })
    .then((session)=>{

      sessionStorage.setItem("session",session.idSession);

      document.getElementsByClassName("header__session")[0].textContent = "Session en cours :"+session.idSession;
      
    })
  })
}

startSession()

/**
 * return les éléments de connexion
 */

function getCredentials (){

    const domainLogin = document.getElementsByClassName("step__form__identifiant");
    const password = document.getElementsByClassName("step__form__password");
    const credentials = domainLogin[0].value+':'+password[0].value
    return credentials
}

function getFolderIn (){

  const folderIn = document.getElementById("foldersIn").value;
  const folderInRename = renameFolder(folderIn)
  return folderInRename;
}


function getFolderOut (){

  const folderOut = document.getElementById("foldersOut").value;
  const folderOutRename = renameFolder(folderOut)
  return folderOutRename;

}

//Connexion à l'aide du formulaire

function connexion (){

    button[1].addEventListener("click", function(event) {

        event.preventDefault();

        getData(urlAPI[0])

        .then( (dataFolders) => {

          writeFolders(dataFolders)
          buttonFoldersIn();
        
        })

        .catch((error) => {

          console.error(error)
        })

    })

}

connexion();

//Ecriture des dossiers

/**
 * 
 * @param {data} stepId Id de la liste déroulante
 */

function writeFolders(datas){

  const foldersJSON = JSON.parse(datas);
  const foldersIn = document.getElementById("foldersIn");
  const foldersOut = document.getElementById("foldersOut");

  for (folder of foldersJSON){

    const option = document.createElement("option");
    option.textContent = folder.FolderId

    foldersIn.appendChild(option);
  }

  for (folder of foldersJSON){

    const option = document.createElement("option");
    option.textContent = folder.FolderId

    foldersOut.appendChild(option);
  }
 
}

function buttonFoldersIn(){

  button[2].addEventListener("click", () =>{

    const foldersIn = document.getElementsByClassName("conteneur__select__items");

    const saveFolderIn = document.getElementById("foldersIn").value;
    const writeSaveFolderIn = document.getElementById("optionFolderIn");
    writeSaveFolderIn.textContent = saveFolderIn;

    const foldersOut = document.getElementsByClassName("conteneur__select--display--none");

    foldersOut[0].classList.replace("conteneur__select--display--none","conteneur__select__items");
    foldersIn[0].classList.replace("conteneur__select__items","conteneur__select--display--none");

  })
}

buttonFoldersIn()

function buttonFoldersOut(){

  button[3].addEventListener("click", ()=> {

    const foldersOut = document.getElementsByClassName("conteneur__select__items");

    const saveFolderOut = document.getElementById("foldersIn").value;
    const writeSaveFolderOut = document.getElementById("optionFolderOut");
    writeSaveFolderOut.textContent = saveFolderOut;

    const employees = document.getElementsByClassName("conteneur__select--display--none");

    employees[1].classList.replace("conteneur__select--display--none","conteneur__select__items");
    foldersOut[0].classList.replace("conteneur__select__items","conteneur__select--display--none");

    getEmployees();


  })

}

buttonFoldersOut();
    //récupération des salariés

function buttonEmployees (){

  button[4].addEventListener("click", () => {

    const employees= document.getElementsByClassName("conteneur__select__items");
    const saveEmployee = document.getElementById("optionEmployee");
    saveEmployee.textContent = getMatricule();

    const establishments = document.getElementsByClassName("conteneur__select--display--none");
    establishments[2].classList.replace("conteneur__select--display--none","conteneur__select__items");
    employees[0].classList.replace("conteneur__select__items","conteneur__select--display--none");

    getEstablishments()

  })
}

buttonEmployees();

function getEmployees(){
    getData(urlAPI[1]+getFolderIn())

    .then((employees)=> {
      
      writeEmployees(employees);
    })
    .catch((error) => {
      console.error(error);
    })

}

function buttonEstablishment(){

  button[5].addEventListener("click", () => {

    const establishment= document.getElementsByClassName("conteneur__select__items");
    const saveEstablishment = document.getElementById("establishments").value;
    const writeEstablishment = document.getElementById("optionEstablishment");
    writeEstablishment.textContent = saveEstablishment;

    const date = document.getElementsByClassName("conteneur__select--display--none");
    date[3].classList.replace("conteneur__select--display--none","conteneur__select__items");
    establishment[0].classList.replace("conteneur__select__items","conteneur__select--display--none");

  })
}

buttonEstablishment();

function buttonValidationTransfert (){

  button[6].addEventListener("click", () => {

    paramConnexion = {
      login : getCredentials(),
      options : getOptions()
    }

      transfertIdentity()
      transfertCivilRegistration();
      transfertRib();
      //transertMigration();
      
    })
}

buttonValidationTransfert();

function transfertIdentity(){

    fetch(urlServer+"/transfert/identity",{
    method: "POST",
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    ,
   },
     body: JSON.stringify(paramConnexion)

   })
   .then (function (res){
     if (res.ok){
       return(res.json());
     }    
   })

   .then((res)=>{

    resolve(res);
   })
   
   .catch(function(err){
     console.error("Le serveur ne répond pas ",err)
   }); 
  
  
}

function transfertCivilRegistration(){
  fetch(urlServer+"/transfert/civilregistration",{
    method: "POST",
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    ,
   },
     body: JSON.stringify(paramConnexion)

   })
   .then (function (res){
     if (res.ok){
       return(res.json());
     }    
   })

   .then((res)=>{

    resolve(res);
   })
   
   .catch(function(err){
     console.error("Le serveur ne répond pas ",err)
   }); 
}

function transfertRib(){

  fetch(urlServer+"/transfert/rib",{
    method: "POST",
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    ,
   },
     body: JSON.stringify(paramConnexion)

   })
   .then (function (res){
     if (res.ok){
       return(res.json());
     }    
   })

   .then((res)=>{

    resolve(res);
   })
   
   .catch(function(err){
     console.error("Le serveur ne répond pas ",err)
   }); 
}

function transertMigration(){

  fetch(urlServer+"/transfert/migration",{
    method: "POST",
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json'
    ,
   },
     body: JSON.stringify(paramConnexion)

   })
   .then (function (res){
     if (res.ok){
       return(res.json());
     }    
   })

   .then((res)=>{

    resolve(res);
   })
   
   .catch(function(err){
     console.error("Le serveur ne répond pas ",err)
   }); 

}


function getEstablishments(){

  getData(urlAPI[2]+getFolderIn())

  .then((establishments) => {

    writeEstablishments(establishments)

  })

  .catch((error) => {
    console.error(error);
  })
}


/**
 * 
 * @param {string} indiquer l'url qu'on souhaite contacter  
 * @returns retourne un objet javascript
 */

function getData(patch){

    paramConnexion = {
        login : getCredentials(),
        url : patch
      }
    
      return new Promise (function(resolve, reject) {

        fetch(urlServer+"/apiCegid/get",{
          method: "POST",
          headers:{
            'Accept':'application/json',
            'Content-Type': 'application/json'
          ,
         },
           body: JSON.stringify(paramConnexion)
     
         })
         .then (function (res){
           if (res.ok){
             return(res.json());
           }    
         })

         .then((res)=>{

          resolve(res);
         })
         
         .catch(function(err){
           console.error("Le serveur ne répond pas ",err)
           reject(res.status);
         }); 
        
      })
    
}

function writeEmployees(employees) {

  const employeesJSON = JSON.parse(employees);
  const selectEmployees = document.getElementById("employees")

  for (employee of employeesJSON.Items){

    let optionEmployee = document.createElement("option");
    optionEmployee.textContent = employee.EmployeeId+' '+employee.Name+''+employee.FirstName;
    selectEmployees.appendChild(optionEmployee);

  }
}

/**
 * 
 * @param {JSON} establishments 
 */

function writeEstablishments (establishments){

  const establishmentsJSON = JSON.parse(establishments);
  const selectEstablishment = document.getElementById("establishments");

  for (establishment of establishmentsJSON.Items){

    let optionEstablishment = document.createElement("option");
    optionEstablishment.textContent = establishment.Establishment+' '+establishment.EstablishmentLabel;
    selectEstablishment.appendChild(optionEstablishment);
  }

}

/**
 * 
 * @param {string} folder 
 * @returns retourne une chaine de caractéres pour les appels API HR SPRINT
 */

function renameFolder(folder){

  let folderReplace1 = folder.replace(' - ','%20-%20');
  let folderReplace2 = folderReplace1.replace('\\',"%5C");

  return folderReplace2;


}


/**
 * 
 * @returns un objet avec les éléments selectionnés par l'utilisateur
 */

function getOptions(){

  options = {

    folderIn : getFolderIn(),
    folderOut : getFolderOut(),
    matricule : getMatricule(),
    establishment : getEstablishment(),
    date : getDate(),
    sessionId : getSession()

  }

  return (options)

}

function getSession (){

  const session = document.getElementsByClassName("header__session");
  const sessionValue = session[0].textContent;
  const sessionSplit = sessionValue.split(':');
  return sessionSplit[1];
}

/**
 * @returns le matricule selectionné
 */
function getMatricule(){

  const matriculeComplet = document.getElementById("employees").value;
  const matriculeSplit = matriculeComplet.split(' ');
  const matricule = matriculeSplit[0]

  return matricule;
}

/**
 * 
 * @returns l'etablissement séléctionné
 */

function getEstablishment(){

  const establishmentComplet = document.getElementById("establishments").value;
  const establishmentSplit = establishmentComplet.split(" ");
  establishment = establishmentSplit[0];

  return establishment;
}

function getDate(){

  const date = document.getElementById("date").value;
  return date;
}


/**
 * 
 * @param {string} key 
 * @returns 
 */
function readSessionStorage(key){
  
  let dataLinea = sessionStorage.getItem(key);
  let dataJson = JSON.parse(dataLinea);
  return dataJson;  
}

/**
* La fonction créer dans le local storage une no
* @param {string} 
* @param {object} 
* @returns 
*/

function writeSessionStorage(key,data){
  let dataLinea = JSON.stringify(data);
  sessionStorage.setItem(key,dataLinea)

}

