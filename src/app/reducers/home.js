export default function reducer(state = {
    loading: true,
    communityInfo: {},
    community: {},
    communities: [],
    post: {},
    posts: [],
    fonts: [],
    error: null
}, action){
    switch(action.type){
        case "FETCH_POST_DATA":
            state = { ...state, post: action.payload };
            break;
        case "CLEAR_POST_DATA":
            state = { ...state, post: {} };
            break;
        case "FETCH_POSTS_LIST":
            state = { ...state, posts: [...state.posts,...action.payload], loading: false, error: false };
            break;
        case "CLEAR_POSTS_LIST":
            state = { ...state, posts: [], loading: false, error: false };
            break;
        case "APPEND_POST":
            state.posts.unshift(action.payload);
            state = { ...state, posts: [...state.posts], loading: false, error: false };
            break;
        case "EDIT_PHOTO_POST_DONE":
            state = { ...state, post:  state.post };
            break;
    }
    return state;
}