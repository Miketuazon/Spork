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
                    <div className="comments-trash-and-update-button">
                        <OpenModalButton
                            buttonText={<><i className="fas fa-trash-alt"></i></>}
                            modalComponent={<DeletePost postId={post?.id} />}
                        />
                        <OpenModalButton
                            buttonText={<><i className="fa fa-pen-square"></i></>}
                            modalComponent={<EditPost post={post} />}
                        />

                    </div>
                ) : (
                    <></>
                )}


            </div>
            <OpenModalButton className="text-area-for-comments" rows={1} cols={60}
                    placeholder=" Add to the discussion"
                    buttonText={<><i className="fas fa-comment-dots"></i></>}
                    modalComponent={<CreateComment postId={post?.id} />}
                />

<ul className="comment-list">
     { post?.comments?.length ?

        post?.comments.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))?.map((comment) => {
            return (
                <div className="list-for-update-delete">
                <li>
                    <div className="comment-text-bubble">
                  <div className="the-comments-commented">{comment?.content}<div class="dropdown-container">
                            <button buttonText={<><i className="fas fa-trash-alt"></i></>} class="dropbtn-update-delete">
                                <i class="fa fa-ellipsis-h"></i></button>
                    <div class="dropdown-update-delete-content">
                      <div className="comments-delete"><OpenModalButton buttonText='Delete' modalComponent={<DeleteComment commentId={comment?.id} />} /></div>
                      <div className="comments-update"><OpenModalButton buttonText='Update' modalComponent={<EditComment comment={comment}/>} /></div>
                    </div>
                  </div>
                  </div>
                  </div>

                </li>
              </div>



            )
        }): <></>

}
</ul>
        </div >
    )
}

export default PostItem
