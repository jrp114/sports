import { app , Request, Response } from './core/server'
import dotenv from 'dotenv'

dotenv.config()

import './baseball/routes'

app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send('Comming Soon');
});