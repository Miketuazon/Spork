import { useLocation } from "react-router-dom"
import './ResultsPage.css'
function ResultsErrorMessage() {
    const location = useLocation()
    const query = new URLSearchParams(location.search).get('query')
    return (
        <div className='no-results'>
            <h1>Sorry, there are no results for {query}.</h1>
            <h2>Please search for <i className='fas fa-angle-double-down'></i></h2>
            <h3>Posts, users or even letters of a word in a post!</h3>
            <span>*If you expected results & been waiting for a while, here's a dancing cat!*</span>
            <img className='cat' src="https://media0.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif?cid=ecf05e47f5pjfzu0y14urnutywennicb43x5upt9tvmohm21&ep=v1_gifs_related&rid=giphy.gif&ct=g"/>
        </div>
    )
}

export default ResultsErrorMessage
