import $ from 'jquery';
import { AuthService } from "./auth";

export class MemberServiceClass {

    constructor(){
        this.constants = require('../meta/constants.json');
        this.NODE_ENV = `${process.env.NODE_ENV}`;
        this.apiHost = this.NODE_ENV !== "undefined" ? this.constants.apiHost[this.NODE_ENV] : this.constants.apiHost.development;
    }

    getStatistics(){
        return $.ajax({
            type: 'GET',
            url: encodeURI(this.apiHost + "/api/user/statistics"),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    getInfo(slug){
        return $.ajax({
            type: 'GET',
            url: encodeURI(this.apiHost + "/api/user/" + slug),
            contentType: 'application/json',
            dataType: 'json',
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    updateGeneraInfo(userId, firstName, lastName){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + "/api/user/" + userId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                firstName,
                lastName
            }),
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    updatePassword(userId, newPassword){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + "/api/user/" + userId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                password: newPassword
            }),
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    updateSlug(userId, slug){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + "/api/user/" + userId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                slug
            }),
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    changeEmail(userId, email){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + "/api/user/" + userId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                email
            }),
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    checkSlug(slug){
        return $.ajax({
            type: 'GET',
            url: encodeURI(this.apiHost + "/api/user/slug/"),
            contentType: 'application/json',
            dataType: 'json',
            data: { slug },
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }

    resetPassword(email){
        return $.ajax({
            type: 'POST',
            url: encodeURI(this.apiHost + "/api/user/resetpassword"),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                email
            }),
            beforeSend: function(xhr){
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this)
        });
    }
}

export let MemberService = new MemberServiceClass();