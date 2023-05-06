

const PostItem = ({ post }) => {
    return (
        <div>
            <p>{post.owner.username}</p>
            <p>{post.content}</p>
        </div>

    )
}

export default PostItem
