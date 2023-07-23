import express from 'express'
import { getAppOpenStats, insertAppOpenStats } from './mongodbConnector'
const app = express()
const port = 80

export async function startServer() {

    app.get('/',async (req, res) => {
        await insertAppOpenStats({"hello":"world"})
        res.send(await getAppOpenStats())
    })

    app.listen(port, () => {
        console.log(`JackboxUtility statistics server available on port ${port}`)
    });
}