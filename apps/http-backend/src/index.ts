import express from "express";
import jwt from "jsonwebtoken"
const app=express();

app.post("/signup",(req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

})

app.post("/signin",(req,res)=>{


    const token=jwt
})

app.post("/create-room",(req,res)=>{

    
})

app.listen(3005);