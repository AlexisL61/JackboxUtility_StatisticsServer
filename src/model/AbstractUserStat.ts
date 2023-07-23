import { hash256 } from "../services/hash";
import { saveStatInCollection } from "../services/mongodbConnector";

export default class AbstractUserStat {
    hash:string;
    data:any;

    constructor(ip:string, data:any){
        this.hash = hash256(ip);
        this.data = data;
    }

    toJson():any{
        return {};
    };

    getCollectionName():string{
        return "";
    };

    static availableFields():string[]{
        return [];
    };

    async save(){
        saveStatInCollection(this);
    }
}