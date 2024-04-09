/* Here goes the code for the API server */
import express from 'express';
import morgan from 'morgan';

const app =express();
app.use(morgan('common'));
app.use(express.json());

