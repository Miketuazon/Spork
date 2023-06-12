import "./PostItem.css"
import OpenModalButton from "../../OpenModalButton"
import React, { useState, useRef } from "react";
import DeletePost from "../DeletePost"
import { useSelector } from "react-redux"
import EditPost from "../EditPost"
import CreateComment from "../../comments/CreateComment"
import DeleteComment from "../../comments/DeleteComment"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllPosts, getCurrentUserPosts } from "../../../store/post";
import { useCallback } from "react";
import FollowOrUnfollow from "../../Follows/FollowOrUnfollow";
import { getFollowsForUser } from "../../../store/follow";
import { likeOnePost } from "../../../store/like";
import EditComment from "../../comments/EditComment";


const PostItem = ({ post }) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.session?.user)
    const currentFollowing = currentUser?.following
    const postFollowers = post?.owner?.followers
    const postsVal = Object.values(post)
    const comments = useSelector(state => state?.comments)
    const notes = (post?.comments?.length + post?.likes?.length)
    const postComments = post?.comments
    const postLikes = post?.likes


    const follower = post?.owner?.followers?.find(id => id === currentUser?.id)
    const liked = post?.likes?.find(id => id === currentUser?.id)

    // creating date
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }

    const date = new Date(post?.createdAt)
    const month = months[date?.getMonth()];
    const day = date?.getDate();
    const year = date?.getFullYear();
    const hoursMin = date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', });


    const onSubmitFollow = async (e) => {
        e.preventDefault()

        dispatch(getFollowsForUser(post?.userId))
        dispatch(getAllPosts())

    }
    const onSubmitLike = async (e) => {
        e.preventDefault()

        dispatch(likeOnePost(post?.id))
        dispatch(getAllPosts())

    }
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef?.current?.contains(e?.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dispatch, showMenu, JSON.stringify(postComments), JSON.stringify(postLikes), JSON.stringify(currentUser), JSON.stringify(liked), JSON.stringify(follower)]);


    const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (
        <div>
            <div className="post-header">
                <div><img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />{post?.owner?.username}</div>
                <div className="username-unfollow-follow">
                    {currentUser && follower && (currentUser?.id !== post?.userId) ? <button className="button-unfollow" onClick={onSubmitFollow}>unfollow</button> : currentUser && !follower && (currentUser?.id !== post?.userId) ? <button className="button-follow" onClick={onSubmitFollow}>Follow</button> : <></>}
                </div>
            </div>
            <h6 className="timestamp">{month}, {day}, {year} | {hoursMin}</h6>
            <h4 className="post-item-postTitle">{post?.title}</h4>
            <p className="post-content">
                {post?.content}
            </p>
            <div className="post-footer">
                <button onClick={openMenu} className="like-button">{notes === 1 ? <div><span>{notes} </span><span>note</span></div> : <div><span>{notes} </span><span>notes</span></div>}</button>
                {currentUser && !liked && (currentUser?.id !== post?.userId) ? <button className="like-button" onClick={onSubmitLike}><i className="far fa-heart"></i></button> : currentUser && liked && (currentUser?.id !== post?.userId) ? <button className="unlike-button" onClick={onSubmitLike}><i className="fas fa-heart" ></i></button> : <></>}
                {/* {currentUser?.id === post?.userId ? (<><OpenModalButton
                    buttonText={<><i className="fa fa-pen-square"></i></>}
                    modalComponent={<EditPost postId={post?.id} post={post} />}
                />{<DeletePost posttId={post?.id}><i className="fas fa-trash-alt"></i></DeletePost>}</> ):(<></>)} */}

                {currentUser?.id === post?.userId ? (
                    <div className="comments-trash-and-update-button">
                        <OpenModalButton
                            buttonText={<><i className="fas fa-trash-alt"></i></>}
                            modalComponent={<DeletePost postId={post?.id} />}
                        />

                        <OpenModalButton
                            buttonText={<><i className="fa fa-pencil"></i></>}
                            modalComponent={<EditPost postId={post?.id} post={post} />}
                        />
                    </div>
                ) : (
                    <></>
                )}

                <span></span><span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>

            </div>
            <div className="dropdown m-10">
                <ul className={ulClassNameUpdateDelete} ref={ulRef}>
                    {currentUser ?
                        <CreateComment postId={post?.id} /> : <></>}
                    {post?.comments?.length ?

                        post?.comments?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {

                            return (
                                <li key={comment.id}>
                                    <div className="list-for-update-delete">
                                        <div className="trash-comment">
                                            <div className="comment-text-bubble">
                                                <span className="comment-owner">{comment.owner.username}</span>
                                                <div className="the-comments-commented">

                                                    <span>{comment?.content}</span>
                                                </div>
                                            </div>
                                            <span className="delete-comment-icon" style={{"marginRight": "5px"}}>{currentUser?.id === comment?.userId ? <DeleteComment commentId={comment?.id}><i className="fas fa-trash-alt"></i></DeleteComment> : <></>}</span>
                                            <span>{currentUser?.id === comment?.userId ? <OpenModalButton
                                                buttonText={<><i className="fas fa-pen-square edit-comment"></i></>}
                                                modalComponent={<EditComment commentId={comment?.id} comment={comment} />}
                                            /> : <></>}</span>

                                        </div>
                                    </div>
                                </li>
                            )
                        }) : null
                    }
                </ul>
            </div>
        </div >
    )
}

export default PostItem
