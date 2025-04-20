import express from 'express';
import cors from 'cors';

import gemstoneRoute from './routes/gemstoneRoute.js';
import userRoute from './routes/userRoute.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/', gemstoneRoute);
app.use('/', userRoute);

app.get('/', (req, res) => {
    console.log(req);
    res.json({msg: "hello world"});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});