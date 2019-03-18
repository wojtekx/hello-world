import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex'

Vue.config.productionTip = false;

let app = "";

let base = firebase.initializeApp(
  {
    apiKey: "xxx",
    authDomain: "xx",
    databaseURL: "xx",
    projectId: "xx",
    storageBucket: "xxx",
    messagingSenderId: "xx"
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

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
store.commit('increment')

console.log(store.state.count)





export default base
