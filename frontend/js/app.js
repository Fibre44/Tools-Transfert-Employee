const urlServer = "http://localhost:3000"
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

      document.getElementsByClassName("header__session")[0].textContent = "Session en cours "+session.idSession;
      
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

    button[1].addEventListener("click", function(event) {

        event.preventDefault();

        getData("https://y2cbrh-ondemand.cegid.com//CegidRHWebApi/v1/Folder/ListFolders")

        .then( (dataFolders) => {

          writeFolders("foldersIn",dataFolders)
          buttonFoldersIn();
        
        })

        .catch((error) => {

          console.error(error)
        })

    })

}

connexion();

/**
 * 
 * @param {string} description indiquer la valeur à écrire sur le bouton
 * @param {string} stepId Id de la liste déroulante
 */

function writeSelect(description,stepId){

  const divSelect = document.getElementsByClassName("conteneur__select");
  const divStep = document.createElement("div");
  divStep.classList.add("conteneur__select__items");
  divSelect[0].appendChild(divStep);
  const select = document.createElement("select");
  const button = document.createElement("button");
  button.setAttribute("id","button__"+stepId);
  button.textContent = description
  select.setAttribute("id",stepId);
  divStep.appendChild(select)
  divStep.appendChild(button);

}
/**
 * 
 * @param {JSON} data 
 */

function buttonFolders (){

  const button = document.getElementById("button__foldersIn");
  button.addEventListener("click", () => {

    const folderIn = document.getElementById("foldersIn").value;
    const folderInRename = renameFolder(folderIn);
    sessionStorage.setItem("folderIn",folderInRename);


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

/**
 * Voir pour déplacer la logique sur le backend
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



function postEmployee (patch,data){


  paramConnexion = {
    login : getCredentials(),
    url : patch,
    employee : data
  }

    return new Promise ((resolve, reject) => {
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
         resolve(res.json());
       }    
     })

     
     .catch(function(err){
       res.status;
     }); 
    })

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
 * @param {string} code etablissement
 * @param {date} date du transfert
 * @return un employé au format du post
 */

function createEmployee(establishment,date){

  const identity = readSessionStorage("Identity");
  const civility = readSessionStorage("Civility");
  const assignment = readSessionStorage("Assignment");
  const contract = readSessionStorage("Contract")

  const newEmployee = {

      Name: identity.Name,
      MaidenName: "",
      FirstName: identity.FirstName,
      Civility: identity.Civility,
      Sex: identity.Gender,
      Address: identity.Adress1,
      Address2: identity.Adress2,
      Address3: identity.Adress3,
      PostalCode: identity.PostCode,
      City: identity.City,
      Country: identity.Country,
      Establishment: establishment,
      //Gestion automatique"EmployeeId": "string",
      StatisticalCode: assignment.StatCode,
      Organization1: assignment.OrganizCode1,
      Organization2: assignment.OrganizCode2,
      Organization3: assignment.OrganizCode3,
      Organization4 : assignment.OrganizCode4,
      FreeSalary1: contract.SalaryMonth1,
      FreeSalary2: contract.SalaryMonth2,
      FreeSalary3: contract.SalaryMonth3,
      FreeSalary4: contract.SalaryMonth4,
      FreeSalary5: contract.SalaryMonth5,
      FreeCombo1: "ZZZ",
      FreeCombo2: "ZZZ",
      FreeCombo3: "ZZZ",
      FreeCombo4: "ZZZ",
      FreeDate1: "01/01/1900",
      FreeDate2: "01/01/1900",
      FreeDate3: "01/01/1900",
      FreeDate4: "01/01/1900",
      FreeBool1: true,
      FreeBool2: true,
      FreeBool3: true,
      FreeBool4: true,
      //ResourceId: "",
      EntryDate: date,
      BirthDate: civility.BirthDate,
      SocialNumber: civility.SocialNumber,
      CreateContract: false
    }
  
    return newEmployee

}

function createRIB(){

  const dataRIB = readSessionStorage("RIB");

  const newRib =
    {
      Name : dataRIB.BankName,
      City: dataRIB.City,
      IBAN: dataRIB.IbanCode,
      BIC: dataRIB.BICCode
    }

    return newRib;
  
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

