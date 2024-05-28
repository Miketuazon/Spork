import { useState } from 'react';

function SearchBar() {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        window.location.href = `/search/results/?query=${query}`;
    };

    return (
        <>
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
            <div className='footer'>
                    <h1 className='footer-title'>Meet the Team!</h1>
					<ul className='group-link'>
						<div className='link'>
						<li className='name'>
							Brian Washington
                            <div>
                                <a target='_blank' href='https://www.linkedin.com/in/brian-washington-668129244/'><i className="fa fa-linkedin-square user-icon"></i></a>
							    <a target='_blank' href='https://github.com/zipzopboppitybop' ><i className="fa fa-github user-icon"></i></a>
                            </div>
						</li>
						</div>
						<div className='link'>
						<li className='name'>
							Derrick Truong
                            <div>
                                <a target='_blank' href='https://www.linkedin.com/in/derrick-truong-1a092121a/'><i className="fa fa-linkedin-square user-icon"></i></a>
							    <a target='_blank' href='https://github.com/Derrick-Truong'><i className="fa fa-github user-icon"></i></a>
                            </div>
						</li>
						</div>
						<div className='link'>
						<li className='name'>
							Kisha Onia
                            <div>
                                <a target='_blank' href='https://www.linkedin.com/in/kisha-rose-onia-63bb35182/'><i className="fa fa-linkedin-square user-icon"></i></a>
							    <a target='_blank' href='https://github.com/kishaonia' ><i className="fa fa-github user-icon"></i></a>
                            </div>
						</li>
						</div>
						<div className='link'>
						<li className='name'>
							Michael Tuazon
                            <div>
                                <a target='_blank' href='https://www.linkedin.com/in/miketuazon/'><i className="fa fa-linkedin-square user-icon"></i></a>
							    <a target='_blank' href='https://github.com/Miketuazon' ><i className="fa fa-github user-icon"></i></a>
                            </div>
						</li>
						</div>
					</ul>
				</div>
        </>
    );
}

export default SearchBar
