import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = "";

let base = firebase.initializeApp(
  {
    apiKey: "AIzaSyC6FzZ0j5N8vGuoaAvpZK3matpGpjDXVwg",
    authDomain: "weatherapp-ccdc0.firebaseapp.com",
    databaseURL: "https://weatherapp-ccdc0.firebaseio.com",
    projectId: "weatherapp-ccdc0",
    storageBucket: "weatherapp-ccdc0.appspot.com",
    messagingSenderId: "677299154605"
  }
);

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
    
  }
});








export default base
