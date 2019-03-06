<template>
    <form id="form" v-on:submit.prevent="checkUsers()">
            <div class="form-group">
                <label for="inputLog">Login</label>
                <input type="text" class="form-control" id="inputLog" placeholder="Enter login">
            </div>
            <div class="form-group">
                <label for="inputPass">Password</label>
                <input type="password" class="form-control" id="inputPass" placeholder="Password">
            </div>
            <button type="submit" class="btn">Submit</button>
            <span id="wrong" style="color:red; font-size: 13px;"></span>
        </form>
</template>

<script>
import jquery from './jquery-3.3.1.js'
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
    
    start(){
        localStorage.removeItem('user');
    },

    
    checkUsers() {
        
        const user = {
            login: $('#inputLog').val(),
            password: $('#inputPass').val()
        }
        const findUser = this.users.find(u => u.login === user.login)
        if (findUser) {
            if (user.password === findUser.password) {
                localStorage.setItem('user', user.login);
                window.location.href = './Header.vue';
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

<style>

</style>
