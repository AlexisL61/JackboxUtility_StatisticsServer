import express from 'express'
import {getDocumentsInCollection } from './mongodbConnector'
import AppOpenStat from '../model/AppOpenStat'
const app = express()
const port = 80

export async function startServer() {

    app.get('/',async (req, res) => {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        var openStats = new AppOpenStat(ip)
        await openStats.save()
        res.send("OK")
    })

    app.get('/api/getData',async (req, res) => {
        res.send(await getDocumentsInCollection("appOpenStats"))
    });

    app.listen(port, () => {
        console.log(`JackboxUtility statistics server available on port ${port}`)
    });
}