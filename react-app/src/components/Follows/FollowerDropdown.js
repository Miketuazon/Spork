import React from 'react';
import "./FollowingDropdown.css"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../../store/users';
import { getAllPosts } from '../../store/post';
import { useEffect } from 'react';
import FollowItem from './FollowItem';
import { getFollowsForUser } from '../../store/follow';


const FollowerDropdown = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state?.posts)
    console.log('posts', posts)

    const currentUser = useSelector(state => state?.session?.user)

    console.log('currentuser', currentUser)
    const postsVal = Object?.values(posts)
    console.log('Post Values', postsVal)
    const uniqueIds = new Set();
    const uniqueData = postsVal?.filter(item => {
        if (!uniqueIds.has(item?.userId)) {
            uniqueIds.add(item?.userId);
            return true;
        }
        return false;
    });

    const currentUserFollowing = currentUser?.following
    const currentUserVal = Object.values(currentUser)
    const follow = uniqueData?.filter(item => { return item?.owner?.following?.some(id => id === currentUser?.id) })
    const follower = uniqueData?.filter(item => { return item?.owner?.followers?.some(id => id === currentUser?.id) })
    // const follower = post?.owner?.followers?.find(id => id === currentUser?.id)
    // const postsFilter = currentUserVal?.filter(currentUser?.following?.id === postsVal?.userId)
    const followerCount = follow?.length
    console.log('FollowCount', follow)

    useEffect(() => {

        dispatch(getAllPosts())
    }, [dispatch, JSON.stringify(follow), JSON.stringify(currentUser)])
    return (
        <div className="lSyOz">
            <main className="rmkqO">
                {follow?.length ? <h1 className="IiZ2z">Followers {followerCount}</h1> : <></>}

                {follow.length ? Object?.values(follow)?.map(follows => {
                    const onSubmitFollow = async (e) => {
                        e.preventDefault()

                        const success = dispatch(getFollowsForUser(follows?.userId))
                        if (success) {
                            dispatch(getAllPosts())

                            // window.location.reload(false);
                        }
                    }
                    return (

                        <form className="Il4T7" action="">
                            <input className="dyc2r" type="text" autoComplete="off" placeholder={follows?.owner?.username} value={follows?.owner?.username} readOnly />
                        </form>
                    )
                }
                )
                    : <div className="following-page-title"><h1>Oh no! No one follows you!</h1></div>
                }
                <section className="NedHV"></section>
            </main>
        </div>
    );
};

export default FollowerDropdown;
