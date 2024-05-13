from flask import Blueprint, request
from flask_login import login_required, current_user, logout_user
from app.models import User, db
from app.forms import UserNameForm, EmailForm, PasswordForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)

def is_demo_user(user):
    return user.id == 1


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

    if is_demo_user(current_user):
        return {'errors': ['Cannot edit Demo user!']}, 401

    if form.data['username'] == current_user.username and current_user.check_password( form.data['password']):
        return current_user.to_dict()
    
    if current_user.check_password( form.data['password']) == False:
        return {'errors': ['Incorrect Password']}, 401

    if form.validate_on_submit():
        current_user.username = form.data['username']

        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/current_user/edit_email', methods=['PUT'])
@login_required
def edit_email():
    """
    Query for editing a user's email and returns that user in a dictionary
    """
    form = EmailForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if is_demo_user(current_user):
        return {'errors': ['Cannot edit Demo user!']}, 401

    if form.data['email'] == current_user.email and current_user.check_password( form.data['password']):
        return current_user.to_dict()
    
    if current_user.check_password( form.data['password']) == False:
        return {'errors': ['Incorrect Password']}, 401
    
    if form.validate_on_submit():
        current_user.email = form.data['email']
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/current_user/edit_password', methods=['PUT'])
@login_required
def edit_password():
    """
    Query for editing a user's password and returns that user in a dictionary
    """
    form = PasswordForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if is_demo_user(current_user):
        return {'errors': ['Cannot edit Demo user!']}, 401

    if current_user.check_password( form.data['password']) == False:
        return {'errors': ['Incorrect Password']}, 401
    
    if form.data['new_password'] == form.data['password']:
        return {'errors': ['New Password must be different from current password']}, 401
    
    if form.validate_on_submit():
        current_user.password = form.data['new_password']
        db.session.commit()
        return current_user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/current_user/delete', methods=['DELETE'])
@login_required
def delete_user():
    """
    Query for deleting a user and returns a message
    """
    if is_demo_user(current_user):
        return {'errors': ['Cannot delete Demo user!']}, 401
    
    db.session.delete(current_user)
    db.session.commit()
    logout_user()
    return {"Message": "User Deleted Successfully"}

