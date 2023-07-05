import express, { Express, Request, Response } from 'express';

const app:Express = express()
const port = 3000

const mongoose = require('mongoose');


app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(mongoose.connect('mongodb://adprogramming:adprogramming@mongodb27017/test')
  )
  console.log(`Example app listening on port ${port}`)
})