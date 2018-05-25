const showToolbarLabels = localStorage.CMNTY_SHOW_TOOLBAR_LABELS === undefined ? true : localStorage.CMNTY_SHOW_TOOLBAR_LABELS === 'true' ? true : false;
const defaultLoggedUserObj = {
    post: {}
};

export default function reducer(state = {
    showToolbarLabels,
    editMode: false,
    loggedUser: defaultLoggedUserObj
}, action){
    switch(action.type){
        case "SET_USER_PERMISSIONS":
            state = { ...state, post: action.payload.post};
            break;
    }
    return state;
}