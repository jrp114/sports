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
    }
}

const college = {

}

export { mlb, college }