import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import CreatePost from "./components/Posts/CreatePost";
import Navigation from "./components/Navigation";
import Feed from "./components/Posts/Feed"
import AllLikes from "./components/Likes/AllLikes";
import LikesCounter from "./components/Likes/LikesCounter";
import CurrentUserPosts from "./components/Posts/CurrentUserPosts";
import EditPost from "./components/Posts/EditPost";
import ResultsPage from "./components/ResultsPage/ResultsPage"
import AdFreeComponent from "./components/Navigation/dropdown-dummy/dropdown-adfree";
import DropdownGifts from "./components/Navigation/dropdown-dummy/dropdown-gifts";
import LivestreamCredits from "./components/Navigation/dropdown-dummy/dropdown-livestreamingcredits";
// import UserPage from "./components/UserPage/UserPage";
import FollowingDropdown from "./components/Follows/FollowingDropdown";
import FollowerDropdown from "./components/Follows/FollowerDropdown";
import Live from "./components/Navigation/dropdown-dummy/dropdown-live";
import Explore from "./components/Navigation/dropdown-dummy/nav-explore";
import NavMarket from "./components/Navigation/nav-market";
import NotFoundPage from "./components/Navigation/404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <Feed />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          {/* <Route exact path="/explore" >
            <Explore />
          </Route> */}
          {/* <Route exact path="/adfree">
            <AdFreeComponent />
          </Route> */}
          {/* <Route exact path="/live">
            <Live />
          </Route>
          <Route exact path="/gifts">
            <DropdownGifts />
          </Route> */}
          <Route exact path="/Likes">
            <AllLikes />
          </Route>
          {/* <Route exact path="/livestreamcredits">
            <LivestreamCredits />
          </Route> */}
          <Route exact path="/following">
            <FollowingDropdown />
          </Route>
          <Route exact path="/followers">
            <FollowerDropdown />
          </Route>
          {/* <Route exact path="/NavMarket">
            <NavMarket />
          </Route> */}
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/posts/edit/:postId">
            <EditPost />
          </Route>
          {/* <Route exact path="/likes">
            <AllLikes />
          </Route> */}
          <Route exact path="/posts/current">
            <CurrentUserPosts />
          </Route>
          <Route exact path="/likesCounter">
            <LikesCounter />
          </Route>
          <Route exact path="/feed">
            <Feed />
          </Route>
          <Route path="/search">
            <ResultsPage />
          </Route>
          {/* <Route path="/user/:id">
            <UserPage />
          </Route> */}


        <Route path='*'><NotFoundPage/></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
