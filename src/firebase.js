// Initialize Firebase
var config = {
  apiKey: "AIzaSyBt7Ap6YvpAzIXc3UNihWlWomZfrHVBOOE",
  authDomain: "projecto2-272727.firebaseapp.com",
  databaseURL: "https://projecto2-272727.firebaseio.com",
  projectId: "projecto2-272727",
  storageBucket: "projecto2-272727.appspot.com",
  messagingSenderId: "1040741679215"
};
firebase.initializeApp(config);

// Guardar datos de login en BD
const saveData = (userId, name, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    picture: imageUrl,
    id: userId,
  });
}

// Registro de Usuarios Nuevos
const registerNew = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      if (user.displayName == null) {
        username = document.getElementById('nameUser').value;
      } else {
        username = user.displayName;
      }
      if (user.photoURL == null){
        picture = "https://thumbs.dreamstime.com/b/icono-del-usuario-46707697.jpg";
      } else {
        picture = user.photoURL;
      }
      saveData(user.uid, username, user.email, picture);
      check();
      alert('Tu usuario ha sido registrado! \nConfirma el mensaje de verificación en tu correo y seguidamente puedes Iniciar Sesión')
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      alert(errorCode);
      alert(errorMessage);
    })
}

// Inicio de sesión de usuario existente
let login = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
  });
}

// Validación de autenticación de usuarios
const validation = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let displayName = user.displayName;
      let email = user.email;
      let emailVerified = user.emailVerified;
      let photoURL = user.photoURL;
      let isAnonymous = user.isAnonymous;
      let uid = user.uid;
      let providerData = user.providerData;
    }
    if (user.emailVerified) {
      window.location.href = 'timeline.html';
    } else {
      alert('Por favor valida tu correo');
    }
  });
}

// Login con Google
const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
    const token = result.credential.accessToken;
    // console.log("result", result)

    // Información de usuario
    const userData = result.user;
    console.log(userData)
    saveData(userData.uid, userData.displayName, userData.email, userData.photoURL);
    window.location.href = 'timeline.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
}

// Validación de correo al usuario
const check = () => {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    // console.log('Enviando correo');
  }).catch((error) => {
    // console.log(error);
  });
}

// Cambio de contraseña
const resetPassword = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
  })
  .catch((error) => {
    // console.log(error);
  })
}

// funcion para cerrar sesion
const signOut = () => {
  firebase.auth().signOut().then(() => {
    // console.log('Sesión finalizada')
  }).catch((error) => {
    // console.log(error);
  });
}

// Login con Facebook
const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const token = result.credential.accessToken;
      const user = result.user;
      saveData(user.uid, user.displayName, user.email, user.photoURL);
      window.location.href = 'timeline.html';
    })
    .catch((error) => {
      // console.log(error.code);
      // console.log(error.message);
      // console.log(error.email);
      // console.log(error.credential);
    });
}



// Función para escribir nuevo post
const writeNewPost = (uid, name, textPost, state ) => {
  let postData = {
    id: uid,
    author: name,
    newPost: textPost,
    privacy: state,
    likeCount: 0,
  };
  
  // Key para nueva publicación
  let postKey = firebase.database().ref().child('posts').push().key;
  console.log(postKey);      
  let updates = {};
  updates['/posts/' + postKey] = postData;
  updates['/user-posts/' + uid + '/' + postKey] = postData;
  return firebase.database().ref().update(updates);
}

window.deletePost = (id) => {
  const questions = confirm('¿Está seguro de eliminar?');
  if (questions) {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref().child('/user-posts/' + userId + '/' + id).remove();
    firebase.database().ref().child('posts/' + id).remove();
    while (publications.firstChild) publications.removeChild(publications.firstChild);
    alert('Post eliminado');
    window.location.reload()
  } else {
    console.log('regresa al muro')
  }
  console.log(id)
  
}

window.editPost = (id) => {
  console.log('prueba de boton editar');
  let editPost = document.getElementById('textPost');
  const editButton = document.getElementById('edit-button');
  const saveButton = document.getElementById('save-button');
  editPost.removeAttribute('disabled');
  editButton.classList.add('hidden');
  saveButton.classList.remove('hidden');
}

window.savePostEdit = (id) => {
  console.log('prueba de guardar post editado');
  let editPost = document.getElementById('textPost');
  const editButton = document.getElementById('edit-button');
  const saveButton = document.getElementById('save-button');
  const userId = firebase.auth().currentUser.uid;
  
  firebase.database().ref('posts/')
  .on('value', (postsRef) =>{
    const posts = postsRef.val();
    const listPost = posts[id];
    let postEdit = {
      id: listPost.id,
      author: listPost.author,
      newPost: editPost.value,
      privacy: listPost.privacy,
      likeCount: 0,
    }

  let updates = {};
  updates['/posts/' + id] = postEdit;
  updates['/user-posts/' + userId + '/' + id] = postEdit;
  return firebase.database().ref().update(updates);

  editPost.disabled = true;
  saveButton.classList.add('hidden');
  editButton.classList.remove('hidden');
  })
}


window.printPost = () => {
  firebase.database().ref('posts/')
  .on('value', (postsRef) =>{
    const posts = postsRef.val();
    console.log(posts);
    const publications = document.getElementById('publications');
    publications.innerHTML='';
    const postsOrder = Object.keys(posts).reverse();
    postsOrder.forEach((id) => {
      const listPost = posts[id];
      publications.innerHTML += `
        <div class="show-post" id=${id}>
          <div>
            <p>Nombre: ${listPost.author}</p>
            <div class="actions">${listPost.privacy}</div>
          </div>
          <textarea id="textPost" class="textarea-post" cols="80" rows="7" disabled>${listPost.newPost}</textarea>
          <hr>
          <div>
            <div class="icon-like">
              <a href="#">
                <img id="like-button" src="img/like.jpg" alt="icono de like" width="20px">
              </a>
              <p class="count-like" id="show-count">${listPost.likeCount}</p>
              </div>
            <div class="actions">
              <a href="#" class="hidden" onclick="savePostEdit('${id}')" id="save-button"><img src="img/guardar.png" alt="icono de editar" width="24px"></a>
              <a href="#" onclick="editPost('${id}')" id="edit-button"><img src="img/edit(1).png" alt="icono de editar" width="24px"></a>
              <a href="#" onclick="deletePost('${id}')" id="delete-button"><img src="img/delete.png" alt="icono de eliminar" width="24px"></a>
            </div>
          </div>
        </div>
       `
    })
  })
}
