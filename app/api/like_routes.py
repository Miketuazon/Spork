from flask import Blueprint, jsonify, session, request
from app.models import User, db, Like
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm
from flask_login import current_user, login_required
from datetime import date

like_routes = Blueprint('likes', __name__)

@like_routes.route('/')
def likes():
    """
    Query for all likes and return them in a list of like dictionaries
    """
    likes = Like.query.all()
    return_list = []
    for like in likes:
        like_dict = like.to_dict()
        owner = like.owner
