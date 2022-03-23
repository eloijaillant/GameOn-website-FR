function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalCloseBtn = document.querySelectorAll(".close");
const form = document.getElementsByName('reserve');
const closeBtn = document.querySelectorAll(".close-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// Close modal event

[modalCloseBtn[0], closeBtn[0]].forEach((btn) => 
  btn.addEventListener('click', closeModal)
)


// Keep form data
form[0].addEventListener('submit', (e) => {
  e.preventDefault();
});

// Check validation of condition provided
function checkCondition(condition){
  if(!condition) return false;
  else return true;
}

// Send specific error message rather than elementId provided
function getErrorMessage(elementId, message){
  if(elementId && message) {
    document.getElementById(elementId).style.display = "block";
    document.getElementById(elementId).innerText = message;
  }
}

//2nd submit, hide a valid field previous invalid
function hideErrorMessage(elementId) {
  if(elementId) document.getElementById(elementId).style.display = "none";
}

//Check after submit form condition, and call function who show specific message or a valid field
function validate(form) { 
    let firstNameValid = checkCondition(form["first"].value.length >= 2);
    firstNameValid ? 
      hideErrorMessage('error-firstName') : 
      getErrorMessage('error-firstName', "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    
    let lastNameValid = checkCondition(form["last"].value.length >= 2);
    lastNameValid ?  
      hideErrorMessage('error-lastName') : 
      getErrorMessage('error-lastName', "Veuillez entrer 2 caractères ou plus pour le champ du nom."); 
    
    let emailValid = checkCondition(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form["email"].value));
    emailValid ? 
      hideErrorMessage('error-email') : 
      getErrorMessage('error-email', "Veuillez entrer une adresse mail valide.");

    let birthdateValid = checkCondition(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(form["birthdate"].value));
    birthdateValid ? 
      hideErrorMessage('error-birthdate') : 
      getErrorMessage('error-birthdate', "Veuillez entrer votre date de naissance.");

    let qteTournamentValid = checkCondition(/^[0-9]+$/.test(form["quantity"].value));
    qteTournamentValid ? 
      hideErrorMessage('error-tournament') : 
      getErrorMessage('error-tournament', "Veuillez entrer une valeur numérique.");

    let locationValid = checkCondition(form.location.value);
    locationValid ? hideErrorMessage('error-location') : getErrorMessage('error-location', "Veuillez sélectionner une ville.");

    let termsValid = checkCondition(form.terms.checked);
    termsValid ? hideErrorMessage('error-terms') : getErrorMessage('error-terms', "Veuillez accepter les conditions générales.");

    // Check the confirmation form, show a confirmation message
    if(
        firstNameValid 
        && lastNameValid 
        && emailValid
        && birthdateValid 
        && qteTournamentValid
        && locationValid
        && termsValid
      ) {
        document.querySelector(".modal-body").style.display = "none";
        document.querySelector(".formConfirmation").style.display = "block";
      }
  }