const express=require("express"); //importamos el express para poder utilizarlo
const app=express();
const port=5000;
app.get("/", (req, res)=>
{
    res.send("Hola");
});

app.listen(port, ()=>{
    console.log(`Servidor escuchando al puerto ${port}`);
});