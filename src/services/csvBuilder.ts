type appOpenStatHistoryData = {serverData:{serverName:string, serverUrl:string, users:number}[], date:Date, type:"daily"|"weekly"|"monthly"};

export function buildCSVFromAppOpenStatHistoryData(stats:appOpenStatHistoryData[]){
    const servers = findAllServers(stats);
    const csv = [];
    csv.push(buildCSVHeader(servers).join(","));
    stats.forEach((stat)=>{
        csv.push(buildCSVRow(stat, servers).join(","));
    })
    return csv.join("\n");
}

function findAllServers(stats:appOpenStatHistoryData[]):{serverName:string, serverUrl:string}[]{
    const servers = new Set<{serverName:string, serverUrl:string}>();
    stats.forEach((stat)=>{
        stat.serverData.forEach((server)=>{
            if (!servers.has(server))
                servers.add(server);
        })
    })
    return Array.from(servers);
}

function buildCSVHeader(servers: { serverName: string; serverUrl: string; }[]) {
    const csv = [];
    const header = ["date", "total"];
    servers.forEach((server)=>{
        header.push(server.serverName);
    })
    csv.push(header);
    return csv;
}

function buildCSVRow(stat: appOpenStatHistoryData, servers: { serverName: string; serverUrl: string; }[]): any {
    const row = [stat.date, stat.serverData.reduce((acc, server)=>acc+server.users, 0)];
    servers.forEach((server)=>{
        const serverStat = stat.serverData.find((s)=>s.serverName === server.serverName);
        if (serverStat)
            row.push(serverStat.users);
        else
            row.push(0);
    })
    return row;
}

