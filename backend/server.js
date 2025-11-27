import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import router from "./routers/tareasRouters.js"

dotenv.config()

const app=express();
const port=process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send({menssage: "Bienvenido a la app"});
});

app.use(`/tarea`, router);

app.listen(port, ()=>{
    console.log(`Servidor escuchando al puerto ${port}`);
});