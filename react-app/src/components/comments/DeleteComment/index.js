import { thunkDeleteComment } from "../../../store/post";
import { useDispatch} from "react-redux";

export default function ({commentId}) {
const dispatch = useDispatch()

const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(thunkDeleteComment(commentId));

}
    return (
       <>
            <div onClick={onSubmit}>
                <i className="fas fa-trash-alt"></i> </div>
        </>
    )
}
