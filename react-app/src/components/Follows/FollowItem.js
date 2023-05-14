import { useSelector } from "react-redux"
import './FollowItem.css'

const FollowItem = ({post}) => {

    const currentUser = useSelector(state => state?.session?.user)
    const follower = post?.owner?.followers?.find(id => id === currentUser?.id)

    // console.log('follower', follower)
    return(
        <>
       {follower && post.owner.username.length ? <div className="follower-item">{post?.owner?.username}</div>:<></>}
        </>
    )
}

export default FollowItem
