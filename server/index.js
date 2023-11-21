import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import userRoutes from './routes/user.js'

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/api/user', userRoutes);      //  {domainname}/api/user

// for frontend
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
})


const ConnectionURL = 'mongodb+srv://imrankaleelbp:fR8kAeHYPsY3gbzD@cluster0.aoqra8q.mongodb.net/';
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose.connect(ConnectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is Running at Port: ${PORT}`)))
    .catch((err) => console.log(err.message));