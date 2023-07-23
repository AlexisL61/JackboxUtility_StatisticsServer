import AbstractUserStat from "../model/AbstractUserStat";
import AppOpenStat from "../model/AppOpenStat";

export default class UserStatController {
    static generateClass(ip, classType:(typeof AbstractUserStat), data:any):AbstractUserStat{
        // Checking if all fields are available
        classType.availableFields().forEach(field => {
            if(!data[field]){
                throw new Error(`Missing field ${field} in data`)
            }
        });

        // Creating the class
        var classInstance = new classType(ip,data);
        return classInstance;
    }
}