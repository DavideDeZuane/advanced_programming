import mongoose, { Connection } from "mongoose";
import AppLogger from "./Logger";

//da mettere in una variabile d'ambiente
const dbUri:string='mongodb://adprogramming:adprogramming@mongodb:27017/adprogramming' 

class DB {
    private static istance:DB;
    private connection:any;
    private logger:AppLogger

    private constructor(){ 
        this.logger = AppLogger.getInstance();

        this.connection= mongoose.connect(dbUri)
            .then( () => this.logger.info('Connessione al Database MongoDB'))
            .catch((e: mongoose.Error) => this.logger.error(`Connessione al Database fallita: ${e.message}`));
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