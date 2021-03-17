import { mlb, college } from './controller'
import { app , Request, Response } from '../core/server'

app.get( "/baseball", ( req: Request, res: Response ) => {
    res.status(200).send('Baseball Stats');
});

export { app }