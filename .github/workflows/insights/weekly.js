// Fetching server data :  
 const fetch = require("node-fetch") 
  
 const serversFound = {} 
 let usersFound = 0; 
  
 async function buildInsight(){ 
     const response = await fetch("https://stats.jackboxutility.com/api/app_open"); 
  
     /** 
      * @type {Array<{date:number, serverName:string, serverURL: string}>} 
      */ 
     const arrayData = await (response).json(); 
  
     var dateMinusOneDay = Date.now()-86400000*7; 
  
     for (const data of arrayData){ 
         const date = data.date; 
         if (date > dateMinusOneDay){ 
             usersFound++; 
             const serverName = data.serverName; 
             const serverURL = data.serverURL; 
             if (!serversFound[serverURL]){ 
                 serversFound[serverURL] = { 
                     name: serverName, 
                     url: serverURL, 
                     count: 1 
                 } 
             }else{ 
                 serversFound[serverURL].count++; 
             } 
         } 
     } 
  
     let message = "# Users found in the last 24 hours\n\nTotal of **"+usersFound+"** users\n\n# Users for each server\n\n"; 
  
     for (const server of Object.values(serversFound)){ 
         message += `**${server.name}** - ${server.count} users\n`; 
     } 
  
     console.log(message); 
  
     fetch( 
         process.env.DISCORD_WEBHOOK_URL, 
         { 
             method: "POST", 
             headers: { 
                 "Content-Type": "application/json" 
             }, 
             body: JSON.stringify({ 
                 content: message 
             }) 
         } 
     ) 
 } 
  
 buildInsight();
