from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post
from .auth_routes import validation_errors_to_error_messages
from app.forms import SpotForm
from flask_login import current_user, login_user, logout_user, login_required

post_routes = Blueprint('posts', __name__)



@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}
