import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { thunkGetFollowing } from '../../../store/session';

const FollowingDropdown = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const following = useSelector(state => state.session.user.following);

  console.log(sessionUser)

  useEffect(() => {
    dispatch(thunkGetFollowing(sessionUser.id));
  }, [dispatch]);

  return (
    <>
        <div>
            {following ? (
                following.map(follow => (
                    <div key={follow.id}>
                        <h3>{follow.username}</h3>
                    </div>
                ))
            ) : (
                <h3>No Following</h3>
            )}
        </div>
    </>
  )
}

export default FollowingDropdown