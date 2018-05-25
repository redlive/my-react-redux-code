const showToolbarLabels = localStorage.CMNTY_SHOW_TOOLBAR_LABELS === undefined ? true : localStorage.CMNTY_SHOW_TOOLBAR_LABELS === 'true' ? true : false;
const defaultLoggedUserObj = {
    avatar: '',
    firstName: '',
    lastName: '',
    slug: null,
    likes: [],
    lastLogged: null,
    id: null
};

export default function reducer(state = {
    showToolbarLabels,
    editMode: false,
    loggedUser: defaultLoggedUserObj
}, action){
    switch(action.type){
        case "FETCH_LOGGED_USER_INFO":
            state = { ...state, loggedUser: action.payload};
            break;
        case "UPDATE_LOGGED_USER_INFO_SLUG":
            state.loggedUser.slug = action.payload;
            state = { ...state, loggedUser: state.loggedUser};
            break;
        case "TOGGLE_EDIT_MODE":
            state = { ...state, editMode: !state.editMode};
            break;
        case "CLEAR_LOGGED_USER":
            state = { ...state, loggedUser: defaultLoggedUserObj};
            break;
    }
    return state;
}