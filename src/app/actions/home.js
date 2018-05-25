import { PhotoService } from "../services/photo";

export function getPhotoBySlug(photoSlug){
    return function(dispatch){
        PhotoService.getPhotoBySlug(photoSlug)
            .done(function (postData) {
                dispatch({type: 'FETCH_POST_DATA', payload: postData});
            }.bind(this));
    }
}