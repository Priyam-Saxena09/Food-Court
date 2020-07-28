const express = require("express");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + "/public"));
const request = require("request");
const{ food,id } = require("./callback.js");


app.get("/food",(req,res) => {
    if(!req.query.q)
    {
        return res.send({
            err:"Please type any recipe"
        })
    }
    const recip = req.query.q;
    food(recip,(error,data) => {
       if(error)
       {
           return res.send({
            err:error
           })
       }
       else
       {
           return res.send({
               recipes:data.recipes,
           })
       }
    })


})

app.get("/id",(req,res) => {
    const ide = req.query.id;
    id(ide,(error,data) => {
        if(error)
       {
           return res.send({
            err:data.error
           })
       }
       else
       {
           return res.send({
            ingredients:data.recipe.ingredients,
            url:data.recipe.image_url,
            surl:data.recipe.source_url,
            title:data.recipe.title
           })
       }
    })
})


app.listen(port,() => {
    console.log("Server is on port " + 3000);
})