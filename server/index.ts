import express from 'express';
// import axios from 'axios';
import cors from 'cors';
import 'dotenv/config';

import Address from './routes/address';
import Parcel from './routes/parcel';

const PORT = 3002;

const app = express();

app.use(cors({
  origin: 'https://ccaldwell-spatial.netlify.app',
  methods: ['GET'],
}));
app.use(express.json());

app.use('/address', Address);
app.use('/parcel', Parcel);

app.listen(PORT, () => {
  console.log(`Server is running on https://ccaldwell-assessment-production.up.railway.app`);
});
