const faceButton = document.getElementById('faceButton');
const googleButton = document.getElementById('googleButton');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const formInicio = document.getElementById('formInicio');
const formRegister = document.getElementById('formRegister');
const registerLink = document.getElementById('registerLink');
const emailLogin = document.getElementById('email-login');
const passwordLogin = document.getElementById('password-login');
const updatePassword = document.getElementById('update-password');

const mistakeUserName = document.getElementById('mistake-userName');
const mistakeEmail = document.getElementById('mistake-email');
const mistakePassword = document.getElementById('mistake-password');
const mistakeConfirPassword = document.getElementById('mistake-confirPassword');
const nameUser = document.getElementById('nameUser');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirPassword = document.getElementById('confirPassword')
const validInputs = document.getElementById('valid-inputs');
const validInputs2 = document.getElementById('valid-inputs2');

//formInicio.classList.remove('hidden');
//formRegister.classList.add('hidden');

registerLink.addEventListener('click', () => {
  formRegister.classList.remove('hidden');
  formInicio.classList.add('hidden');
})


// ***************** Registra datos  ************************
registerButton.addEventListener('click', () => {
  nameUsers = nameUser.value;
  emailUser = email.value;
  passwordUser = password.value;
  confirPasswordUser = confirPassword.value;

  if (validationRegisterUser(nameUsers, emailUser, passwordUser, confirPasswordUser) === true) {
    registerNew(emailUser, passwordUser);
    formRegister.classList.add('hidden');
    formInicio.classList.remove('hidden');
  };
});


// *********** Loguea al Usuario **************************
loginButton.addEventListener('click', () => {
  if (isValidLogin(emailLogin.value, passwordLogin.value)) {
    login(emailLogin.value, passwordLogin.value);
    validation();

  } else {
    validInputs2.innerHTML = 'email y/o pasword incorrecto';
  }
});


// *********** Resetea contraseña **************************
updatePassword.addEventListener('click', () => {
  if (emailLogin.value === '') {
    validInputs2.innerHTML = 'Ingrese un correo';
  } else {
    if (validationUpdatePassword(emailLogin.value)) {
      resetPassword(emailLogin.value);
      validInputs2.innerHTML = 'Se envió correo para el cambio de contraseña';
    }
  }
});

// *********** Loguea con Google **************************
googleButton.addEventListener('click', (e) => {
  if (e.target) {
    loginGoogle();
  }
});

// *********** Loguea al Facebook **************************
faceButton.addEventListener('click', (e) => {
  if (e.target) {
    loginFacebook()
  }
});

