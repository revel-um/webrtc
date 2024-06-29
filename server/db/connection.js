import Config from "../config/index.js";
import mongoose from "mongoose";

export default class MongodbConnection {
    static connect() {
        console.log('connecting to mongodb')
        return mongoose.connect(Config.config.mongoUrl, { dbName: 'GuruCool' });
    }
}