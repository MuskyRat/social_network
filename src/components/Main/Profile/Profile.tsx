import React from "react";
import style from './Profile.module.css';
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {selectPosts, selectProfile, selectStatus} from "../../../redux/profile-selectors";
import {selectUserId} from "../../../redux/auth-selectors";
import {ProfileType} from "../../../types/types";
import {actions, getProfile, getStatus, updatePhoto, updateProfile, updateStatus} from "../../../redux/profile-reducer";
import {compose} from "redux";
import {RouteComponentProps, withRouter} from "react-router-dom";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";
import Preloader from "../../../common/Preloader/Preloader";

class Profile extends React.Component<PropsType> {

    refreshProfile () {
        let userId: number = Number(this.props.match.params.userId);
        if(!userId) {
            if(this.props.authorizedUserId) {
                userId = this.props.authorizedUserId;
            }
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        if(!userId) {
            console.error('UserId must exist in URI params or in authorizedUserId')
        } else {
            this.props.getStatus(userId);
            this.props.getProfile(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    };

    componentDidUpdate(prevProps: Readonly<PropsType>) {
        if(prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }

    render () {

        if(!this.props.profile) return <Preloader />

        return (
            <div className={style.wrapper}>
                <ProfileInfo profile={this.props.profile}
                             status={this.props.status}
                             updateStatus={this.props.updateStatus}
                             updateProfile={this.props.updateProfile}
                             updatePhoto={this.props.updatePhoto}
                             isOwner={!this.props.match.params.userId}
                />
                <MyPosts posts={this.props.posts} addPost={this.props.addPost} deletePost={this.props.deletePost} />
            </div>
        )
    }

}

const mapStateToProps = (state: AppStateType) => ({
    posts: selectPosts(state), //MyPosts
    profile: selectProfile(state), //ProfileInfo
    status: selectStatus(state), //ProfileInfo
    authorizedUserId: selectUserId(state) //Profile
})

type StatePropsType = ReturnType<typeof mapStateToProps>;

type DispatchPropsType = {
    getStatus: (userId: number) => void, //Profile
    updateStatus: (status: string) => void, //ProfileInfo
    getProfile: (userId: number) => void, //Profile
    updateProfile: (profile: ProfileType) => void, //ProfileInfo
    updatePhoto: (file: File) => void, //ProfileInfo
    addPost: (newPostText: string) => void, //MyPosts
    deletePost: (postId: number) => void //MyPosts
}

type ParamsType = {
    userId: string
}

type PropsType = StatePropsType & DispatchPropsType & RouteComponentProps<ParamsType>;

export default compose<React.ComponentType>(
    connect<StatePropsType, DispatchPropsType, RouteComponentProps<ParamsType>, AppStateType>(mapStateToProps,
        {getStatus, updateStatus, getProfile, updateProfile, updatePhoto, addPost: actions.addPost, deletePost: actions.deletePost}),
    withRouter
)(Profile);
