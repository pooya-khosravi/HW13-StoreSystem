//import useful modules
const express = require("express");
const productsPageRouter = express.Router();
const path = require("path");
const fs = require("fs");

//create one rout for handle requests product
productsPageRouter.get("/:id", function (req, res) {
    //read file for find image src indented
    fs.readFile( path.join(__dirname, "../tools/products.json"), "utf8", function (err, productsJsonFileData2) {
        if(err)
        {
            console.log(err.message);
        }
        else
        {
            productsArray2 = JSON.parse(productsJsonFileData2);//convert json file to object for find indent id
            let find = false;
            for(let i=0; i<productsArray2.length && find === false; i++)
            {
                if(productsArray2[i].parentID === req.params.id)
                {
                    find = true;
                    res.render( path.join(__dirname, `../views/pages/productsPages/products.ejs`), {thisObj: productsArray2[i]} )
                }
            }
        }
    });
})

module.exports = productsPageRouter;