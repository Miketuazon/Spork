import React from "react";
import "./nav-explore.css"

const Explore = () => {
  const posts = [
    {
      id: 1,
      title: "The Legend of Zelda: Tears of the Kingdom is here!",
      body: "Nintendo's long-awaited The Legend of Zelda: Tears of the Kingdom is finally here! Check out all the fan art, memes, gifs, and discourse celebrating this magnificent achievement.",
      image: "https://assets-prd.ignimgs.com/2022/09/14/zelda-tears-of-the-kingdom-button-2k-1663127818777.jpg",
    },
    {
      id: 2,
      title: "Warmth in Motion",
      body: "A beautiful gif of a sunset by riverwindphotography.",
      image: "https://www.positran.eu/wp-content/uploads/elementor/thumbs/sun-orqgk2tuqouwul1lb35lalwbrbk7fkpkl8ccf93vi8.jpg",
    },
    {
      id: 3,
      title: "Thinking about food textures",
      body: "A thoughtful post about how to make eating healthy more enjoyable for people with texture issues.",
      image: "https://s7d1.scene7.com/is/image/mcdonalds/2_Pub_Commitment_574x384:2-column-desktop?resmode=sharp2",
    },
    {
      id: 4,
      title: "How to make the perfect cup of coffee",
      body: "Here is a step-by-step guide on how to make the perfect cup of coffee.",
      image: "https://www.tastingtable.com/img/gallery/20-different-types-of-coffee-explained/intro-1659544996.jpg",
    },
    {
      id: 5,
      title: "The best places to eat in New York City",
      body: "Here is a list of the best places to eat in New York City, according to Yelp reviews.",
      image: "https://www.travelandleisure.com/thmb/91pb8LbDAUwUN_11wATYjx5oF8Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg",
    },
    {
      id: 6,
      title: "How to get rid of a cold",
      body: "Here are some tips on how to get rid of a cold quickly and naturally.",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/221205091646-winter-cold-stock.jpg?c=original",
    },
    {
      id: 7,
      title: "How to make a DIY face mask",
      body: "Here is a recipe for a DIY face mask that will leave your skin feeling soft and refreshed.",
      image: "https://static.toiimg.com/thumb/imgsize-23456,msid-76324396,width-600,resizemode-4/76324396.jpg",
    },
    {
      id: 8,
      title: "How to declutter your home",
      body: "Here are some tips on how to declutter your home quickly and easily.",
      image: "https://www.houselogic.com/wp-content/uploads/2017/11/how-declutter-quickly-standard_b1535666dfb0ae24a046d39eae071242.jpg",
    },
    {
      id: 9,
      title: "How to save money on groceries",
      body: "Here are some tips on how to save money on groceries, without sacrificing quality.",
      image: "https://hips.hearstapps.com/hmg-prod/images/how-to-save-money-on-groceries-1673472736.png",
    },
    {
      id: 10,
      title: "How to get a good night's sleep",
      body: "Here are some tips on how to get a good night's sleep, so you can wake up feeling refreshed and energized.",
      image: "https://media.glamourmagazine.co.uk/photos/62de970ac0bdbc88bce2931d/1:1/w_1920,h_1920,c_limit/SLEEP%20PERCEPTION%20GAP%20250722%20%20%20GettyImages-1369910115_SQ.jpg",
    },
  ];

  return (
    <div className="explore">
      <h1 className="explore-header">Today on Tumblr</h1>
      <ul className="explore-list">
        {posts.map((post) => (
          <li key={post.id} className="explore-post">
            <h2 className="explore-title">{post.title}</h2>
            <img src={post.image} alt={post.title} />
            <p className="explore-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
