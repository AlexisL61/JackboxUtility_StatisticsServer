import AppOpenStatHistory from "../model/AppOpenStatHistory";
import { getDocumentsInCollection, saveHistoryStatInCollection } from "./mongodbConnector";

const cron = require('node-cron');

export function startCron() {
    cron.schedule('0 2 * * *', async () => {
        console.log('Running cron job');
        doCronJob();
    });
    doCronJob();
}

async function doCronJob() {
    const serversFound = await retrievingOpenStatsData();
    await saveOpenStatsData(serversFound);
}

async function retrievingOpenStatsData() {
    let data = await getDocumentsInCollection("appOpenStats", { "date": { "$gte": Date.now()-86400000 } });
    const serversFound = {};
    for (let i = 0; i < data.length; i++) {
        let server = data[i];
        if (!serversFound[server.serverUrl]) {
            serversFound[server.serverUrl] = { serverName: server.serverName, serverUrl:server.serverUrl, users: 0 };
        }
        serversFound[server.serverUrl].users++;
    }
    return serversFound;
}

async function saveOpenStatsData(serversFound) {
    const data = [];
    console.log(serversFound);
    for (const server in serversFound) {
        console.log(serversFound[server], server);
        data.push(serversFound[server]);
    }
    const d = new Date();
    const currentDateAsString = d.getFullYear()+ "-" + ("0"+(d.getMonth()+1)).slice(-2) +"-"+ ("0" + (d.getDate())).slice(-2);
    await saveHistoryStatInCollection(new AppOpenStatHistory(currentDateAsString, data, "daily"));
}
