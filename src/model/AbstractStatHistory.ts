import { saveHistoryStatInCollection } from "../services/mongodbConnector";


export default class AbstractStatHistory {
    date:Date;
    type:"daily"|"weekly"|"monthly"

    constructor(date:Date, type:"daily"|"weekly"|"monthly" ){
        this.date = date;
        this.type = type;
    }

    toJson():any{
        return {};
    };

    getCollectionName():string{
        return "";
    };

    async save(){
        saveHistoryStatInCollection(this);
    }

}