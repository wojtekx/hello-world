<template>
    <div class="container col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <form id="form" v-on:submit.prevent="checkUsers()">
            {{start()}}
                <div class="form-group">
                    <label for="inputLog">Login</label>
                    <input type="text" class="form-control col-2" id="inputLog" placeholder="Enter login">
                </div>
                <div class="form-group">
                    <label for="inputPass">Password</label>
                    <input type="password" class="form-control col-2" id="inputPass" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-secondary">Submit</button><br>
                <span id="wrong" ></span>
        </form>
    </div>    
</template>

<script>
import '@/others/jquery-3.3.1.js'
export default {
name: 'Login',
data(){
    return{
        users:[
    {
        login: "admin",
        password: "admin"
    },
    {
        login: "wojtek",
        password: "kogut"
    },

    ],
    }
    
},
methods:{
    // Wylogowanie użytkownika //
    start(){
        localStorage.removeItem('user');
    },

    // walidacja formularza //
    checkUsers() {
        const user = {
            login: $('#inputLog').val(),
            password: $('#inputPass').val()
        }
        const findUser = this.users.find(u => u.login === user.login)
        if (findUser) {
            if (user.password === findUser.password) {
                localStorage.setItem('user', user.login);
                window.location.href = '#/Header';
            }
            else {
                $('#wrong').html('Niepoprawne haslo')
            }
        }
        else {
            $('#wrong').html('Niepoprawny login lub haslo')
        }

    }
}
}
</script>

<style scoped>

#wrong{
    color:red; 
    font-size: 13px;
    font-weight: 500;
}
.btn-secondary{
     margin-bottom: 10px;
}
.form-group .col-2{
    margin: 0 auto;
    min-width: 200px;
}
.form-group label{
    color: white;
}
form{
    margin-top: 50px;
    border: 1px solid gray;
    border-radius: 5px;
    padding: 50px 0;
    background-image: url('../assets/1.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.container{
    margin-top: 20%;
}

</style>
