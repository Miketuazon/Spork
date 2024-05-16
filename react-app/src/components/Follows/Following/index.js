import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { thunkGetFollowing } from '../../../store/session';
import LoadingScreen from '../../LoadingScreen';
import FollowItem from '../FollowItem';
import "../../Posts/Feed/Feed.css"

const FollowingDropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const following = useSelector(state => state.session.user.following);
  const postsClassName = following ? "posts" : "loading";

  useEffect(() => {
    dispatch(thunkGetFollowing(sessionUser.id));
  }, [dispatch]);

  return (
    <>
        <div className='Feed'>
            {following ? (
                <ul className={postsClassName}>
                    {Object.values(following).map(follow => (
                        <li key={follow.id} className='post'>
                            <FollowItem follow={follow} />
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

export default FollowingDropdown