const urlServer = "http://localhost:3000"
const button = document.getElementsByClassName("button")

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

  const folderIn = document.getElementById("folderIn").value;
  const folderInRename = renameFolder(folderIn)
  return folderInRename;
}


function getFolderOut (){

  const folderOut = document.getElementById("folderOut").value;
  const folderOutRename = renameFolder(folderOut)
  return folderOutRename;

}

/**
 * Etape 1
 */

function connexion (){

    button[0].addEventListener("click", function(event) {

        event.preventDefault();

        getData("https://y2cbrh-ondemand.cegid.com//CegidRHWebApi/v1/Folder/ListFolders")

        .then( (folders) => {

          console.log(folders);
          writeFolder(folders)
        
          buttonValidation(this)

        })

        .catch((error) => {

          console.error(error)
        })
      
    
        .catch ((error) => {

          console.error(error);

          
        })

    })

}

connexion();

function stepEmployees (){

  button[2].addEventListener("click",function () {
    getData("https://y2cbrh-ondemand.cegid.com//CegidRHWebApi/v1/Employee/OData/Identity?folderId="+getFolderIn())
    .then((employees) => {

      writeEmployees(employees);
    })
    .catch((error) => {
      console.error(error);
    })
  })
}

stepEmployees();

function stepEstablishments(){

  button[3].addEventListener("click",function () {
    getData("https://y2cbrh-ondemand.cegid.com//CegidRHWebApi/v1/Establishment/OData/Establishment?folderId="+getFolderOut())
    .then((establishments) => {

      writeEstablishments(establishments);
    })
    .catch((error) => {
      console.error(error);
    })
  })
}

stepEstablishments();
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
           reject(res.status);
         }); 
        
      })
    
}

/**
 * Fonction pour créer un salarié
 * Etape 1 création d'un objet avec les éléments de la séléction
 * Etape 2 getIdentity pour obtenir les informations
 * Etape 3 Modification des données de du retour de getIdentity pour adapter au post Employee retour du matricule
 * Etape 4 Mise à jour des informations manquantes 
 * Etape 5 Récupération du RIB + création dans la nouvelle société
 * Etape 6 Si analytique récupération
 * Etape 7 Si zones libres identiques reprise
 * @returns 
 */

function migration(){
  button[5].addEventListener("click", function(){
    options = migrationOptions();

    console.log(options);

    getData("https://y2cbrh-ondemand.cegid.com//CegidRHWebApi/v1/Employee/OData/Identity?folderId="+getFolderIn())
    .then((employees) => {

      //récupération du matricule
      const employeesJSON = JSON.parse(employees);
      const matriculeSearch =  employeesJSON.Items.find(employees => employees.EmployeeId == options.matricule);
      console.log(matriculeSearch);

      return matriculeSearch


    })
    .catch((error) => {
      console.error("Erreur lors de la recherche du salarié",error);
    })
    .then((matricule)=> {
      const newEmployee = createEmployee(matricule,options.establishment,options.date)
      console.log(newEmployee);
    })
    .catch((error) => {
      console.error(error);
    })
  })
  
}

migration();

/**
 * 
 * @param {JSON} dataFolders fournir la liste des dossiers
 */

function writeFolder(dataFolders){

  console.log(dataFolders);

  const dataFoldersJSON = JSON.parse(dataFolders);
  const folderIn = document.getElementById("folderIn")
  const folderOut = document.getElementById("folderOut")

  for (folder of dataFoldersJSON){

    let option = document.createElement("option");

    option.setAttribute("value", folder.FolderId);
    option.textContent = folder.FolderId;

    folderIn.appendChild(option);
  }
  for (folder of dataFoldersJSON){

    let option = document.createElement("option");

    option.setAttribute("value", folder.FolderId);
    option.textContent = folder.FolderId;
    folderOut.appendChild(option);
  }
}

/**
 * 
 * @param {JSON} Employees 
 */
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
  const selectEstablishment = document.getElementById("establisments");
  console.log(selectEstablishment)

  for (establishment of establishmentsJSON.Items){

    let optionEstablishment = document.createElement("option");
    optionEstablishment.textContent = establishment.Establishment+' '+establishment.EstablishmentLabel;
    console.log(optionEstablishment);
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

function buttonValidation(localisation){

  localisation.classList.add("button__validation")
  localisation.disabled = true;
}



function postEmployee (){


  paramConnexion = {
    login : getCredentials(),
    url : patch,
  }

    fetch(urlServer+"/apiCegid/post",{
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

     
     .catch(function(err){
       res.status;
     }); 
    

}

/**
 * 
 * @returns un objet avec les éléments selectionnés par l'utilisateur
 */

function migrationOptions(){

  options = {

    folderIn : getFolderIn(),
    folderOut : getFolderOut(),
    matricule : getMatricule(),
    establishment : getEstablishment(),
    date : getDate()

  }

  return (options)

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

  const establishmentComplet = document.getElementById("establisments").value;
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
 * @param {JSON} employee 
 * @param {string} code etablissement
 * @param {date} date du transfert
 * @return un employé au format du post
 */

function createEmployee(employee,establishment,date){

  const newEmployee = {

      Name: employee.Name,
      MaidenName: "",
      FirstName: employee.FirstName,
      Civility: employee.Civility,
      Sex: employee.Gender,
      Address: employee.Adress1,
      Address2: employee.Adress2,
      Address3: employee.Adress3,
      PostalCode: employee.PostalCode,
      City: employee.City,
      Country: employee.Country,
      Establishment: establishment,
      //Gestion automatique"EmployeeId": "string",
      StatisticalCode: "",
      Organization1: "",
      Organization2: "",
      Organization3: "",
      Organization4 : "",
      FreeSalary1: 0,
      FreeSalary2: 0,
      FreeSalary3: 0,
      FreeSalary4: 0,
      FreeSalary5: 0,
      FreeCombo1: "",
      FreeCombo2: "",
      FreeCombo3: "",
      FreeCombo4: "",
      FreeDate1: "",
      FreeDate2: "",
      FreeDate3: "",
      FreeDate4: "",
      FreeBool1: true,
      FreeBool2: true,
      FreeBool3: true,
      FreeBool4: true,
      //ResourceId: "",
      EntryDate: date,
      BirthDate: "",
      SocialNumber: "",
      CreateContract: false
    }
  
    return newEmployee

}


