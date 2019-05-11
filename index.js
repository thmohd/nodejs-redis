const redis = require('redis');
const express = require('express');
const axios = require('axios');

const app = express();
const client = redis.createClient(6379,'127.0.0.1');


app.get('/', (req, res) => {

    client.get('EMPLOYEE108', (error, data) => {
        if (error) throw error;
        if(data){
            res.json(JSON.parse(data));
        }else {
            axios.get('http://127.0.0.1:3000/data')
                .then((response) => {
                    client.set('EMPLOYEE108', JSON.stringify(response.data), (err, reply)=>{
                        console.log(err)
                        console.log(reply)
                    })
                    res.json(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });

        }
    });

});

app.get('/data', (req, res) => {
    setTimeout(() => {
        res.json({"name":"John", "age": 30});
    }, 9000);  
})


app.listen(3000, () => {
    console.log('listening on port 3000');
})
