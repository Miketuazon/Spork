import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/results/?query=${query}`;
    };

    return (
        <div className='search-bar'>
            <input
                className="spork-search-bar"
                type="text"
                value={query}
                placeholder=" Search Spork"
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <button className="spork-search-button" onClick={handleSearch}><i className="fa">&#xf002;</i></button>

        </div>
    );
}

export default SearchBar
