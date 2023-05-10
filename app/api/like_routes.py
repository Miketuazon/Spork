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
    post_dict = post.to_dict()
    liked_posts = [post.id for post in current_user.post_likes]

    if not post:
        return {"errors": "Post does not exist!"}

    if post_dict['id'] in liked_posts:
        current_user.post_likes.remove(post)
        db.session.commit()
        return "User Unliked Post"

    current_user.post_likes.append(post)
    db.session.commit()
    return "User Liked Post"
