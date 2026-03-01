//const express = require('express')//common.js-sync
import express from "express";//module.js-async
import dotenv from "dotenv"
dotenv.config();
const app = express()
const port=process.env.PORT
'/login'
app.get('/signup', (req, res) => {
  res.send('signup successfully')
})

app.listen(port,() => {
  console.log(`server running on ${port}`)
})
