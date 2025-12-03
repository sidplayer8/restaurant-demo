// Import the functions you need from the SDKs you need
// Using compat libraries for file:// protocol support
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBfwmKfM9RyDro0hbgAqbLlctNL6aUDRu4",
    authDomain: "restaurant-demo-c2b52.firebaseapp.com",
    projectId: "restaurant-demo-c2b52",
    storageBucket: "restaurant-demo-c2b52.firebasestorage.app",
    messagingSenderId: "893367214682",
    appId: "1:893367214682:web:8d558a40afcbe1e2b2ee63",
    measurementId: "G-YDRG8PQV8L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log("🔥 Firebase Config Loaded for Project:", firebaseConfig.projectId);
console.log("🔑 Using API Key:", firebaseConfig.apiKey.substring(0, 5) + "...");

window.auth = firebase.auth();
window.provider = new firebase.auth.GoogleAuthProvider();


