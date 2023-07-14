import express, { Express, Request, Response } from 'express';
import cors from 'cors'
import { seed } from './model/seeder';
import * as router from './routes'
import { errHandler } from './middlewares/index';
import { AppLogger, DB } from './utils/index';

const app:Express = express()
const port:string = process.env.PORT_BACKEND || '3000';
const logger = AppLogger.getInstance();
const db = DB.getIstance().getConnection();

const setup = () => {
  /* Setting-up global middleware */
  app.use(cors());
  app.use(express.json())
  app.use(errHandler)
  /* Setting-up router */
  app.use('/clients', router.clientRouter);
  app.use('/components', router.componentRouter);
  app.use('/employes', router.employeeRouter);
  app.use('/prototypes', router.protoRouter);
  app.use('/devices', router.deviceRouter);
  app.use('/systems', router.systemRouter);
  app.use('/files', router.fileRouter);
  app.use('/versions', router.versionRouter);
  app.use('/operations', router.operationRouter);
}

app.get('/seed', async(req:Request, res:Response) => {
  await seed();
  res.send("Aggiunto cliente");
})

/* 
################################################
STARTING THE SERVER
################################################
*/
app.listen(port, () => {
  setup()
  logger.info(`Server in ascolto sulla porta ${port}`)
});

