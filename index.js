import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
const app = express();

const corsOptions = { // para quitar problema de cors
    origin: '*'
}


app.get("/", cors(), async (req, res) => {
    console.log("entro al try😎")
    try {
        //const {data} = await axios.get("https://www.bcentral.cl/inicio")
        const {dataits} = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf")
        const {dataits2} = await dataits.filter dataits.filter(system_name => system_name == "IT-ITS"); // return implicito
        //const $ = cheerio.load(data)
        //const selectorDolar = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"

        //res.json({ dolar: $(selectorDolar).text() });
        res.json([ dataits, dataits2 ]);
    } catch (error) {
        res.json({error})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("server de API-rigel activo en puerto 👉: " + PORT))
