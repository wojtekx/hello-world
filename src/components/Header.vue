<template>
    <div class="app">
        {{checkUsers()}}
        <div class="weather">
            <a class="href"><button v-on:click="Logout()" class="btn btn-success">Wyloguj się</button></a>
            <h4>Wybierz miasta:</h4>
             <select class=" custom-select"  v-on:change="addCity()">
                <option  v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
            </select>
            <div class="result">
                <div class="column">
                    <p v-for="name in cityName" v-bind:key="name">
                        <button class="btn btn-primary"  v-on:click="more(name)">Więcej</button>  {{name}}
                    </p>
                    <div class="moreInfo none">
                        <button class="btn btn-danger" v-on:click="close()">powrót</button>
                        <div class="container">
                            <h5>Prognoza godzinowa dla miasta: {{name}}</h5>
                        
                        <ul class="list-group">
                            <li class="more-title">Aktualna Data:</li>
                            <li class="list-group-item" v-for="date in moreDate" :key="date" >{{date}}</li>
                        </ul>
                        <ul class="list-group">
                            <li class="more-title">Temperatura:</li>
                            <li class="list-group-item" v-for="temp in moreTemp"  :key="temp.dt">{{Math.round(temp)}}°C</li>
                        </ul>
                        <ul class="list-group">
                            <li class="more-title">Ikona:</li>
                            <li class="list-group-item" v-for="icon in moreIcon" :key="icon*Math.random()" ><img v-bind:src="'https://openweathermap.org/img/w/'+icon+'.png'" /></li>
                        </ul>
                        <ul class="list-group">
                            <li class="more-title">Wilgotność:</li>
                            <li class="list-group-item" v-for="humidity in moreHumidity" :key="humidity*Math.random()" >{{humidity}}%</li>
                        </ul>
                        <ul class="list-group">
                            <li class="more-title">Ciśnienie:</li>
                            <li class="list-group-item" v-for="pressure in morePressure" :key="pressure*Math.random()" >{{Math.round(pressure)}}hpa</li>
                        </ul>
                        <ul class="list-group">
                            <li class="more-title">Prędkość wiatru:</li>
                            <li class="list-group-item" v-for="wind in moreWind" :key="wind*Math.random()" >{{Math.round(wind)}}m/s</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div class="column">
                    <p v-for="temp in cityTemp" v-bind:key="Math.random()*temp">Temperatura: {{temp}}°C </p>
                </div>
                <div class="column">
                    <p v-for="humidity in cityHumidity" v-bind:key="Math.random()*humidity">Wilgotność: {{humidity}}%</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import states from "./city.list.json";
import Login from "./Login.vue"
import { log } from 'util';
export default {
name: 'Header',

  data() {
    return {
      showModal: false,
      city: [],
      API: "f3c08ceff7f970ccc92f3aab10216c6b",
      states: states,
      cityTemp: [],
      cityHumidity: [],
      cityName: [],
      moreTemp: [],
      moreHumidity: [],
      moreDate: [],
      moreIcon:[],
      morePressure:[],
      moreWind:[],
      searchCity: [] ,
      index: "",
      name: "",
      key: 1
    }
  },
  methods: {
      // Pobieranie danych API dla kazdego miasta //
    getData() {
        clearInterval(this.index)
         this.cityName = [];
         this.cityTemp = [];
         this.cityHumidity = [];
        fetch(
            `http://api.openweathermap.org/data/2.5/group?id=0${
            this.searchCity
            }&units=metric&appid=${this.API}`
        )
        .then(response => response.json())
        .then(data => {
            data.list.map(e=> {
                this.cityName.push(e.name);
                this.cityTemp.push(Math.round(e.main.temp));
                this.cityHumidity.push(Math.round(e.main.humidity));
            })
        });
       this.index = setInterval(this.getData, 60000)
    },
    // Dodawanie miast do listy obserwowanych //
    addCity(){
        let x = document.querySelector('option:checked').value 
        document.querySelector('option:checked').classList.add('none')
        this.searchCity += "," +x;
        this.getData()
    },

    // Pobranie i wyświetlanie prognozy godzinowej //
    more(name){
        this.name = name;
        document.querySelector('.moreInfo').classList.remove("none")
        this.moreTemp = []
        this.moreHumidity =[]
        this.moreDate = []
        this.moreIcon = []
        this.morePressure = []
        this.moreWind = []
        fetch(
            `http://api.openweathermap.org/data/2.5/forecast?q=${
            name
            }&units=metric&appid=${this.API}`
        )
        .then(response => response.json())
        .then(data => data.list.map(el => {
           this.moreTemp.push(el.main.temp)
           this.moreHumidity.push(el.main.humidity)
           this.moreDate.push(el.dt_txt)
           this.moreIcon.push(el.weather[0].icon)
           this.morePressure.push(el.main.pressure)
           this.moreWind.push(el.wind.speed)
           
        }))
    },

    // Sprawdzenie czy użytkownik jest zalogowany // 
    checkUsers(){
      const user = localStorage.getItem('user');
        if(user){
            $('#currentUser').html('Witaj: '+user+'!')
        }
        else{
            window.location.href = '/index.html';
        }
  },
    // Wylogowanie //
    Logout(){
        localStorage.removeItem('user');
        window.location.href = '/index.html';
  },
  close(){
      document.querySelector('.moreInfo').classList.add("none")
  }
  },
  
  
};

</script>

<style scoped>
.moreInfo {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top:  0;
    left: 50%;
    transform: translate(-50%, 0 );
    background-color: rgba(15, 86, 129, 1);
    padding: 35px;
    border: 1px solid black;
    width: 100%;
    
}
.moreInfo .container{
    display: flex;
    justify-content: center;
}
.moreInfo h5{
    position: absolute;
    font-size: 18px;
}
.result{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.column{
    margin: 0 20px;
    font-size: 20px;
}
.none{
    display: none;
}
ul{
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin-top: 50px;
  
}
li{
    margin: 0;
    border-bottom: 1px solid;
    padding: 4px 25px;
    height: 40px;
}
p {
    height: 30px;
    line-height: 30px;
    text-align: left;
    color: white;
}
p > button{
margin-right: 5px;
}
.custom-select, h4{
    margin: 20px;
    width: auto;
    display: flex;
}
a.href{
    display: flex;
    margin-left: 20px;
}
h4,h5{
    color: white;
    display: flex;
}
.container{
    display: flex;
    
}
button.btn-danger{
    margin: 0 auto 15px;
    width: 100px;
    height: 50px;
    border-radius: 50%;
}
img{
    width: 40px;
    height: 40px;
}
li.more-title {
    color: snow;
    text-shadow: 0 0 6px;
}
</style>

 

