import "./commentsList.scss";
import React from "react";
import { NavLink } from 'react-router-dom';
import { Button, Comment, Header, Form, Segment, Divider, Message, Popup, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { PostService } from "../../services/post";
import { AuthService } from "../../services/auth";
import { LocalizeService } from "../../services/localize";

@connect((store) => {
    return {
        postId: store.home.post && store.home.post._id,
        loggedUser: store.app.loggedUser
    };
})

export class CommentsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            comments: [],
            editComments: {},
            commentBody: '',
            loading: true,
            edit: false
        };
        this.constants = require("../../meta/constants.json");
    }

    componentWillReceiveProps(props){
        if (props.postId) {
            PostService
                .getCommentsList(props.postId)
                .done(function(comments){

                    const editComments = {};
                    comments.forEach((comment)=>{
                        editComments[comment._id] = comment.body;
                    });

                    this.setState({
                        comments,
                        editComments,
                        loading: false
                    });
                }.bind(this))
            ;
        }
    }

    drawComments(){
        return this.state.comments.map(function(comment){
            return this.drawSingleComment(comment);
        }.bind(this));
    }

    drawSingleComment(comment){
        const { loggedUser } = this.props;
        const userCommentsLink = LocalizeService.formatPath(this.constants.router.path.member.communities, {memberSlug: comment.author.slug});

        return <Comment key={'single-comment-' + comment._id}>
            <Comment.Avatar src={comment.author.avatar} />
            <Comment.Content>
                <Comment.Author><NavLink to={userCommentsLink}>{comment.author.firstName + ' ' + comment.author.lastName}</NavLink></Comment.Author>
                <Comment.Metadata>
                    {LocalizeService.formatTimestampFromNow(comment.created_at)}
                </Comment.Metadata>
                {
                    !comment.editMode && <Comment.Text>{comment.body}</Comment.Text>
                }
                {
                    comment.editMode &&
                    <Comment.Text>
                        <Divider/>
                        <Form>
                            <TextArea onChange={this.onEditTextAreaChanged.bind(this, comment._id)}  placeholder='Tell us something' value={this.state.editComments[comment._id]} />
                            <Divider/>
                            <Button disabled={!this.state.editComments[comment._id].length} onClick={this.editComment.bind(this, comment._id)} color={'green'}>Save</Button>
                            <Button onClick={this.toggleEditMode.bind(this, comment._id)}>Cancel</Button>
                        </Form>
                    </Comment.Text>
                }

                {
                    !comment.editMode &&
                    <Comment.Actions>
                        {
                            (loggedUser.id === comment.author._id && !comment.deleted) &&
                            <Comment.Action onClick={this.toggleEditMode.bind(this, comment._id)}>Edit</Comment.Action>
                        }
                        {
                            loggedUser.id === comment.author._id && !comment.deleted ?
                                <Popup
                                    trigger={<Comment.Action>Delete</Comment.Action>}
                                    content={<Button color='green' onClick={this.deleteComment.bind(this, comment._id)} content='Confirm'/>}
                                    on='click'
                                    position='right center'
                                /> : null
                        }

                    </Comment.Actions>
                }
            </Comment.Content>
        </Comment>
    }

    onTextAreaChanged(e, {value}){
        this.setState({
            commentBody: value
        });
    }

    addComment(){
        const { commentBody, comments } = this.state;
        const { postId, loggedUser } = this.props;
        PostService
            .addComment(postId, commentBody)
            .done(function(comment){
                const author = {...loggedUser,...{_id: loggedUser.id}};
                comments.push({...comment, author});
                this.setState({
                    comments,
                    commentBody: ''
                });
            }.bind(this));
    }

    deleteComment(commentId){
        PostService
            .deleteComment(commentId)
            .done(function(){
                this.setState({
                    comments: this.state.comments.filter(function(comment){
                        return comment._id !== commentId;
                    })
                });
            }.bind(this));
    }

    toggleEditMode(commentId){
        const comments = [...this.state.comments];

        this.setState({
            comments: comments.map((comment)=>{
                if (commentId === comment._id) {
                    comment.editMode = !Boolean(comment.editMode);
                }
                return comment;
            })
        });
    }

    onEditTextAreaChanged(commentId, e, {value}){
        const editComments = {...this.state.editComments};
        editComments[commentId] = value;
        this.setState({
            editComments
        });
    }

    editComment(commentId){
        const newText = this.state.editComments[commentId] || null;
        if (newText.length) {
            PostService
                .editComment(commentId, newText)
                .done(function(){
                    this.setState({
                        comments: this.state.comments.map(function(comment){
                            if (commentId === comment._id) {
                                comment.body = newText;
                            }
                            return comment;
                        })
                    });
                    this.toggleEditMode(commentId);
                }.bind(this));
        }
    }

    render() {
        return (
            <Segment loading={this.state.loading} basic className={'component-comments-list'}>
                <Comment.Group threaded>
                    <Header as='h3' dividing>Comments</Header>
                    {
                        !this.state.loading && !this.state.comments.length && <Message
                            content='The post has no comments.'
                        />
                    }
                    {
                        this.drawComments()
                    }
                    <Divider/>
                    {
                        AuthService.isUserLogged() && <Form reply onSubmit={this.addComment.bind(this)}>
                            <Form.TextArea onChange={this.onTextAreaChanged.bind(this)} value={this.state.commentBody} />
                            <Button content='Add Comment' labelPosition='left' icon='edit' primary />
                        </Form>
                    }
                    {
                        !AuthService.isUserLogged() &&
                        <Segment>
                            <Message
                                header='Not a member yet? :('
                                content='Sorry, but to leave a comment you need to be a member.'
                            />
                            <Divider />
                            <Button.Group size='large'>
                                <Button color={'blue'} as={NavLink} to={this.constants.router.path.auth.signIn}>Sign In</Button>
                                <Button.Or />
                                <Button color={'green'} as={NavLink} to={this.constants.router.path.auth.signUp}>Create an account</Button>
                            </Button.Group>
                        </Segment>
                    }
                </Comment.Group>
            </Segment>
        );
    }
}