export const initialState = {
    user: null,
    playlist: [],
    playing: false,
    item: null,
    // Remove after finished developing ...    
    // token: 
    // 'BQBwRtryvhpPQdSPJ5KiGrjei7N8DNDCZu73k4yISKgV4snfIgKKtYejHNU7LPy6GqnPz-UFvDpH9iCQ4Ued_RuqLFG9fwFVljGEDrgBU-JHMik1CzE_2uV643TjAl5ul1O8po4G9zGt20WTaHLgvAupMaL2rpCeP2p7oXOnIx0p1UaKdZOJ',
}

const reducer = (state, action) => {
    console.log(action);

// Action --> type, [payload]

    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        case "SET_TOKEN":
             return{
                ...state,
                token: action.token
            }
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            }
        default:
            return state;
    }
}

export default reducer;