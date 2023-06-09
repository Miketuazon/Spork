# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the lob-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized user, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal user.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in user, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying recent fauxposts.
      * So that I can easily log out to keep my information secure.

## Posts

### Create posts

* As a logged in user, I want to be able to post new posts.
  * When I'm on the `/new-post` page:
    * I can write and submit a new post.
      * So that I can share my thoughts and memes with my friends.

### Viewing posts

* As a logged in _or_ logged out user, I want to be able to view a selection of the most recent posts.
  * When I'm on the `/posts` page:
    * I can view the ten most recently created posts.
      * So that I can read and interact with the thoughts and memes of my friends.

* As a logged in _or_ logged out user, I want to be able to view a specific post and its associated comments and likes.
  * When I'm on the `/posts/:id` page:
    * I can view the content of the post, as well as the associated comments and likes.
      * So that I can read and interact with the thoughts and memes of my friends, and add my own thoughts and memes in the comments.

### Updating posts

* As a logged in user, I want to be able to edit my fauxposts by clicking an Edit button associated with the fauxpost anywhere that fauxpost appears.
  * When I'm on the `/fauxposts`, `/fauxposts/:id`, or `/users/:id/fauxposts` pages:
    * I can click "Edit" to make permanent changes to fauxposts I have posted.
      * So that I can fix any errors I make in my fauxposts.

### Deleting fauxposts

* As a logged in user, I want to be able to delete my fauxposts by clicking a Delete button associated with the fauxpost anywhere that fauxpost appears.
  * When I'm on the `/fauxposts`, `/fauxposts/:id`, or `/users/:id/fauxposts` pages:
    * I can click "Delete" to permanently delete a fauxpost I have posted.
      * So that when I realize I shouldn't have publicly said something, I can easily remove it.

## Follows

### Follow another user

* As a logged in user, I want to be able to follow other users I like.
  * When I'm on a post or user profile:
    * I can click the follow button and follow a user.
      * So that I can see what they post when they post and who they follow.


### Viewing followers

* As a logged in _or_ logged out user, I want to be able to see what who follows a user and who they follow.
  * When I'm on a user's profile:
    * I can view the most recently followed user.
      * So that I can see who else they follow and if I want to follow them as well.
  * When I'm on a user's profile who I don't follow:
    * I can see that the person I follow follows them.
      * So I can decide if I want to follow them as well.

* As a logged in user, I want to be able to view the users who follow me.
  * When I'm on my profile:
    * I can view the most recent followers I have acquired.
      * So that I can know who follows me.


## Likes

### Creating like on post or comment

* As a logged in user, I want to be able to like user's post or comments so I can show I liked what they posted/commented.
  * When I'm on a post or comment:
    * I can click the heart icon to increase the like count and add my like.
      * So that I can show others I liked the content and also be able to find the post later.


### Viewing likes

* As a logged in _or_ logged out user, I want to be able to see the amount of likes a post/comment has gotten.
  * When I'm on a user's post/comment:
    * I can view the amount of likes.
      * So that I can see who else liked the content I am seeing.

### Deleting/Updating likes

* As a logged in user, I want to be able to remove likes I have given to a post/comment.
  * When I'm on a user's post/comment:
    * I can remove the like.
      * So that I can change my mind on whether I liked the content or not.
