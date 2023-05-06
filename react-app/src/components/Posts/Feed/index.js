import PostItem from "../Post"
import "./Feed.css"
import { NavLink } from "react-router-dom"

const users = [
    {
        id: 1,
        email: "demo@aa.io",
        avatar: "https://source.unsplash.com/random/50x50"
    },
    {
        id: 2,
        email: "bruh@gmail.com",
        avatar: "https://source.unsplash.com/random/50x50"
    }

]

const posts = [
    {
        id: 1,
        content: "hello",
        userId: 1,
        username: "demo",
        timestamp: "May 4, 2023 8:30 AM"
    },
    {
        id: 2,
        content: "bye",
        userId: 2,
        username: "bruh",
        timestamp: "May 3, 2023 5:45 PM"
    }
]

const Feed = () => {
    let postArr = Object.values(posts)
    console.log(postArr)
    return (
        <div className='Feed'>
            <div className="post-option">
            <NavLink exact to="/"> Aa</NavLink>
            <NavLink exact to="/"><i class="fa fa-camera"></i></NavLink>
            <NavLink exact to="/"><i class="fa fa-quote-left"></i></NavLink>
            <NavLink exact to="/"><i class="fa fa-chain"></i></NavLink>
            <NavLink exact to="/"><i class='fas fa-comment-dots'></i></NavLink>
            <NavLink exact to="/"><i class="fa fa-headphones"></i></NavLink>
            <NavLink exact to="/"><i class="fa fa-video-camera"></i></NavLink>
            <span></span>
            </div>
            <ul className='posts'>
                {postArr.map(post => (
                    <li key={post.id} className="post">
                        <div className="post-header">
                            <img src={users[post.userId - 1].avatar} alt={users[post.userId - 1].email} />
                            <span className="username">{post.username}</span>
                            <span className="timestamp">{post.timestamp}</span>
                        </div>
                        <div className="post-content">
                            {post.content}
                        </div>
                        <div className="post-footer">
                            <button className="like-button">Like</button>
                            <button className="reblog-button">Reblog</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Feed
