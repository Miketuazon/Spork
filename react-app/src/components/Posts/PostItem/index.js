import "./PostItem.css"
import OpenModalButton from "../../OpenModalButton"
import DeletePost from "../DeletePost"
import { useSelector } from "react-redux"
import EditPost from "../EditPost"
import CreateComment from "../../comments/CreateComment"
import DeleteComment from "../../comments/DeleteComment"
import EditComment from "../../comments/EditComment"

const PostItem = ({ post }) => {

    const currentUser = useSelector(state => state?.session?.user)



    return (
        <div>
            <div className="post-header">
                <img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />
                <span className="username">{post?.owner?.username}</span>
                <span className="timestamp">{post?.createdAt}</span>
            </div>
            <div className="post-content">
                {post?.content}
            </div>
            <div className="post-footer">
                <button className="like-button">{post?.notes} notes</button>
                <button className="like-button"><i class="fa fa-heart"></i></button>
                <button className="reblog-button"><i class="fa fa-retweet"></i></button>
                {currentUser?.id === post?.userId ? (
                    <span>
                        <OpenModalButton
                            buttonText={<><i className="fas fa-trash-alt"></i></>}
                            modalComponent={<DeletePost postId={post?.id} />}
                        />
                        <OpenModalButton
                            buttonText="Update"
                            modalComponent={<EditPost post={post} />}
                        />

                    </span>
                ) : (
                    <></>
                )}
                <OpenModalButton
                    buttonText="Comment"
                    modalComponent={<CreateComment postId={post?.id} />}
                />

            </div>
        { post?.comments?.length ?

        post?.comments.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {
            return (
                <ul id="list">
                    <li><span>{comment?.content}</span><span><OpenModalButton buttonText='Delete' modalComponent={<DeleteComment commentId={comment?.id} />} /></span><span><OpenModalButton buttonText='Update' modalComponent={<EditComment comment={comment}/>} /></span></li>
                </ul>
            )
        }): <></>

}
        </div >
    )
}

export default PostItem
