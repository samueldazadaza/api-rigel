import express from "express";
import axios from "axios"
const app = express();

app.get("/", async (req, res) => {

    try {
        //const {data} = await axios.get("https://www.bcentral.cl/inicio")
        const {data} = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf")

        res.json({ data });
        
    } catch (error) {
        res.json({error})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server de API-rigel activo en puerto 👉: " + PORT))