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
        const server = data[i];
        if (!serversFound[server.serverUrl]) {
            serversFound[server.serverUrl] = { serverName: server.serverName, serverUrl:server.serverUrl, users: 0 };
        }
        serversFound[server.serverUrl].users++;
    }
    return serversFound;
}

async function saveOpenStatsData(serversFound) {
    const data = [];
    for (const server in serversFound) {
        data.push(serversFound[server]);
    }
    await saveHistoryStatInCollection(new AppOpenStatHistory(new Date(), data, "daily"));
}