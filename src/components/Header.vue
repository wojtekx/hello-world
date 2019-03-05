<template>
     <div id="app">
        <h2>Pogoda:</h2>
        <div id="weather"></div>
        <select v-model="city">
            <option v-for="state in states" v-bind:key="state.id" :value="state.name">{{ state.name }}</option>
        </select>
        <button v-on:click="getData()">Szukaj</button>
        
    </div>
</template>

<script>
  import states from "./list.json";
export default {
name: 'Header',
 
  data() {
                return {
                   city: states[0].id,
                   API: "f3c08ceff7f970ccc92f3aab10216c6b",
                   states: states
                };
            },
            methods:{
                getData() {
                    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.city}&units=metric&appid=${this.API}`)
                    .then(response => response.json())
                    .then(data => console.log(data)
                    )
                },
            },

}

</script>

<style scoped>

</style>

 

