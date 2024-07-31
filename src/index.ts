import express from 'express';
import 'dotenv/config'
import router from "./routes";

const app = express();

app.use('/api', router)

export default app;