import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const corsOptions = { 
    origin: '*' // para quitar restricciones de CORS
}

app.get("/", cors(), async (req, res) => {
    console.log("1️⃣entro al try😎")
    try {
        const {data} = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf") // importar datos XML y pasar a JSON
        //agregar datos a objeto
        var reporteRigel = data
        //console.log(reporteRigel)
        res.json( data ); //respuesta json    console.log(Se genera respuesta exitosa en json")
    } catch (error) {
        res.json({error})
    }
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✨SE ACTIVA SERVIDOR✨ server de API-rigel activo en puerto 👉: http://localhost:${PORT}`))
