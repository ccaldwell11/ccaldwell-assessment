import express, { Request, Response } from 'express';
// import axios from 'axios';

const Address = express.Router();

Address.get('/test', (req: Request, res: Response) => {
    res.send('is this thing on?')
})

export default Address;
