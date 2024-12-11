import express from 'express';
// import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

import Address from './address';

const PORT = 3002

const app = express();

app.use(cors());
app.use(express.json());

app.use('/address', Address)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});