import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";
const app = express();

const corsOptions = { // para quitar problema de cors
    origin: '*'
}


app.get("/", cors(), async (req, res) => {
    console.log("1️⃣entro al try😎")
    try {
        //const {data} = await axios.get("https://www.bcentral.cl/inicio")
        const {data} = await axios.get("http://rigel.greenmovil.com.co:8080/RigelpbWS/disponibilidadFlota/todos?key=JM8xH8zNHX7XGsUe8rkDf")

            //filtrar area its en general
            //const data2 = datarigel.filter(item => item.system_name === 'IT-ITS')
            const dataTecnologia = await data.data.filter(item => item.system_name === 'IT-ITS') 
            const dataSirci = await data.data.filter(item => item.system_name === 'IT-SIRCI') 
            //const datarigelsirci = datarigel.filter(item => item.system_name === 'IT-SIRCI')
            const areaItTotal = [...dataTecnologia, ...dataSirci] //operador de propagación para fusionar objetos en JavaScript


        //const $ = cheerio.load(data)
        //const selectorDolar = "#_BcentralIndicadoresViewer_INSTANCE_pLcePZ0Eybi8_myTooltipDelegate > div > div > div.fin-indicators-col1 > div > div > div:nth-child(1) > div > p.basic-text.fs-2.f-opensans-bold.text-center.c-blue-nb-2"

        //res.json({ dolar: $(selectorDolar).text() });
        // console.log(data2);
        console.log("2️⃣Respuesta exitosa del backend🎯 filtrado por its y sirci");
        var reporteRigel={}
        reporteRigel.inoperativos = data
        reporteRigel.inoperativosItsTotal = areaItTotal
        reporteRigel.inoperativosTecnologia = dataTecnologia
        reporteRigel.inoperativosSirci = dataSirci
        //reporteRigel.datos2 = data2
        console.log("3️⃣se crea los 4 arrays de reporteRigel");
        
        //agregar data suma de areas
        const arr = reporteRigel.inoperativos.data
        //console.log("arr")
        let inoperativosSuma = arr.reduce( (acc, arr) => (acc[arr.system_name] = (acc[arr.system_name] || 0) + 1, acc), {} );
        let inoperativosSuma2 = Object.entries(inoperativosSuma)
        //console.log("inoperativosSuma2")    
        reporteRigel.inoperativosSuma = inoperativosSuma2

        //respuesta json
        res.json({ reporteRigel });
        console.log("4️⃣🏃‍♀️🎃🎃🎃Se genera respuesta exitosa en json")
    } catch (error) {
        res.json({error})
    }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✨SE ACTIVA SERVIDOR✨ server de API-rigel activo en puerto 👉: http://localhost:${PORT}`))
