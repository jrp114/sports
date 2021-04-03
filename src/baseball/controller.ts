import axios from 'axios'

const mlb = {
    getPlayerId: async (firstName: String, lastName: String, active: String) => {
        try {
            const isActive = !active || active == 'true' ? 'Y' : 'N'
            const players: { data: { search_player_all: { queryResults: { row: any }}}} = 
                await axios.get(
                    `${process.env.MLB_API}/json/named.search_player_all.bam?sport_code='mlb'&active_sw='${isActive}'&name_part='${lastName}%25'`
                )
            const row = players?.data?.search_player_all?.queryResults?.row
            const playerDetail: any = !row?.length ? row : [...row]
            let player: any
            if (playerDetail?.length > 1) {
                player = playerDetail.filter((player: any) => player.name_use.toLowerCase() === firstName)
                return player.length !== 0 ? player[0].player_id : ''
            } else if (playerDetail) {
                return playerDetail.name_use.toLowerCase() === firstName ? playerDetail.player_id : ''
            } else {
                return ''
            }
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerInfo: async (playerId: String) => {
        try {
            const playerDetail: { data: { player_info: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.player_info.bam?sport_code='mlb'&player_id='${playerId}'`
            )
            const row = playerDetail?.data?.player_info?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerRegularSeasonHittingStats: async (playerId: String, year: String) => {
        try {
            const playerHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerHits?.data?.sport_hitting_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerPostSeasonHittingStats: async (playerId: String, year: String) => {
        try {
            const playerDivisionHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='D'&season='${year}'&player_id='${playerId}'`
            )
            const dHits = playerDivisionHits?.data?.sport_hitting_tm?.queryResults?.row
            dHits ? dHits['post_season'] = 'Divisional' : null
            const playerWildCardHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='F'&season='${year}'&player_id='${playerId}'`
            )
            const wcHits = playerWildCardHits?.data?.sport_hitting_tm?.queryResults?.row
            wcHits ? wcHits['post_season'] = 'Wild Card' : null
            const playerChampionshipHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='L'&season='${year}'&player_id='${playerId}'`
            )
            const cHits = playerChampionshipHits?.data?.sport_hitting_tm?.queryResults?.row
            cHits ? cHits['post_season'] = 'League Championship' :  null
            const ret = []
            dHits && Object.keys(dHits).length > 1 && ret.push(dHits)
            wcHits && Object.keys(wcHits).length > 1 && ret.push(wcHits)
            cHits && Object.keys(cHits).length > 1 && ret.push(cHits)
            return ret
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerWorldSeriesHittingStats: async (playerId: String, year: String) => {
        try {
            const playerHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='W'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerHits?.data?.sport_hitting_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerSpringTrainingHittingStats: async (playerId: String, year: String) => {
        try {
            const playerHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='S'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerHits?.data?.sport_hitting_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerExibitionHittingStats: async (playerId: String, year: String) => {
        try {
            const playerHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='E'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerHits?.data?.sport_hitting_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerAllStarHittingStats: async (playerId: String, year: String) => {
        try {
            const playerHits: { data: { sport_hitting_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_hitting_tm.bam?league_list_id='mlb'&game_type='A'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerHits?.data?.sport_hitting_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerRegularSeasonPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerPitching: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}//json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='R'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerPitching?.data?.sport_pitching_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerPostSeasonPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerDivisionPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='D'&season='${year}'&player_id='${playerId}'`
            )
            const dPitches = playerDivisionPitches?.data?.sport_pitching_tm?.queryResults?.row
            dPitches ? dPitches['post_season'] = 'Divisional' : null
            const playerWildCardPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='F'&season='${year}'&player_id='${playerId}'`
            )
            const wcPitches = playerWildCardPitches?.data?.sport_pitching_tm?.queryResults?.row
            wcPitches ? wcPitches['post_season'] = 'Wild Card' : null
            const playerChampionshipPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='L'&season='${year}'&player_id='${playerId}'`
            )
            const cPitches = playerChampionshipPitches?.data?.sport_pitching_tm?.queryResults?.row
            cPitches ? cPitches['post_season'] = 'League Championship' :  null
            const ret = []
            dPitches && Object.keys(dPitches).length > 1 && ret.push(dPitches)
            wcPitches && Object.keys(wcPitches).length > 1 && ret.push(wcPitches)
            cPitches && Object.keys(cPitches).length > 1 && ret.push(cPitches)
            return ret
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerWorldSeriesPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='W'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerPitches?.data?.sport_pitching_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerSpringTrainingPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='S'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerPitches?.data?.sport_pitching_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerExibitionPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='E'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerPitches?.data?.sport_pitching_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
    getPlayerAllStarPitchingStats: async (playerId: String, year: String) => {
        try {
            const playerPitches: { data: { sport_pitching_tm: { queryResults: { row: any }}}} = await axios.get(
                `${process.env.MLB_API}/json/named.sport_pitching_tm.bam?league_list_id='mlb'&game_type='A'&season='${year}'&player_id='${playerId}'`
            )
            const row = playerPitches?.data?.sport_pitching_tm?.queryResults?.row
            return row
        } catch (err) {
            console.log(err.message)
            return 'error'
        }
    },
}

const college = {

}

export { mlb, college }