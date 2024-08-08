import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000

const corsOptions = { // para quitar problema de cors
    origin: '*'
}

app.get("/", cors(), async (req, res) => {
    try {
        const { data } = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf")

        res.json( data );        //respuesta json
        console.log("🎃Se genera respuesta exitosa en json")
    } catch (error) {
        res.json({error})
    }
})

app.listen(PORT, () => console.log(`✨SE ACTIVA SERVIDOR✨ server de API-rigel activo en puerto 👉: http://localhost:${PORT}`))
