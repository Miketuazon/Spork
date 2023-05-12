from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    # return {'users': [user.to_dict() for user in users]}
    return_list = []
    for user in users:
        user_dict = user.to_dict()
        return_list.append(user_dict)
    return return_list

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/follow')
@login_required
def follow_user(id):
    """
    Query for following a user by their id
    """
    user = User.query.get(id)
    session_user = current_user
    print(user)
    return(session_user)
