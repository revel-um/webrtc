import dotenv from 'dotenv'
import Config from "./config/index.js";
import MongodbConnection from "./db/connection.js";
import App from './app.js';

dotenv.config();
Config.loadEnv();

MongodbConnection.connect().then(() => {
  console.log('MongoDb connection successful');
  App.start();
}).catch(() => {
  console.log('Mongodb connection failed');
})