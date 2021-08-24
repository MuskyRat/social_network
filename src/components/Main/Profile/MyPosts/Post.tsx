import React from "react";
import style from './Post.module.css';
import {PostType} from "../../../../types/types";
import userPhoto from '../../../../assets/userPhoto.png';

type PropsType = {
    post: PostType,
    deletePost: (postId: number) => void
}

const Post: React.FC<PropsType> = ({post, deletePost}) => {


    const onPostDelete = () => {
        deletePost(post.id);
    };

    return (
        <div className={style.wrapper}>
            <div className={style.img}>
                <img src={userPhoto} alt=""/>
            </div>
            <div className={style.body}>
                <div className={style.text}>
                    <span>{post.message}</span>
                </div>
                <div className={style.likes}>
                    <span>likesCount: {post.likesCount}</span><button onClick={onPostDelete} >Delete</button>
                </div>
            </div>
        </div>
    )

};

export default Post;