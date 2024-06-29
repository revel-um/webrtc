export default class Config {
    static config;

    static loadEnv() {
        console.info('Config loaded successfully');
        this.config = {
            mongoUrl: process.env.MONGO_URL,
            port: Number(process.env.PORT),
        };
    }
}