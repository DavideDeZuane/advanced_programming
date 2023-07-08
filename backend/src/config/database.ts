import mongoose, { Connection } from "mongoose";
import winston from "winston";

//da mettere in una variabile d'ambiente
const dbUri:string='mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming' 

class DB {
    private readonly logger: winston.Logger;
    private static istance:DB;
    private connection:any;

    private constructor(){ 
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [ new winston.transports.Console() ]
        })

        this.connection= mongoose.connect(dbUri)
            .then( () => this.logger.info('Connessione al Database MongoDB'))
            .catch((e: mongoose.Error) => this.logger.error(`Connessione fallita ocn errore: ${e}`));
    }

    static getIstance(){
        if(!this.istance) 
            this.istance = new DB();
        return this.istance;
    }

    public getLogger() {
        return this.logger;
    }
    public getConnection(){
        return this.connection;
    }
}

export default DB;