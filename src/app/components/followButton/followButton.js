import React from "react";
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { CommunitiesService } from "../../services/communities";
import { AuthService } from "../../services/auth";

@connect((store) => {
    return {
        communityId: store.home.communityInfo && store.home.communityInfo._id,
        loggedUserId: store.app.loggedUser && store.app.loggedUser.id,
        communityInfoLikes: store.home.communityInfo && store.home.communityInfo.likes || [],
        postLikes: store.home.post && store.home.post.likes || [],
        showCommunityFollow: function(){
            const ownerId = store.home.communityInfo && store.home.communityInfo.owner && store.home.communityInfo.owner._id;
            const loggedUserId = store.app.loggedUser && store.app.loggedUser.id;
            return ownerId !== loggedUserId;
        },
        activeCommunityFollow: function(){
            const followers = store.home.communityInfo && store.home.communityInfo.followers || [];
            return followers.filter((f)=>{return f._id === this.loggedUserId}).length > 0;
        },
    };
})

export class FollowButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            type: props.type,
            activeCommunityFollow: props.activeCommunityFollow(),
            showCommunityFollow: props.showCommunityFollow()
        };
    }

    toggleFollow(){
        const { communityId } = this.props;
        const { activeCommunityFollow, type} = this.state;

        switch(type){
            case "community":
                this.setState({
                    activeCommunityFollow: !activeCommunityFollow
                });
                CommunitiesService.toggleFollow(communityId);
                break;
        }
    }

    componentWillReceiveProps(props){
        this.setState({
            activeCommunityFollow: props.activeCommunityFollow(),
            showCommunityFollow: props.showCommunityFollow(),
        });
    }

    render() {
        const { showCommunityFollow, activeCommunityFollow } = this.state;

        if ( !showCommunityFollow || !AuthService.isUserLogged()) {
            return null;
        }

        return (
            <Button
                active
                className="component-follow-button"
                icon={'eye'}
                color={activeCommunityFollow ? 'red' : 'grey'}
                onClick={this.toggleFollow.bind(this)}
            />
        );
    }
}