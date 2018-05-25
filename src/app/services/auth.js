import $ from 'jquery';

export class AuthServiceClass {

    constructor(){
        this.constants = require('../meta/constants.json');
        this.NODE_ENV = `${process.env.NODE_ENV}`;
        this.apiHost = this.NODE_ENV !== "undefined" ? this.constants.apiHost[this.NODE_ENV] : this.constants.apiHost.development;
    }

    getLoggedUserInfo(){
        return $.ajax({
            type: 'GET',
            url: encodeURI(this.apiHost + "/api/user"),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr){
                this.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    getLoggedUserAccessToken(){
       return this.getTokenValue('APP_LOGGED_USER_TOKEN');
    }

    getLoggedUserRefreshToken(){
       return this.getTokenValue('DDP_APP_REFRESH_TOKEN');
    }

    getTokenValue(tokenName) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(tokenName) === 0) {
                return c.substring(tokenName.length + 1, c.length);
            }
        }
        return "";
    }

    setTokens(accessToken, rememberMe){
        const d = new Date();
        d.setTime(d.getTime() + (this.constants.authorization.rememberMeDays * 24 * 60 * 60 * 1000));
        document.cookie = rememberMe ? "APP_LOGGED_USER_TOKEN=" + accessToken + ";expires=" + d.toUTCString() + ";path=/" : "APP_LOGGED_USER_TOKEN=" + accessToken + ";";
    }

    deleteToken(tokenName, token){
        document.cookie = tokenName + "=" + token + ";expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    }

    deleteAccessToken(){
        this.deleteToken("APP_LOGGED_USER_TOKEN", this.getLoggedUserAccessToken());
    }

    deleteRefreshToken(){
        this.deleteToken("DDP_APP_REFRESH_TOKEN", this.getLoggedUserRefreshToken());
    }

    isUserLogged(){
        return Boolean(this.getLoggedUserAccessToken().length);
    }

    signOut(){
        this.deleteAccessToken();
        this.deleteRefreshToken();
    }

    signUp(firstName, lastName, email, password, passwordValidate){
        return $.ajax({
            type: 'PUT',
            url: encodeURI(this.apiHost + '/api/user'),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                passwordValidate: passwordValidate
            })
        });
    }

    signIn(email, password){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + '/api/session'),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                email: email,
                password: password
            })
        });
    }

    getAuthJWTHeader(xhr){
        return xhr.setRequestHeader ("Authorization", "JWT " + this.getLoggedUserAccessToken());
    }
}

export let AuthService = new AuthServiceClass();