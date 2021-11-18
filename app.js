const express = require("express");
// basic Working of express -> METHOD + ROUTE

const users=require("./users.json");

const app=express();//app is an object

app.use(express.json());

//1 GET
app.get("/",(req,res)=>{
    res.send(users);
})
/*DISADVANTAGES of GET
limited capacity(2048 bytes)
everything you send is visible in the request url
*/ 

//2 POST (We will get some data from client and we need to parse the data received from client)
app.post("/",(req,res)=>{
    //console.log(req.body); 
    const newUsers=[...users, req.body];
    res.send(newUsers);
})

//: tells the value mentioned after it is dynamic 

//3 PATCH (To update an item)
app.patch("/:email",(req,res)=>{//We are going to access the item by using the email in the link, after the slash
//console.log(req.params.email);// req.params.email:-This helps to get email variable
const newUsers=users.map(user=>{//mapping over all users and if the email received inthe request url is same, then we will replace that object with a new object.
    if(req.params.email===user.email){
        return req.body;
    }
    return user;
})
res.send(newUsers);
})// /:email here email is the thing we want to be dynamic (basically to pass)


//4 DELETE
app.delete("/:email",(req,res)=>{
    const newUsers=users.filter((user)=> user.email !==req.params.email); // we dont transfer the object to newUsers, whose email is equal to the email provided as a request 
    res.send(newUsers);
})

//5 GET a single item
app.get("/:email",(req,res)=>{
    const newUsers=users.filter((user)=> user.email ===req.params.email);// we only transfer the object to newUsers, whose email is equal to the email provided as a request 
    res.send(newUsers);
})


app.listen(2345,function(){
    console.log("Listening on Port 2345");
})