import AbstractStatHistory from "./AbstractStatHistory";


export default class AppOpenStatHistory extends AbstractStatHistory {
    serverData:Array<{serverName:String, serverUrl:String, users:number}>;

    constructor(date:Date, serverData:Array<{serverName:String, serverUrl:String, users:number}>, type:"daily"|"weekly"|"monthly" ){
        super(date, type);
        this.serverData = serverData;
    }

    toJson(): any {
        return {
            date:this.date,
            type:this.type,
            serverData:this.serverData
        }
    }
    getCollectionName(): string {
        return "appOpenStatHistory";
    }
    
}