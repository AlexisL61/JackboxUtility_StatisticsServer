import AbstractUserStat from "./AbstractUserStat";

export default class AppOpenStat extends AbstractUserStat{
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