import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/query=${query}`;
    };

    return (
        <div>
            <input
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
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default SearchBar
