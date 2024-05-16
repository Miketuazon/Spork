from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required

like_routes = Blueprint('likes', __name__)

@like_routes.route("/<id>")
@login_required
def like_unlike_post(id):
    post = Post.query.get(id)
    if not post:
        return {"errors": "Post does not exist!"}
    liker = User.query.get(current_user.id)
    liked_posts = [post.id for post in current_user.post_likes]

    if liker.id == post.userId:
        return {"errors": "You cannot like your own post"}

    if post.id in liked_posts:
        post.user_likes.remove(liker)
        db.session.commit()
        return {"message": f"Post {post.id} was unliked by {liker.username}"}


    post.user_likes.append(liker)
    db.session.commit()
    return {"message": f"Post {post.id} was liked by {liker.username}"}
