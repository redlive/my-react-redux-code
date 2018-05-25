import { AuthService } from './auth';
import $ from 'jquery'

export class PermissionsClass {

    constructor() {
        this.constants = require('../meta/constants.json');
        this.NODE_ENV = `${process.env.NODE_ENV}`;
        this.apiHost = this.NODE_ENV !== "undefined" ? this.constants.apiHost[this.NODE_ENV] : this.constants.apiHost.development;
    }

    user(id){
        return $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/user/' + id + '/permissions'),
            contentType: 'application/json',
            dataType: 'json'
        });
    }


    community(userId, communityId){
        return $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/user/' + userId + '/permissions?community=' + communityId),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    post(postId){
        return $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/permissions?post=' + postId),
            contentType: 'application/json',
            dataType: 'json'
        });
    }
}

export let PermissionsService = new PermissionsClass();