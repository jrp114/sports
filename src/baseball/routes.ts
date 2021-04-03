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

app.get("/get-player-info", async (req: Request, res: Response) => {
    const playerInfo = await mlb.getPlayerInfo(req.query.playerId)
    if (playerInfo == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_info: playerInfo})
});

app.get("/get-player-regular-season-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerRegularSeasonHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-post-season-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerPostSeasonHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-world-series-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerWorldSeriesHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-spring-training-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerSpringTrainingHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-exibition-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerExibitionHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-all-star-hitting", async (req: Request, res: Response) => {
    const playerHitting = await mlb.getPlayerAllStarHittingStats(req.query.playerId, req.query.year)
    if (playerHitting == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_hitting: playerHitting})
});

app.get("/get-player-regular-season-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerRegularSeasonPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});



app.get("/get-player-post-season-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerPostSeasonPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});

app.get("/get-player-world-series-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerWorldSeriesPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});

app.get("/get-player-spring-training-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerSpringTrainingPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});

app.get("/get-player-exibition-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerExibitionPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});

app.get("/get-player-all-star-pitching", async (req: Request, res: Response) => {
    const playerPitching = await mlb.getPlayerAllStarPitchingStats(req.query.playerId, req.query.year)
    if (playerPitching == 'error') {
        res.status(500).send({error: 'data was not processed correctly'})
    }
    res.status(200).send({player_pitching: playerPitching})
});


export { app }