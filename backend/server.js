const express=require("express"); //importamos el express para poder utilizarlo
const { controller }=require("./controllers/tareasController");
const { router }=require("./routers");

const app=express();
const port=5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Bienvenido a la app");
});

app.use(`/api/task`, router);

app.listen(port, ()=>{
    console.log(`Servidor escuchando al puerto ${port}`);
});