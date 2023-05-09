from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Like, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required
from datetime import date

follow_routes = Blueprint('follow', __name__)

@follow_routes.route('/followers')
@login_required
def get_followers():
    """
    Query for getting a user's followers
    """
    current_user_dict = current_user.todict()
    pass

@follow_routes.route('/follow')
@login_required
def follow_a_user():
    """
    Query for following a user
    """
    current_user_dict = current_user.todict()
    pass
