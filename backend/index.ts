import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction, request } from 'express';
import mongoose from 'mongoose';
import travelRouter from './router/travel_router';
import loginRouter from './router/login_router';
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: 'hello' });
});

app.use('/api/travel', travelRouter);

app.use('/api/login', loginRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(
    `mongodb+srv://songess:songess@cluster0.wglcl.mongodb.net/termproject?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(8080);
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
