import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import app from './app.js';

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
