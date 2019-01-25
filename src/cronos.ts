import { config as configDotEnv } from 'dotenv';
configDotEnv();

import express from 'express';
import path from 'path';
const app = express()
const port = process.env.port || 3000

app.use(express.static(path.join(__dirname, 'public')))

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => console.log(`CRONOS Server running on HTTP:${port}`))