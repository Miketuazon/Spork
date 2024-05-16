import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { thunkGetFollowers, thunkGetFollowing } from '../../../store/session';
import LoadingScreen from '../../LoadingScreen';
import FollowItem from '../FollowItem';
import "../../Posts/Feed/Feed.css"

const FollowerDropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const followers = useSelector(state => state.session.user.followers);
  const postsClassName = followers ? "posts" : "loading";

  useEffect(() => {
    dispatch(thunkGetFollowers(sessionUser.id));
    dispatch(thunkGetFollowing(sessionUser.id));
  }, [dispatch]);

  return (
    <>
        <div className='Feed'>
            {followers ? (
                <ul className={postsClassName}>
                    {Object.values(followers).map(follow => (
                        <li key={follow.id} className='post'>
                            <FollowItem follow={follow}/>
                        </li>
                    ))}
                </ul>
            ) : (
                <LoadingScreen />
            )}
        </div>
    </>
  )
}

export default FollowerDropdown