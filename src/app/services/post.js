import { AuthService } from './auth';
import $ from 'jquery'

export class PostServiceClass {

    constructor() {
        this.constants = require('../meta/constants.json');
        this.NODE_ENV = `${process.env.NODE_ENV}`;
        this.apiHost = this.NODE_ENV !== "undefined" ? this.constants.apiHost[this.NODE_ENV] : this.constants.apiHost.development;
    }

    getAllPostsList(pagerId){
        return $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/post?pageId=' + pagerId),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    getStatistics(){
        return $.ajax({
            type: 'GET',
            url: encodeURI(this.apiHost + "/api/post/statistics"),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    deletePost(id){
        return $.ajax({
            type: 'DELETE',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/post/' + id),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    updatePost(id, communityId, categoryId){
        return $.ajax({
            type: 'POST',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/post/' + id),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                community: communityId,
                categoryId
            })
        });
    }

    getCommentsList(postId){
        return $.ajax({
            type: 'GET',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/post/' + postId + '/comments'),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    addComment(postId, body){
        return $.ajax({
            type: 'POST',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/post/' + postId + '/comments'),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                body
            })
        });
    }

    deleteComment(commentId){
        return $.ajax({
            type: 'POST',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/comments/' + commentId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                deleted: true
            })
        });
    }

    editComment(commentId, body){
        return $.ajax({
            type: 'POST',
            beforeSend: function(xhr) {
                AuthService.getAuthJWTHeader(xhr);
            }.bind(this),
            url: encodeURI(this.apiHost + '/api/comments/' + commentId),
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                body
            })
        });
    }
}

export let PostService = new PostServiceClass();