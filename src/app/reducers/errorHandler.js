export default function reducer(state = {
    message: '',
    type: '',
    visible: false
}, action){
    switch(action.type){
        case "SHOW_SYSTEM_MESSAGE":
            state = {
                ...state,
                message: action.payload.message,
                type:  action.payload.type,
                visible: true
            };
            break;
        case "HIDE_SYSTEM_MESSAGE":
            state = {
                ...state,
                message: '',
                type: '',
                visible: false
            };
            break;
    }
    return state;
}