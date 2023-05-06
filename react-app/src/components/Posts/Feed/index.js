import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PostItem from '../Post';
import './Feed.css';

const users = [
  {
    id: 1,
    email: 'demo@aa.io',
    avatar: 'https://source.unsplash.com/random/50x50',
  },
  {
    id: 2,
    email: 'bruh@gmail.com',
    avatar: 'https://source.unsplash.com/random/50x50',
  },
];

const posts = [
  {
    id: 1,
    content: 'hello',
    userId: 1,
    username: 'demo',
    timestamp: 'May 4, 2023 8:30 AM',
  },
  {
    id: 2,
    content: 'bye',
    userId: 2,
    username: 'bruh',
    timestamp: 'May 3, 2023 5:45 PM',
  },
];

const Feed = () => {
  const [comments, setComments] = useState({});
  const postArr = Object.values(posts);

  const handleCommentChange = (postId, event) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: event.target.value,
    }));
  };

  const handleCommentSubmit = (postId, event) => {
    event.preventDefault();
    console.log('Comment submitted:', comments[postId]);
    setComments((prevComments) => ({ ...prevComments, [postId]: '' }));
  };

  return (
    <div className='Feed'>
      <div className="post-option">
        <NavLink exact to="/"> Aa</NavLink>
        <NavLink exact to="/"><i className="fa fa-camera"></i></NavLink>
        <NavLink exact to="/"><i className="fa fa-quote-left"></i></NavLink>
        <NavLink exact to="/"><i className="fa fa-chain"></i></NavLink>
        <NavLink exact to="/"><i className='fas fa-comment-dots'></i></NavLink>
        <NavLink exact to="/"><i className="fa fa-headphones"></i></NavLink>
        <NavLink exact to="/"><i className="fa fa-video-camera"></i></NavLink>
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
            <div className="comment-section">
              <h3>Comments</h3>
              <ul>
                <li>
                  <div className="comment-header">
                    <span className="username">{users[0].email}</span>
                    <span className="timestamp">May 6, 2023 3:15 PM</span>
                  </div>
                  <div className="comment-content">
                    Hello haha
                  </div>
                </li>
                <li>
                  <div className="comment-header">
                    <span className="username">{users[1].email}</span>
                    <span className="timestamp">May 6, 2023 3:30 PM</span>
                  </div>
                  <div className="comment-content">
                    Thanks for sharing! woohoo
                  </div>
                </li>
              </ul>
              <form className="comment-form">
                <input type="text" placeholder="Add a comment..." />
                <button type="submit">Post</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

        }
  export default Feed;
