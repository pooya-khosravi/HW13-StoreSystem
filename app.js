// import useful modules
const express = require("express");
const app = express();
const module_productsPageRouting = require("./routers/productsPageRouting.js")
const bodyParser = require("body-parser");
const fs = require("fs");

//for use body parser
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

app.set("view engine", "ejs");// set ejs engine

app.use("/", express.static("public"));//make public this file

let productsArray;
//create routing for handle req for main pages
app.get("/home", function (req, res) {
    //read data base for send that file to client
    fs.readFile( (__dirname + "/tools/products.json"), "utf8", function (err, productListData) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            productsArray = JSON.parse(productListData)
            res.render( __dirname + "/views/pages/mainPages/home.ejs", {productsArray} );
        }
    })
})

//after get home page then can send req to get products
app.use("/home", module_productsPageRouting);

//filter database for searching user and getBack to client for handle
app.get("/home/search/:id", function (req, res) {

    let reqParam = req.params.id;
    
    productsArray = productsArray.filter(function (arr) {
        return arr.title.includes(reqParam);
    })
    res.render( (__dirname + "/views/pages/mainPages/searchPage.ejs"), {productsArray, onvan: req.params.id})
})

//handle for req to about and contact
app.get("/about", function (req, res) {
    res.render(__dirname + `/views/pages/mainPages/aboutUS.ejs`);
})

app.get("/contact", function (req, res) {
    res.render(__dirname + `/views/pages/mainPages/contactUS.ejs`);
})

app.listen(4000, function () {
    console.log("server started on port: 4000");    
})