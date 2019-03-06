<template>
<<<<<<< HEAD
     <div id="app">
        <h2>Pogoda:</h2>
        <select v-model="city">
            <option v-for="state in states" :key="state.id" :value="state.name">{{ state.name }}</option>
        </select>
        <button v-on:click="getData()">Szukaj</button>
        
=======
  <div class="app">
    <h2>Pogoda:</h2>
    <div class="weather">
      <h5>Miasto: {{cityName}}</h5>
      <p>Temperatura: {{temp}}</p>
      <p>Wilgotność: {{humidity}}</p>
      <select v-model="city">
        <option v-for="state in states" v-bind:key="state.id" :value="state.name">{{ state.name }}</option>
      </select>
      <button v-on:click="getData()">Szukaj</button>
>>>>>>> ce3233c816300f30553ca1607dda8027cadb8691
    </div>
    <div class="moreInfo" v-for="temp in moreTemp" :key="temp.dt">
      <div>
        <p>{{ temp.dt_txt.slice(11) }}</p>
        <p>Temperatura: {{Math.round(temp.main.temp)}}°C</p>
        <p>Wilgotność: {{Math.round(temp.main.humidity)}}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import states from "./list.json";
export default {
<<<<<<< HEAD
name: 'Header',
 
  data() {
                return {
                   city: states.id,
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
=======
  name: "Header",
>>>>>>> ce3233c816300f30553ca1607dda8027cadb8691

  data() {
    return {
      city: states[0].id,
      API: "f3c08ceff7f970ccc92f3aab10216c6b",
      states: states,
      temp: "",
      humidity: "",
      cityName: "",
      moreTemp: ""
    };
  },
  methods: {
    getData() {
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${
          this.city
        }&units=metric&appid=${this.API}`
      )
        .then(response => response.json())
        .then(data => {
          this.temp = data.list[0].main.temp;
          this.humidity = data.list[0].main.humidity;
          this.cityName = data.city.name;
          this.moreTemp = data.list;
        });
    }
  }
};
</script>

<style scoped>
.moreInfo {
  /* display: inline-flex; */
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 100px;
  flex-wrap: wrap;
}
</style>

 

