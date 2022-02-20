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


