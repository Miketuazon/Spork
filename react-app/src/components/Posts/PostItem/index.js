import "./PostItem.css"

const PostItem = ({ post }) => {
    return (
        <div>
            <div className="post-header">
                <img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" alt="default_image.png" />
                <span className="username">{post.owner.username}</span>
                <span className="timestamp">{post.createdAt}</span>
            </div>
            <div className="post-content">
                {post.content}
            </div>
            <div className="post-footer">
                <button className="like-button">{post.notes} notes</button>
                <button className="like-button">Like</button>
                <button className="reblog-button">Reblog</button>
            </div>
        </div >
    )
}

export default PostItem
