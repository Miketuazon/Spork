# from flask import Blueprint, jsonify, session, request
# from app.models import User, db, Post, Comment, follows
# from .auth_routes import validation_errors_to_error_messages
# from app.forms import PostForm, CommentForm
# from flask_login import current_user, login_required
# from datetime import date

# follow_routes = Blueprint('follow', __name__)

# @follow_routes.route('/', methods=['GET'])
# @login_required
# def follow_a_user():
#     """
#     Query for following a user
#     """
#     current_user_dict = current_user.todict()
#     print(current_user_dict)
#     return redirect('/')
