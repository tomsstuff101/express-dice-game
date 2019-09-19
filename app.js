const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, "public")))



// // request -- responce
// app.get('/' , (req,res) =>{
//     res.send('<h1>Hello my name is Bob Hoskins</h1>')   // responce 
// })


// app.get('/blah' , (req,res) =>{
//     console.log('blah')  
//     // GET request to the url 
//     // wont serve a responce on browser, but when you got to localhost:3000/thisWontGoToTheBrowser
//     // will get 'blah' on the console
// })


// app.get('/info' , (req,res) =>{
//     res.send({name:"tom" , age:"99"})   // automaticaly pasred as JSON data !
// })


console.log(__dirname)


app.listen(3000,() => {
    console.log('listening on port 3000')
}) 