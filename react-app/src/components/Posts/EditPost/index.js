import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOnePost } from "../../../store/post";
import { useModal } from "../../../context/Modal";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./EditPost.css"

export default function EditPost({ post }) {
    const postId = post?.id
    const history = useHistory()
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    // const postId = post?.id
    const currentUser = useSelector(state => state?.session?.user)
    const currentUserId = currentUser.id
    const [content, setContent] = useState(post?.content)
    const [title, setTitle] = useState(post?.title)
    const [image_url, setImageUrl] = useState(post?.image_url)
    const [post_type, setPostType] = useState(post?.post_type)
    const onSubmit = async (e) => {
        e.preventDefault()
        const updatePost = {
            post_type: 'Text',
            title: title,
            content: content
        }
        const updatedPost = dispatch(updateOnePost(updatePost, postId))
        if (updatedPost) {
            closeModal()
        }


    }


    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    return (
        <>
            <div className="update-post-nav">
                <form onSubmit={onSubmit}>
                    <div className="update-post-username-gear">
                        <span className="update-post-username">{currentUser?.username}</span><i className="fa fa-gear"></i>
                    </div>
                    <input
                        className="update-post-title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <div>
                        <textarea
                            className="update-post-textarea"
                            rows="8"
                            cols="60"
                            placeholder={post?.content}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <br></br>
                    </div>
                    <div className="update-post-icons">
                        <span className="fa fa-image"></span>
                        <span className="fa fa-gif"></span>
                        <span className="fa fa-link"></span>
                        <span className="fa fa-headphones"></span>
                        <span className="fa fa-video"></span>
                        <span className="fa fa-square-poll-vertical"></span>
                    </div>
                    <span className="update-post-hashtag">
                        You can remove the title but if you try to remove content below 3 characters we will discard your changes.
                    </span>
                    {/* <input
                        className="update-post-hashtag"
                        type="text"
                        placeholder="You can remove the title but if you try to remove content below 3 characters we will discard your changes."
                    /> */}
                    <li>
                        <button type="submit" className="update-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                    </li>
                </form>
                <ul className="update-post-close-for-everyone-post-now-button">
                    <span>
                        <button onClick={handleCancel} className="update-post-close-button">Close</button>
                    </span>
                    <span className="update-post-for-everyone-post-now-button">
                        <li>
                            <a>
                                <button className="update-post-for-everyone-button"><span>For Everyone </span><span className="fa fa-angle-down"></span></button>
                            </a>
                        </li>
                        {/* <div>
                        <li>
                            <button onSubmit={onSubmit} className="update-post-post-now-button" ><span>Post now |</span><span className="fa fa-angle-down"></span></button>
                            <ul className="update-post-dropdown">
                                <li><a>1</a></li>
                                <li><a>2</a></li>
                                <li><a>3</a></li>
                                <li><a>4</a></li>
                            </ul>
                        </li>
                        </div> */}
                    </span>
                </ul>

                {/* </form> */}
            </div>
        </>
    )
}
