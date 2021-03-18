import { mlb, college } from './controller'
import { app , Request, Response } from '../core/server'

app.get( "/baseball", ( req: Request, res: Response ) => {
    res.status(200).send('Baseball Stats');
});

app.get("/get-player-id", async (req: Request, res: Response) => {
    const playerId = await mlb.getPlayerId(req.query.first, req.query.last, req.query.active)
    if (playerId == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_id: playerId})
});

export { app }