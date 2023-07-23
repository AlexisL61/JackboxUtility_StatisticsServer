import { connectToDatabase } from "./services/mongodbConnector";
import { startServer } from "./services/router";

async function init(){
    await connectToDatabase();
    startServer();
}

init();