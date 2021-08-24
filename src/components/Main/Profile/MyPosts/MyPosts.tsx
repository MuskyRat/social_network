import React from "react";
import style from './MyPosts.module.css';
import {PostType} from "../../../../types/types";
import MyPostsForm from "./MyPostsForm";
import Post from "./Post";

type PropsType = {
    posts: PostType[],
    addPost: (newPostText: string) => void,
    deletePost: (postId: number) => void
}

const MyPosts: React.FC<PropsType> = ({posts, addPost, deletePost}) => {


    return (
        <div className={style.wrapper}>
            <div className={style.h3}><h2>My posts</h2></div>
            <MyPostsForm addPost={addPost} />
            <div className={style.posts}>
                {posts.map((p) => <Post key={p.id} post={p} deletePost={deletePost} />).reverse()}
            </div>
        </div>
    )

};

export default MyPosts;