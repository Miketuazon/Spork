import "./PostItem.css"

const PostItem = ({ post }) => {
    return (
        // <div className="post-header">
        //     <img src={users[post.userId - 1].avatar} alt={users[post.userId - 1].email} />
        //     <span className="username">{post.username}</span>
        //     <span className="timestamp">{post.timestamp}</span>
        // </div>
        // <div className="post-content">
        // {post.content}
        // </div>
        // <div className="post-footer">
        //     <button className="like-button">Like</button>
        //     <button className="reblog-button">Reblog</button>
        // </div>
        <div>
            <div className="post-header">
                <img src="https://assets.tumblr.com/images/default_avatar/cone_open_64.png" />
                <span className="username">{post.owner.username}</span>
                <span className="timestamp">{post.createdAt}</span>
            </div>
            <div className="post-content">
                {post.content}
            </div>
            <div className="post-footer">
                <button className="like-button">Like</button>
                <button className="reblog-button">Reblog</button>
            </div>
        </div>
    )
}

export default PostItem
