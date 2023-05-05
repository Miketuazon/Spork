

const PostItem = ({ post, user }) => {
    return (
        <div>
            <p>{post.username}</p>
            <p>{post.content}</p>
        </div>

    )
}

export default PostItem
