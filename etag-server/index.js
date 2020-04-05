const express = require("express");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const users = [];


app.get("/users",(req, resp)=> {
    resp.send({
        payload:  users
    })
});

app.post("/users",(req, resp)=> {
    const {user} = req.body
    const id = uuidv1()
    user.id = id;
    users.push(user)
    const response = {
        payload:  {
            userid: id
        }
    }
    resp.send(response)
});

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})