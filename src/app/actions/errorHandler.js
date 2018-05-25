export function showSystemMessage( message, type ){
    return function(dispatch){
        dispatch({type: 'SHOW_SYSTEM_MESSAGE', payload: { type, message }});
        setTimeout(()=>{
            dispatch({type: 'HIDE_SYSTEM_MESSAGE'});
        }, 3000);
    }
}