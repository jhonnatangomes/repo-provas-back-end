import './setup';

import express from 'express';
import cors from 'cors';
import 'reflect-metadata';

import connectDatabase from './database';

import errorMiddleware from './middlewares/error';
import examRouter from './routers/examRouter';
import infoRouter from './routers/infoRouter';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/provas', examRouter);
app.use('/info', infoRouter);
app.use(errorMiddleware);

export async function init() {
    await connectDatabase();
}

export default app;
