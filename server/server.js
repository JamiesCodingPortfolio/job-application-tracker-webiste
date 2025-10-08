import { Router } from 'express';

import dotenv from 'dotenv';
import fs from 'fs';
import https from 'https';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { connectDB } from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

connectDB();

const app = express();

app.use(express.static('public'));

const HTTPS_ENABLED = process.env.HTTPS_ENABLED === 'true'
const HTTP_PORT = parseInt(process.env.HTTP_PORT_NUMBER)
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT_NUMBER)
const DOMAIN = process.env.DOMAIN_NAME

let originPoint;

if (DOMAIN === ''){
  originPoint = "http://localhost:3000";
}
else{
  originPoint = `${DOMAIN}`;
}

app.use(express.json());

if (HTTPS_ENABLED){

  const privateKey = fs.readFileSync(join(__dirname, '../private.key'), 'utf-8');
  const certificate = fs.readFileSync(join(__dirname, '../certificate.crt'), 'utf-8');

  const httpsServer = https.createServer(
    { key: privateKey, cert: certificate},
    app
  )

  httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`HTTPS Server started on port ${HTTPS_PORT}`);
  });
}

else{
  app.listen(HTTP_PORT, '127.0.0.1', () => {
    console.log(`Server running on port ${HTTP_PORT}`);
  })
}