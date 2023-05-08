from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import  CommentForm
from flask_login import current_user, login_required
from datetime import date

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/edit/<id>", methods=["GET", "POST"])
@login_required
def update_comment(id):
    form = CommentForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment_to_edit = Comment.query.get(id)

        if not comment_to_edit:
            return {'Message': "Comment Does Not Exist"}

        comment_to_edit_dict = comment_to_edit.to_dict()

        if comment_to_edit_dict['userId'] == current_user_dict['id']:
            comment_to_edit.content = form.data['content']
            comment_to_edit.userId = current_user_dict['id']
            comment_to_edit.updatedAt = date.today()
            db.session.commit()
            returning_value = comment_to_edit.to_dict()
            return returning_value
        return {'Message': 'Unauthorized'}
    return {'errors': validation_errors_to_error_messages(form.errors)},401




@comment_routes.route('/delete/<id>', methods=['DELETE'])
@login_required
def delete_comment(id):
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
