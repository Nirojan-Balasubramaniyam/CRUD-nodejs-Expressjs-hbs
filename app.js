const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql"); 

require('dotenv').config();  

const app = express();
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//for static files
app.use(express.static("public")); 

//Template engine
const handlebars = exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

/*
//MySQL
const connectn = mysql.createPool({
    connectionLimit:10,
    host: process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME

});

//Check database conncection
connectn.getConnection((err,connection)=>{
    if(err) throw err
    console.log("Connection sucess")
});
*/

//Router
/*
app.get('/',(req,res)=>{
    res.render("home");
}); 
*/

const routes = require("./server/routes/students");
app.use('/',routes);

// console.log("test");

// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`listening on port ${port}!`))
app.listen(port,()=>{
    console.log("Listening to port: "+port)
});