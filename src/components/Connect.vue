<template>
    <div class="conn">

    </div>
</template>

<script>
export default {
name: "Connect",

data(){
    return{
       
    }
},
methods:{
    connection(){
        const config = {
            host     : '55.mysql.ideo',
            user     : 'root',
            password : 'root',
            database : 'praktykant4',
        }
        const connection = mysql.createConnection(config);

        connection.connect( err => {
            if(err) throw err;
        });

        app.all('/', (req, res)=>{
            connection.query("Select * from town", (err, result, fields)=>{
                if (err) throw err;
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(result));
            });
            
        })

        connection.end();
    }
}
}
</script>

<style>

</style>
