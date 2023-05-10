from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment, follows
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required
from datetime import date

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/<int:user_id>')
@login_required
def follow_unfollow_a_user(user_id):
    """
    Query for following/unfollowing a user
    """
    followed = User.query.get(user_id) # user 2
    if not followed:
        return {"errors": "User does not exist"}

    follower = User.query.get(current_user.id) # user 1
    followed_users = [user.id for user in followed.following]

    if current_user.id == user_id:
        return {"errors": "You cannot follow yourself"}

    if follower.id in followed_users:
        follower.followers.remove(followed)
        db.session.commit()
        return f"{follower.username} unfollowed {followed.username}"

    follower.followers.append(followed)
    db.session.commit()
    return f"User followed {followed.username}"
