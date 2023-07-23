import express from 'express'
import bodyParser from 'body-parser';
import {getDocumentsInCollection } from './mongodbConnector'
import AppOpenStat from '../model/AppOpenStat'
import UserStatController from '../controller/userStatController'

const app = express()
const port = 80
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export async function startServer() {

    app.post('/',async (req, res) => {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        console.log(req.body);
        var openStats = UserStatController.generateClass(ip, AppOpenStat, req.body);
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