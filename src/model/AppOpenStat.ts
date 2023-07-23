import AbstractUserStat from "./AbstractUserStat";

export default class AppOpenStat extends AbstractUserStat{
    constructor(ip:string, data:any){
        super(ip, data);
    }

    static availableFields(): string[] {
        return ["serverName", "serverURL"]
    }

    toJson(): any {
        return {
            hash:this.hash,
            date:Date.now()
        }
    }
    getCollectionName(): string {
        return "appOpenStats";
    }
    
}