import { hash256 } from "../services/hash";
import { saveStatInCollection } from "../services/mongodbConnector";

export default abstract class AbstractUserStat {
    hash:string;

    constructor(ip:string){
        this.hash = hash256(ip);
    }

    abstract toJson():any;

    abstract getCollectionName():string;

    async save(){
        saveStatInCollection(this);
    }
}