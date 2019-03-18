<template>
    <div class="app">
        
        <div class="weather">
            <button @click="logout" class="btn btn-success">Wyloguj się</button>
            <h4>Wybierz miasta:</h4>
             <select id="mySelect" class="col-10 custom-select"  >
                <option  v-for="state in states" :key="state.id" :value="state.id" :name="state.name">{{ state.name }}</option>
            </select>
            <button class="btn btn-primary addBtn" v-on:click="addCity()">Dodaj</button>
            <div class="result">
                <div class="column" v-for="item in city" :key="item.id">
                    <p>Miasto: {{item.cityName}}</p>
                    <p>Temperatura: {{item.cityTemp}}°C</p>
                    <p>Wilgotność: {{item.cityHumidity}}%</p>
                    <div>
                        <button class="btn btn-primary"  v-on:click="more(item.cityName)">Więcej</button>
                        <button class="btn btn-warning" v-on:click="deleteCity(item.id, searchCity, item.cityName)">Usuń</button>
                    </div>
                </div>
                    
                    <div class="moreInfo none">
                        <button class="btn btn-danger" v-on:click="close()">powrót</button>
                        <div class="container col-10">
                            <h5>Prognoza godzinowa dla miasta: {{name}}</h5>
                        
                            <ul class="list-group">
                                <li class="more-title">Aktualna Data:</li>
                                <li class="list-group-item" v-for="date in moreDate"  >{{date}}</li>
                            </ul>
                            <ul class="list-group">
                                <li class="more-title">Temperatura:</li>
                                <li class="list-group-item" v-for="temp in moreTemp"  >{{Math.round(temp)}}°C</li>
                            </ul>
                            <ul class="list-group">
                                <li class="more-title">Ikona:</li>
                                <li class="list-group-item" v-for="icon in moreIcon"  ><img v-bind:src="'https://openweathermap.org/img/w/'+icon+'.png'" /></li>
                            </ul>
                            <ul class="list-group">
                                <li class="more-title">Wilgotność:</li>
                                <li class="list-group-item" v-for="humidity in moreHumidity"  >{{humidity}}%</li>
                            </ul>
                            <ul class="list-group">
                                <li class="more-title">Ciśnienie:</li>
                                <li class="list-group-item" v-for="pressure in morePressure"  >{{Math.round(pressure)}}hpa</li>
                            </ul>
                            <ul class="list-group">
                                <li class="more-title">Prędkość wiatru:</li>
                                <li class="list-group-item" v-for="wind in moreWind" >{{Math.round(wind)}}m/s</li>
                            </ul>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase';
import states from "@/others/city.list.json";
import "@/others/jquery-3.3.1.js";
import "@/others/select2.min.js";
import "@/others/select2.min.css";
import base from '@/main.js';

export default {
name: 'Header',

  data() {
    return {
      city: [],
      API: "f3c08ceff7f970ccc92f3aab10216c6b",
      states: states,
      moreTemp: [],
      moreHumidity: [],
      moreDate: [],
      moreIcon:[],
      morePressure:[],
      moreWind:[],
      searchCity: [] ,
      index: "",
      name: "",
      addedCity:"",
      loadedCity:""
    }
  },
  methods: {
      // Pobieranie danych API dla kazdego miasta //
    getData() {
        clearInterval(this.index)
        
        
        this.loadedCity = localStorage.getItem("cityId");
        
        this.city = [];
        fetch(
            `http://api.openweathermap.org/data/2.5/group?id=${
            this.loadedCity
            }&units=metric&appid=${this.API}`
        )
        .then(response => response.json())
        .then(data => {
            data.list.map(e=> {
                this.city.push({
                    id: e.id,
                    cityName: e.name,
                    cityTemp: Math.round(e.main.temp),
                    cityHumidity: Math.round(e.main.humidity),
                })
            })
        });
    //    this.index = setInterval(this.getData, 60000)
    },
    // Dodawanie miast do listy obserwowanych //
    addCity(){
        let path = localStorage.getItem("name");
        let users = base.database().ref(`users/${path}`);

        let addedCity = document.querySelector('option:checked');
        
        if(!this.searchCity){this.searchCity = ["0"]}
       
        this.searchCity.push(addedCity.value);
         
        addedCity.remove();
        users.set(this.searchCity);
        
        localStorage.setItem("cityId", this.searchCity)
        
        this.getData();

    },

    // Usuwanie miast z listy obserwowanych //
    deleteCity(id, searchCity, name){
        let path = localStorage.getItem("name");
        let users = base.database().ref(`users/${path}`);
        this.searchCity = searchCity.filter(el => el != id)
        const x = document.createElement('option')
        x.setAttribute("value", `${id}`)
        x.textContent = name
        document.querySelector('#mySelect').append(x)
       
        users.set(this.searchCity);
        localStorage.setItem("cityId", this.searchCity)
       
        this.getData();
       
    },

    // Pobranie i wyświetlanie prognozy godzinowej //
    more(name){
        this.name = name;
        document.querySelector('.moreInfo').classList.remove("none");
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
    
    // Wylogowanie //
    logout:function(){
        firebase.auth().signOut().then(()=>{
            this.$router.replace('login')
            localStorage.removeItem("name")
            localStorage.removeItem("cityId")
        })
    },

  close(){
      document.querySelector('.moreInfo').classList.add("none")
  },
  
  },

  mounted(){
    $('#mySelect').select2({
    selectOnClose: true
    });
   
    let path = localStorage.getItem("name");
    let users = base.database().ref(`users/${path}`);
    users.on("value", data =>  localStorage.setItem("cityId", data.val())  );
       
    this.getData();
  },
 
  updated(){
    let path = localStorage.getItem("name");
    let users = base.database().ref(`users/${path}`);
    users.on("value", data =>  this.searchCity = data.val());
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
    flex-wrap: wrap;
}
.column{
    margin: 20px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    padding: 15px;
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
    justify-content: center;
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
.btn-primary, .btn-warning {
    margin-right: 10px;
}
.addBtn{
    font-size: 13px;
    padding: 4px;
    margin-left: 5px;
}


@media(min-width: 320px) and (max-width: 768px){
    .column{
        display: none
    }
    .column:first-child{
        display: block;
    }
    ul{
        width: auto;
        font-size: 11px;
        padding: 0;
        line-height: 100%;
    }
    li.more-title{
        font-size: 9px;
        padding: 0;
    }
    li.list-group-item{
        padding: 2px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .moreInfo h5{
        font-size: 14px;
    }
    .weather {
    margin-top: 10%;
    }
}
@media(min-width: 769px) and (max-width:1024px ){
    ul{
        width: 24%;
    }
    ul:nth-child(2) li.list-group-item {
    font-size: 14px;
    padding: 0;
    }
}
</style>

 

