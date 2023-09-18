import express from 'express'
import bodyParser from 'body-parser';
import {getDocumentsInCollection, getHistoryDocumentsInCollection } from './mongodbConnector'
import AppOpenStat from '../model/AppOpenStat'
import UserStatController from '../controller/userStatController'
import { hidePrivateDataArray } from './hider';
import { buildCSVFromAppOpenStatHistoryData } from './csvBuilder';

const app = express()
const port = 80
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export async function startServer() {

    app.post('/api/app_open',async (req, res) => {
        var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        try {
            var openStats = UserStatController.generateClass(ip, AppOpenStat, req.body);
            await openStats.save()
            res.send("OK")
        } catch (error) {
            console.error(error)
            res.status(500).send("ERROR")
        }
    })

    app.get('/api/app_open',async (req, res) => {
        res.send(hidePrivateDataArray(await getDocumentsInCollection("appOpenStats")))
    });

    app.get('/api/app_open/csv/:type',async (req, res) => {
        var data = await getHistoryDocumentsInCollection("appOpenStatHistory", req.params.type);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=\"appOpenStats.csv\"');
        res.send(buildCSVFromAppOpenStatHistoryData(data));
    });

    app.listen(port, () => {
        console.log(`JackboxUtility statistics server available on port ${port}`)
    });
}