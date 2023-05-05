import PostItem from "../Post"

const users = [
    {
        id: 1,
        email: "demo@aa.io",

    },
    {
        id: 2,
        email: "bruh@gmail.com",

    }
]

const posts = [
    {
        id: 1,
        content: "hello",
        userId: 1,
        username: "demo"

    },
    {
        id: 2,
        content: "bye",
        userId: 2,
        username: "bruh"

    }
]

const Feed = () => {
    let postArr = Object.values(posts)
    console.log(postArr)
    return (
        <div className='Feed'>
            <ul className='posts'>
                {postArr.map(post => (
                    <li key={post.id} className="post">
                        <PostItem post={post} user={users} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Feed
