import "./Test.css"
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllPosts } from "../../store/post";
import { getFollowsForUser } from "../../store/follow";
import { likeOnePost } from "../../store/like";


const Test = ({ post }) => {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.session?.user)
    const currentUserLikes = currentUser?.likes
    const notes = Number(post?.comments?.length + post?.likes?.length)
    const postLikes = post?.likes

    const likes = post?.likes?.find(id => id === currentUser?.id)
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
    }, [dispatch, showMenu, JSON.stringify(post), JSON.stringify(postLikes), JSON.stringify(notes), JSON.stringify(currentUserLikes), JSON.stringify(currentUser), JSON.stringify(liked), JSON.stringify(follower)]);


    const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


    return (
        <>
            {likes ?
                <div>

                    <div className="post-header-2">
                        <div><img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />{post?.owner?.username}</div>
                        <div className="username-unfollow-follow">
                            {currentUser && follower && (currentUser?.id !== post?.userId) ? <button className="button-unfollow" onClick={onSubmitFollow}>unfollow</button> : currentUser && !follower && (currentUser?.id !== post?.userId) ? <button className="button-follow" onClick={onSubmitFollow}>Follow</button> : <></>}
                        </div>
                    </div>
                    <h6 className="timestamp-2">{month}, {day}, {year} | {hoursMin}</h6>
                    <h4 className="post-item-postTitle-2">{post?.title}</h4>
                    <p className="post-content-2">
                        {post?.content}
                    </p>
                    <div className="post-footer-2">
                        <button onClick={openMenu} className="like-button">{notes === 1 ? <div><span>{notes} </span><span>note</span></div> : <div><span>{notes} </span><span>notes</span></div>}</button>
                        {currentUser && !liked && (currentUser?.id !== post?.userId) ? <button className="like-button" onClick={onSubmitLike}><i className="far fa-heart"></i></button> : currentUser && liked && (currentUser?.id !== post?.userId) ? <button className="unlike-button" onClick={onSubmitLike}><i className="fas fa-heart" ></i></button> : <></>}

                        <span></span><span><button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button></span>

                    </div>
                    <div className="dropdown m-10">
                        <ul className={ulClassNameUpdateDelete} ref={ulRef}>

                            {post?.comments?.length ?

                                post?.comments?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {

                                    return (
                                        <li key={comment?.id}>
                                            <div className="list-for-update-delete">
                                                <div className="trash-comment">
                                                    <div className="comment-text-bubble">
                                                        <span className="comment-owner">{comment?.owner?.username}</span>
                                                        <div className="the-comments-commented">

                                                            <span>{comment?.content}</span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                    )
                                }) : <></>
                            }
                        </ul>
                    </div>

                </div> : <></>

            }
        </>
    )
}

export default Test
