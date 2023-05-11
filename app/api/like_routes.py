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
    liked_posts = [post.id for post in current_user.post_likes]
    liked_users = [user.id for user in post.user_likes]

    if not post:
        return {"errors": "Post does not exist!"}

    if post.id in liked_posts:
        current_user.post_likes.remove(post)
        db.session.commit()
        return {
        "message": f"Post {post.id} was unliked by {current_user.username}",
        "post": liked_users,
        "user": liked_posts
        }

    current_user.post_likes.append(post)
    db.session.commit()
    return {
        "message": f"Post {post.id} was liked by {current_user.username}",
        "post": liked_users,
        "user": liked_posts
        }
