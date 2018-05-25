import { AuthService } from "../services/auth";
import { PermissionsService } from "../services/permisions";
import { setUserPermissions } from "../actions/permissions";

export function setViewMode(mode){
    return function(dispatch){
        dispatch({type: 'SET_VIEW_MODE', payload: mode});
    }
}

export function signOut(){
    return function(dispatch){
        AuthService.signOut();
        dispatch({type: 'CLEAR_LOGGED_USER'});

    }
}

export function getLoggedUserInfo(){
    return function(dispatch){
        AuthService.getLoggedUserInfo()
            .done(function(userInfo){
                dispatch({type: 'FETCH_LOGGED_USER_INFO', payload: {
                    avatar: userInfo.avatar + '?s=300',
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    email: userInfo.email,
                    slug: userInfo.slug,
                    likes: userInfo.likes,
                    lastLogged: userInfo.updated,
                    id: userInfo._id
                }});
                PermissionsService.user(userInfo._id)
                    .done(function(userPermissions){
                        dispatch(setUserPermissions( userPermissions.community, userPermissions.post ));
                    })
            }.bind(this))
    }
}

export function updateLoggedUserInfoSlug(slug){
    return function(dispatch){
        dispatch({type: 'UPDATE_LOGGED_USER_INFO_SLUG', payload: slug});
    }
}

export function toggleEditMode(){
    return function(dispatch){
        // dispatch({type: 'TOGGLE_TOOLBAR_LABELS', payload: status});
        dispatch({type: 'TOGGLE_EDIT_MODE'});
    }
}

// export function getOauthToken(host, username, password){
//     return function(dispatch){
//         dispatch({type: 'GET_OAUTH_TOKEN', payload: {
//             host, username, password
//         }});
//     }
// }