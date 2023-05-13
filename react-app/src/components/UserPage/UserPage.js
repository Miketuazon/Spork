import OpenModalButton from "../OpenModalButton"
import React, { useState, useRef } from "react";
import DeletePost from "../Posts/DeletePost";
import { useSelector } from "react-redux"
import EditPost from "../Posts/EditPost"
import CreateComment from "../comments/CreateComment";
import DeleteComment from "../comments/DeleteComment"
import EditComment from "../comments/EditComment"
import { getCommentsForPost } from "../../store/comment";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllPosts, getCurrentUserPosts } from "../../store/post";
import { useCallback } from "react";
import FollowOrUnfollow from "../Follows/FollowOrUnfollow";
import { getFollowsForUser } from "../../store/follow";


// const UserPage = ({ post }) => {
//     const [showMenu, setShowMenu] = useState(false);
//     const ulRef = useRef();
//     const openMenuButtonRef = useRef(null)
//     const postsVal = Object.values(post)
//     const postId = postsVal?.id
//     const dispatch = useDispatch();
//     const comments = useSelector(state => state?.comments)
//     const commentsVal = Object.values(comments)
//     const commentId = comments?.id
//     const menuButtonRef = useRef(null)
//     const currentUser = useSelector(state => state?.session?.user)

//     const postComments = post?.comments
//     const follower = Object.values(post.owner.followers).find(id => id === currentUser.id)
//     const dropdown = useRef()
//     // console.log('follower', follower)
//     const handleClick = () => {
//         dropdown.current.classList.toggle('dropdown-open')
//         document.activeElement.blur();
//     }
//     const onSubmitFollow = async (e) => {
//         e.preventDefault()
//         dispatch(getFollowsForUser(post?.userId))
//         dispatch(getAllPosts())
//         // window.location.reload(false);
//     }
//     const openMenu = () => {
//         if (showMenu) return;
//         setShowMenu(true);
//     };

//     useEffect(() => {

//         // dispatch(getCommentsForPost(postId))
//         if (!showMenu) return;

//         const closeMenu = (e) => {
//             if (!ulRef.current.contains(e.target)) {
//                 setShowMenu(false);
//             }
//         };

//         document.addEventListener('click', closeMenu);

//         return () => document.removeEventListener("click", closeMenu);
//     }, [dispatch, showMenu,], Object.values(post.owner.followers));


//     const ulClassNameUpdateDelete = "list-for-update-delete" + (showMenu ? "" : " hidden");


//     return (
//         <div>
//             <div className="post-header">
//                 <img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />
//                 <span className="username">{post?.owner?.username}</span>
//                 <span className="timestamp">{post?.createdAt}</span>
//                 {/* {follower ? <span>Unfollow</span> : <span>Follow</span>} */}
//                 {follower && (currentUser.id !== post.userId) ? <button onClick={onSubmitFollow}>unfollow</button> : !follower && (currentUser?.id !== post?.userId) ? <button onClick={onSubmitFollow}>Follow</button> : <></>}
//             </div>
//             <div className="post-content">
//                 {post?.content}
//             </div>
//             <div className="post-footer">
//                 <button className="like-button">{post?.notes} notes</button>
//                 <button className="like-button"><i class="fa fa-heart"></i></button>
//                 <button className="reblog-button"><i class="fa fa-retweet"></i></button>
//                 {currentUser?.id === post?.userId ? (
//                     <div className="comments-trash-and-update-button">
//                         <OpenModalButton
//                             buttonText={<><i className="fas fa-trash-alt"></i></>}
//                             modalComponent={<DeletePost postId={post?.id} />}
//                         />
//                         <OpenModalButton
//                             buttonText={<><i className="fa fa-pen-square"></i></>}
//                             modalComponent={<EditPost postId={post?.id} post={post} />}
//                         />
//                     </div>
//                 ) : (
//                     <></>
//                 )}


//             </div>
//             {/* <button  type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button> */}
//             {/* <OpenModalButton className="text-area-for-comments" rows={1} cols={60}
//                     placeholder=" Add to the discussion"
//                     buttonText={<><i className="fas fa-comment-dots"></i></>}
//                     modalComponent={<CreateComment postId={post?.id} />}
//                 /> */}

//             {/* <ul className="comment-list"> */}
//             <div className="dropdown m-10">

//                 <button type='click' onClick={openMenu}>{<><i className="fas fa-comment-dots"></i></>}</button>
//                 <ul className={ulClassNameUpdateDelete} ref={ulRef}>

//                     <CreateComment postId={post?.id} />
//                     {post?.comments?.length ?

//                         post?.comments.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {
//                             return (
//                                 <div className="list-for-update-delete">
//                                     <li>
//                                         <div className="comment-text-bubble">

//                                             <div className="the-comments-commented">{comment?.content}<div class="dropdown-container">
//                                                 <button buttonText={<><i className="fas fa-trash-alt"></i></>} class="dropbtn-update-delete">
//                                                     <i class="fa fa-ellipsis-h"></i></button>
//                                                 <div class="dropdown-update-delete-content">
//                                                     <div className="comment-options">
//                                                         <OpenModalButton
//                                                             className="delete-button-page"
//                                                             buttonText="Delete"
//                                                             modalComponent={
//                                                                 <DeleteComment
//                                                                     postId={post?.id}
//                                                                     commentId={comment?.id}
//                                                                 />
//                                                             }
//                                                         />
//                                                         <OpenModalButton
//                                                             buttonText="Update"
//                                                             modalComponent={
//                                                                 <EditComment
//                                                                     postId={post?.id}
//                                                                     comment={comment}
//                                                                 />
//                                                             }
//                                                         />
//                                                     </div>

//                                                 </div>

//                                             </div>
//                                             </div>
//                                         </div>

//                                     </li>

//                                 </div>



//                             )
//                         }) : null

//                     }
//                 </ul>
//             </div>
//         </div >
//     )
// }

// export default UserPage
