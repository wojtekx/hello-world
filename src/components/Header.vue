<template>
    <div class="app">
        {{checkUsers()}}
        <div class="weather">
            <a class="href" href="/Login"><button class="btn btn-success">Wyloguj się</button></a>
            <h4>Wybierz miasta:</h4>
             <select class=" custom-select"  v-on:change="addCity()">
                <option  v-for="state in states" :key="state.id" :value="state.id">{{ state.name }}</option>
            </select>
            <div class="result">
                <div class="column">
                    <p v-for="name in cityName" v-bind:key="name">
                        <button class="btn btn-primary" v-on:click="more(name)">Więcej</button>  {{name}}
                    </p>
                    <div class="moreInfo none">
                        <h5>Prognoza godzinowa dla miasta: {{name}}</h5>
                        
                        <ul class="list-group">
                            <li class="list-group-item" v-for="date in moreDate" :key="date" >{{date}}</li>
                        </ul>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="temp in moreTemp"  :key="temp.dt">{{Math.round(temp)}}°C</li>
                        </ul>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="humidity in moreHumidity" :key="humidity*Math.random()" >{{humidity}}%</li>
                        </ul>
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
export default {
name: 'Header',

  data() {
    return {
      city: [],
      API: "f3c08ceff7f970ccc92f3aab10216c6b",
      states: states,
      cityTemp: [],
      cityHumidity: [],
      cityName: [],
      moreTemp: [],
      moreHumidity: [],
      moreDate: [],
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
                console.log(data);
                
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
        }))
    },

    // Sprawdzenie czy użytkownik jest zalogowany // 
    checkUsers(){
      const user = localStorage.getItem('user');
    if(user){
        $('#currentUser').html('Witaj: '+user+'!')
    }
    else{
        window.location.href = '/Login';
    }
  }
  },
  
};

</script>

<style scoped>
.moreInfo {
    position: absolute;
    display: inline-flex;
    justify-content: space-between;
    flex-wrap: wrap;
    top: 100px;
    right: 50px;
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
    max-height: 600px;
    overflow: hidden;
}
li{
    margin: 0;
    border-bottom: 1px solid;
    padding: 4px 31px;
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
}
</style>

 

