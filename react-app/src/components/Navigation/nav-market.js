import React from 'react';
import "./nav-market.css"

const NavMarket = () => {
  return (
    <div className="tumblr-mart-nav">
      <div className="categories-nav-market">
        <button className="category-nav active-nav" data-key="all">All</button>
        <button className="category-nav" data-key="merch">Merch</button>
        <button className="category-nav" data-key="gift">Gifts</button>
      </div>
      <div className="products-nav-market">
        <div className="product-nav-market">
          <div className="banner-nav popular-nav">POPULAR!</div>
          <div className="image-nav-market"><img src="https://assets.tumblr.com/images/tumblrmart/rainbow-checkmark/card_web.gif" alt="Spork product card banner" /></div>
          <div className="details-nav-market">
            <h2 className="title-nav-market">Important Rainbow Internet Checkmarks</h2>
            <p className="description-nav-market">Important just got colorful!</p>
            <button className="shop-nav-market">Shop</button>

          </div>
        </div>
        <div className="product-nav-market">
          <div className="banner-nav new-nav-market">NEW!</div>
          <div className="image-nav-market"><img src="https://i0.wp.com/shop.tumblr.com/wp-content/uploads/2023/04/TumblrUniversity.jpg?resize=150%2C150&amp;ssl=1" alt="TumblrMart product card banner" /></div>
          <div className="details-nav-market">
            <h2 className="title-nav-market">Tumblr University T-Shirt</h2>
            <p className="description-nav-market">Celebrate your love for Tumblr with this comfortable t-shirt!</p>
            <button className="shop-nav-market">Shop</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NavMarket;
