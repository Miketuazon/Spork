from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from .auth_routes import validation_errors_to_error_messages
# from app.forms import PostForm
from flask_login import current_user, login_required
from datetime import date

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/delete/<id>', methods=['DELETE'])
@login_required
def delete_post(id):
    current_user_dict = current_user.to_dict()
    to_delete = Comment.query.get(id)

    if not to_delete:
        return {"Message": "Comment Does Not Exist"}

    to_delete_dict = to_delete.to_dict()

    if current_user_dict['id'] == to_delete_dict['userId']:
        db.session.delete(to_delete)
        db.session.commit()
        return {"Message": "Comment Deleted Successfully"}
    return {"Message": "Unauthorized"}
