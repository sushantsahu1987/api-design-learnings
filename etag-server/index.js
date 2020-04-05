const express = require("express");
const bodyParser = require("body-parser");
const uuidv1 = require("uuid/v1");
const sha256 = require("sha256");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
myCache.set("users","-1" );

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const users = [];

app.get("/users",(req, resp)=> {
    const {headers} = req;
    console.log(headers);
    const cache = headers["if-none-match"];
    console.log("if none match : ",cache);
    console.log("cache : ",myCache.get("users"));
    const usercahce = myCache.get("users");
    if(usercahce === cache) {
        resp.sendStatus(304)
    }else {
        resp.set("ETag",usercahce).send({
            payload:  users
        })
    }
    
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
    const cache = sha256(JSON.stringify(users))
    myCache.set("users",cache );
    resp.send(response);
});

app.listen(3000, ()=> {
    console.log("server running on port 3000");
})