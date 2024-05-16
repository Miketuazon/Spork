from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required
from app.api.aws_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3
from datetime import date

post_routes = Blueprint('posts', __name__)



@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = [post.to_dict() for post in Post.query.all()]
    return posts


@post_routes.route('/current_user')
@login_required
def current_user_posts():
    """
    Query for all user's posts and returns them in a list of post dictionaries
    """
    posts = [post.to_dict() for post in Post.query.filter(Post.userId == current_user.id).all()]
    return posts 


@post_routes.route('/likes')
@login_required
def liked_posts():
    """
    Query for all liked posts and returns them in a list of post dictionaries
    """
    liked_posts = [post.to_dict() for post in Post.query.join(Post.user_likes).filter(User.id == current_user.id).all()]
    return liked_posts


@post_routes.route('/create', methods=['POST'])
@login_required
def create_a_post():
    """
    Query for creating a post and returns it in a dictionary
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            post_type=form.data['post_type'],
            title=form.data['title'],
            content=form.data['content'],
            userId=current_user.id
        )
        db.session.add(new_post)
        db.session.commit()

        if form.data['file_one']:
            file_one = form.data['file_one']
            file_one_upload = upload_file_to_s3(file_one)

            if "url" not in file_one_upload:
                return {"errors": "Url not in upload_image"}, 400

            url = file_one_upload["url"]
            new_post.file_one = url
            db.session.commit()
        return new_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/<id>/comments', methods=['POST'])
@login_required
def create_a_comment(id):
    """
    Query for creating a comment on an existing post
    """
    form = CommentForm()
    current_user_dict = current_user.to_dict()
    current_post = Post.query.get(id)

    if not current_post:
        return {"Message": "Post Does Not Exist"}

    current_post_dict = current_post.to_dict()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            content=form.data['content'],
            userId=current_user_dict['id'],
            postId=current_post_dict['id']
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@post_routes.route("/edit/<id>", methods=['PUT'])
@login_required
def update_post(id):
    """
    Query for editing an existing post the current user has created
    """
    form = PostForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        post_to_edit = Post.query.get(id)

        if not post_to_edit:
            return {'Message': "Post Does Not Exist"}

        post_to_edit_dict = post_to_edit.to_dict()

        if post_to_edit_dict['userId'] == current_user_dict['id']:
            post_to_edit.content = form.data['content']
            post_to_edit.title = form.data['title']
            post_to_edit.userId = current_user_dict['id']
            post_to_edit.updatedAt = date.today()
            db.session.commit()
            returning_value = post_to_edit.to_dict()
            return returning_value
        return {'errors': "This post isn't yours!"}, 403
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@post_routes.route('/delete/<id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
    Query for deleting a post a user has created
    """
    current_user_dict = current_user.to_dict()
    to_delete = Post.query.get(id)

    if not to_delete:
        return {"errors": "Post Does Not Exist!"}, 404

    to_delete_dict = to_delete.to_dict()

    if current_user_dict['id'] == to_delete_dict['userId']:
        db.session.delete(to_delete)
        db.session.commit()
        return {"Message": "Post Deleted Successfully"}
    return {'errors': "This post isn't yours!"}, 403
