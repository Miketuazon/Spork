import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import CreatePost from "./components/Posts/CreatePost";
import Feed from "./components/Posts/Feed"
import AllLikes from "./components/Likes/AllLikes";
import LikesCounter from "./components/Likes/LikesCounter";
import CurrentUserPosts from "./components/Posts/CurrentUserPosts";
import EditPost from "./components/Posts/EditPost";
import ResultsPage from "./components/ResultsPage/ResultsPage"
import NotFoundPage from "./components/Navigation/404";
import LoadingScreen from "./components/LoadingScreen";
import SideMenu from "./components/SideMenu";
import FollowingDropdown from "./components/Follows/Following";
import FollowerDropdown from "./components/Follows/Followers";
import SearchBar from "./components/ResultsPage/Searchbar";
import SettingsPage from "./components/SettingsComponents";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <SideMenu isLoaded={isLoaded}/>
      <SearchBar  isLoaded={isLoaded}/>
      {!isLoaded && (
        <LoadingScreen />
      )}
      {isLoaded && (
        <Switch>
          <Route exact path="/" >
            <Feed />
          </Route>
          <Route exact path="/loading" >
            <LoadingScreen />
          </Route>
          <Route exact path="/create">
            <CreatePost />
          </Route>
          <Route exact path="/Likes">
            <AllLikes />
          </Route>
           <Route exact path="/following">
            <FollowingDropdown />
          </Route>
          <Route exact path="/followers">
            <FollowerDropdown />
          </Route> 
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/posts/edit/:postId">
            <EditPost />
          </Route>
          <Route exact path="/posts">
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
          <Route path="/settings">
            <SettingsPage />
          </Route>
        <Route path='*'><NotFoundPage/></Route>
        </Switch>
      )}
    </>
  );
}

export default App;
