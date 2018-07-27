const regularExpresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// const isNotEmpty = value => (value.trim() !== '');
const isNotEmpty = value => (value !== '');
const isEmail = value => (regularExpresion.test(value))
const equalPassword = (password, confirPassword) => password === confirPassword;
const miniLenght = value => (value.length >=5);

// const parameterRegister = (nameUser,email,password,confirPassword);

//console.log(isEmail);
//  Valida los campos al Registrar Nuevo Usuario
//  ******************************************** 
const validationRegisterUser = (nameUser,email,password,confirPassword) => {
  const isValid = (isNotEmpty(nameUser) 
                  && isEmail(email) 
                  && isNotEmpty(password) 
                  && isNotEmpty(confirPassword) 
                  && equalPassword(password, confirPassword)
                  && miniLenght(password)); 

  if (isValid){
    // validInputs.innerHTML = 'datos completos';
  }else {
    console.log('campos incorrectos');
    validInputs.innerHTML = 'Verifica que los datos ingresados sean correctos';
  }
    console.log(isValid);
    return isValid;
}

// Validando Login: email y password correctos
const isValidLogin = (email,password) =>(isEmail(email) && isNotEmpty(password))


// Valida ingreso de email para RESETEAR su contraseña
const validationUpdatePassword = (email) => {
  if (isEmail(email)){
    // validInputs2.innerHTML = 'email completo';
  }else {
    validInputs2.innerHTML = 'Ingrese un correo válido para resetear contraseña';
  }
  return isEmail(email);
}


// Valida publicacion en el muro
// const validationPublicPost = (postPublic) => {
//  if(isNotEmpty(postPublic)){
//     // document.form.postPublic.disabled = false;
//     form.disabled= false;
//     alert('mensaje completo');
//  }
//  else{
//     // document.form.postPublic.disabled = true;
//     publicButton.disabled= true;
//     alert('Escriba algo para publicar');
//  }
//  return isNotEmpty(postPublic)
// }


// Exportando funciones al Objeto Global windown
window.isValidLogin = isValidLogin;
window.validationRegisterUser = validationRegisterUser;
//window.validationPublicPost = validationPublicPost;
window.validationUpdatePassword = validationUpdatePassword;
