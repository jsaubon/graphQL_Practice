export default function reducer(state, action) {
    switch (action.type) {
        case "SAVE_LEADS":
            return {
                ...state,
                leads: action.payload
            };
        default:
            return state;
    }
}
