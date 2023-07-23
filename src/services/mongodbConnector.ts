import * as mongoDB from "mongodb";

export const collections: { appOpenStats?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    console.log("mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@mongo")
    const client: mongoDB.MongoClient = new mongoDB.MongoClient("mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@mongo");
    
    await client.connect();
    
    const db: mongoDB.Db = client.db("STATS");
    
    const gamesCollection: mongoDB.Collection = db.collection("appOpenStats");
    
    collections.appOpenStats = gamesCollection;
    
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
}

export async function insertAppOpenStats (appOpenStats: any) {
    const result = await collections.appOpenStats?.insertOne(appOpenStats);
    console.log(`Successfully inserted document with _id: ${result?.insertedId}`);
}

export async function getAppOpenStats () {
    const cursor = collections.appOpenStats?.find({});
    const result = await cursor?.toArray();
    console.log(`Successfully found ${result?.length} documents`);
    return result;
}