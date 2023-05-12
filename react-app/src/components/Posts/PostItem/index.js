import "./PostItem.css"
import OpenModalButton from "../../OpenModalButton"
import React, { useState, useRef } from "react";
import DeletePost from "../DeletePost"
import { useSelector } from "react-redux"
import EditPost from "../EditPost"
import CreateComment from "../../comments/CreateComment"
import DeleteComment from "../../comments/DeleteComment"
import EditComment from "../../comments/EditComment"
import { getCommentsForPost } from '../../../store/comment'
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllPosts, getCurrentUserPosts } from "../../../store/post";
import { useCallback } from "react";
import FollowOrUnfollow from "../../Follows";
import { getFollowsForUser } from "../../../store/follow";
import { useModal } from "../../../context/Modal";




const PostItem = ({ post }) => {
    const { closeModal } = useModal();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const openMenuButtonRef = useRef(null)
    const postsVal = Object.values(post)
    const postId = postsVal?.id
    const dispatch = useDispatch();
    const comments = useSelector(state => state?.comments)
    console.log('comments', comments)
    const commentsVal = Object.values(comments)
    const commentId = comments?.id
    const menuButtonRef = useRef(null)
    const currentUser = useSelector(state => state?.session?.user)
    const postFollowers = post?.owner?.followers
    const notes = Number(post?.comments?.length + post?.likes?.length)
    // const postFollowersVal = Object?.values(post?.owner?.followers)
    const postComments = post?.comments
    const follower = post?.owner?.followers?.find(id => id === currentUser?.id)
    // const createdAtVal = Object?.values(post?.createdAt)
    // const postDate = new Date(post?.createdAt)
    // const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day:'numeric', year: 'numeric' })?.format(postDate);
    // const follower = Object.values(post?.owner?.followers).find(id => id === currentUser?.id)
    const dropdown = useRef()
    // console.log('follower', follower)
    const handleClick = () => {
        dropdown.current.classList.toggle('dropdown-open')
        document.activeElement.blur();
    }



    const onSubmitFollow = async (e) => {
        e.preventDefault()

        const successFollow = dispatch(getFollowsForUser(post?.userId))
        if (successFollow) {
            dispatch(getAllPosts())
        }
        // window.location.reload(false);
    }
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {

        // dispatch(getCommentsForPost(postId))
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [dispatch, showMenu, JSON.stringify(postFollowers), JSON.stringify(postComments)]);


    const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (
        <div>
            <div className="post-header">
                <dov><img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />{post?.owner?.username}</dov>
                {/* <span className="username">{post?.owner?.username}</span> */}
                <div className="username-unfollow-follow">
                    {/* <span className="timestamp">{post?.createdAt}</span> */}
                    {/* {follower ? <span>Unfollow</span> : <span>Follow</span>} */}
                    {currentUser && follower && (currentUser?.id !== post?.userId) ? <button className="button-unfollow" onClick={onSubmitFollow}>unfollow</button> : currentUser && !follower && (currentUser?.id !== post?.userId) ? <button className="button-follow" onClick={onSubmitFollow}>Follow</button> : <></>}
                </div>
            </div>
            <h7 className="timestamp">{post?.createdAt}</h7>
            <h4 className="post-item-postTitle">{post?.title}</h4>
            <p className="post-content">
                {post?.content}
            </p>
            <div className="post-footer">
                <button onClick={openMenu} className="like-button">{notes === 1 ? <div><span>{notes} </span><span>note</span></div> : <div><span>{notes} </span><span>notes</span></div>}</button>
                <button className="like-button"><i class="fa fa-heart"></i></button>
                <button className="reblog-button"><i class="fa fa-retweet"></i></button>
               {/* {currentUser?.id === post?.userId ?
                <button></button>:<></>

                } */}
                {currentUser?.id === post?.userId ? (
                    <div className="comments-trash-and-update-button">
                        <OpenModalButton
                            buttonText={<><i className="fas fa-trash-alt"></i></>}
                            modalComponent={<DeletePost postId={post?.id} />}
                        />
                        {/* <DeletePost postId={postId}/> */}
                        <OpenModalButton
                            buttonText={<><i className="fa fa-pen-square"></i></>}
                            modalComponent={<EditPost postId={post?.id} post={post} />}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button>

            </div>
            {/* <button  type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button> */}
            {/* <OpenModalButton className="text-area-for-comments" rows={1} cols={60}
                    placeholder=" Add to the discussion"
                    buttonText={<><i className="fas fa-comment-dots"></i></>}
                    modalComponent={<CreateComment postId={post?.id} />}
                /> */}

            {/* <ul className="comment-list"> */}
            <div className="dropdown m-10">

                {/* <button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button> */}
                <ul className={ulClassNameUpdateDelete} ref={ulRef}>
                    {currentUser ?
                        <CreateComment postId={post?.id} /> : <></>}
                    {post?.comments?.length ?

                        post?.comments?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {

                            return (
                                <div className="list-for-update-delete">


                                        <div className="trash-comment">
                                        <div className="comment-text-bubble">
                                            <div className="the-comments-commented">
                                                <span>{comment?.content}</span>
                                            </div>
                                        </div>
                                        <span>{currentUser?.id === comment?.userId ? <DeleteComment commentId={comment?.id}><i className="fas fa-trash-alt"></i></DeleteComment> : <></>}</span>
                                        </div>



                                </div>



                            )
                        }) : null

                    }
                </ul>
            </div>
        </div >
    )
}

export default PostItem
