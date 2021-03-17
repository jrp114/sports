import { app , Request, Response } from './core/server'
import './baseball/routes'

app.get( "/", ( req: Request, res: Response ) => {
    res.status(200).send('Comming Soon');
});