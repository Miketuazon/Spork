from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from app.forms import UserNameForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return [user.to_dict() for user in users]


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/current_user/edit_username', methods=['PUT'])
@login_required
def edit_username():
    """
    Query for editing a user's username and returns that user in a dictionary
    """
    form = UserNameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        current_user.username = form.data['username']
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
