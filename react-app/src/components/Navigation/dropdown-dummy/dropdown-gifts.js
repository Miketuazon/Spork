import React from 'react';
import './dropdown-gifts.css'

const DropdownGifts = () => {
  return (
    <main className="s9s8Q gifts">
      <div className="background-color-gift">
        <div className="go-back-home-button">
        </div>
        <p className="b9fH3">Gifts</p>
        <div className="xINW8">
          <div className="zg7Ni">
            <div className="ZYmys VXTLZ">
              <button onClick={() => alert('Coming soon!')}  className="TRX6J" aria-label="Valid">
                Valid
              </button>
            </div>
            <div className="ZYmys">
              <button onClick={() => alert('Coming soon!')}  className="TRX6J" aria-label="Expired">
                Expired
              </button>
            </div>
          </div>
          <div className="Uz5cf"></div>
        </div>
        <div className="GL3jS">
          <p className="b9fH3">No valid gifts</p>
          <p className="wNngb">Your gifts will appear here when they are sent to you.</p>
        </div>
      </div>
    </main>
  );
};

export default DropdownGifts;
