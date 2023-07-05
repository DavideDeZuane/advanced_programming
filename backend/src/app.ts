import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

const app:Express = express()
const port = 3000

const dbUri:string = 'mongodb://adprogramming:adprogramming@localhost:27017/admin' 

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.get('/db', (req:Request, res:Response) => { 
  mongoose.connect(dbUri);
  res.send('provato');
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

