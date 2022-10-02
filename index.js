import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
const app = express();


app.get("/", async (req, res) => {
    console.log("entro al try😎")
    try {
        const {data} = await axios.get("https://www.bcentral.cl/inicio")
        //const {data} = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf")

        const $ = cheerio.load(data)
        const selectorDolar = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"

        res.json({ dolar: $(selectorDolar).text() });
    } catch (error) {
        res.json({error})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server de API-rigel activo en puerto 👉: " + PORT))