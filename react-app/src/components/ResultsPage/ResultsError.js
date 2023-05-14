
function ResultsErrorMessage() {

    return (
        <div className='no-results'>
            <h1>Sorry, there are no results for {query}.</h1>
            <h2>Please search for:</h2>
            <h3>Posts, users or even part of word in a post!</h3>
        </div>
    )
}

export default ResultsErrorMessage
