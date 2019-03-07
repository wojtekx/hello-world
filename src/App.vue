<template>
  <div id="app">
    <!-- <Login /> -->
    <!-- <Header /> -->
    <router-view/>
  </div>
</template>
 
<script>
import Header from './components/Header.vue';
import bootstrap from './assets/bootstrap.min.css';
import Login from './components/Login.vue';
export default {
  name: 'app',
  components: {
    Header,
    Login
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 10px;
  background-image: linear-gradient(to bottom right, #01628f, #01050c);
  height: 100vh;

}
</style>


    

    