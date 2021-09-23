"use strict";
const form = document.querySelector(".form");
const loginBtn = document.querySelector(".login-btn");
const googleBtn = document.querySelector(".google-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.querySelector(".logout-btn");
const singupError = document.querySelector(".signup-error");
const loginError = document.querySelector(".login-error");
const firebaseConfig = {
  apiKey: "AIzaSyDdOIbAXX1r6ZkO_vHylUXXVmefaNBMG9o",
  authDomain: "login-a8a23.firebaseapp.com",
  projectId: "login-a8a23",
  storageBucket: "login-a8a23.appspot.com",
  messagingSenderId: "205332958759",
  appId: "1:205332958759:web:78a6e44f19977afcaf0802",
  measurementId: "G-BZBQQNBSZ0",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "user@example.com",
});

const showModal = () => {
  document.querySelector(".modal").classList.add("modal--show");
};

const removeModal = () => {
  document.querySelector(".modal").classList.remove("modal--show");
};

const resetInputValue = () => {
  emailInput.value = "";
  passwordInput.value = "";
};

const signUp = () => {
  auth
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      singupError.innerText = "";
      resetInputValue();
      setTimeout(() => {
        removeModal();
        window.location.href = "/index.html";
      }, 2000);
      showModal();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      singupError.innerText = errorMessage;
    });
};

auth.onAuthStateChanged((user) => {
  const userName = document.querySelector(".user-name");
  if (user && userName) {
    user.displayName
      ? (userName.innerText = user.displayName)
      : (userName.innerText = user.email);
  }
});
const login = () => {
  auth
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((userCredential) => {
      const user = userCredential.user;
      loginError.innerText = "";
      window.location.href = "./main.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      loginError.innerText = errorMessage;
    });
};
let userName = "";
const logout = () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginWithGoogle = () => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      const user = result.user;
      userName = user.displayName;
      window.location = "main.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(errorMessage);
    });
};

if (signupBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(emailInput.value, passwordInput.value);
    signUp();
  });
}

if (loginBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(emailInput.value, passwordInput.value);
    login();
  });
}

if (logoutBtn) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    logout();
  });
}

if (googleBtn) {
  googleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("click");
    loginWithGoogle();
  });
}
