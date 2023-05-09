from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Like, Comment
from .auth_routes import validation_errors_to_error_messages
from app.forms import PostForm, CommentForm
from flask_login import current_user, login_required
from datetime import date

post_routes = Blueprint('posts', __name__)



@post_routes.route('/')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return_list = []
    for post in posts:
        post_dict = post.to_dict()
        owner = post.owner
        likes = post.likes
        post_comments = post.comments
        like_dict = []
        comment_list = []
        notes = 0
        for like in likes:
            notes += 1
            like_dict.append(like.user.username)
        for comment in post_comments:
            comment_dict = comment.to_dict()
            comment_dict['comment-owner'] = comment.comment_owner.username
            comment_list.append(comment_dict)
        post_dict['comments'] = comment_list
        post_dict["notes"] = notes
        post_dict["likes_user_list"] = like_dict
        post_dict['owner'] = owner.to_dict()
        return_list.append(post_dict)
    return return_list

@post_routes.route('/current_user')
@login_required
def current_user_posts():
    """
    Query for all user's posts and returns them in a list of post dictionaries
    """

    current_user_dict = current_user.to_dict()
    posts = Post.query.filter(Post.userId == current_user_dict['id'])
    return_list = []
    for post in posts:
        post_dict = post.to_dict()
        owner = post.owner
        likes = post.likes
        post_comments = post.comments
        like_dict = []
        comment_list = []
        notes = 0
        for like in likes:
            notes += 1
            like_dict.append(like.user.username)
        for comment in post_comments:
            comment_dict = comment.to_dict()
            comment_dict['comment-owner'] = comment.comment_owner.username
            comment_list.append(comment_dict)
        post_dict['comments'] = comment_list
        post_dict["notes"] = notes
        post_dict["likes_user_list"] = like_dict
        post_dict['owner'] = owner.to_dict()
        return_list.append(post_dict)
    return return_list


@post_routes.route('/create', methods=['POST'])
@login_required
def create_a_post():
    """
    Query for creating a post and returns it in a dictionary
    """
    form = PostForm()
    current_user_dict = current_user.to_dict()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_post = Post(
            type=form.data['type'],
            title=form.data['title'],
            image_url=form.data['image_url'],
            content=form.data['content'],
            userId=current_user_dict['id']
        )
        db.session.add(new_post)
        db.session.commit()
        return {"Successfully Created Post": new_post.to_dict()}
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
        return {"Successfully Created Comment": new_comment.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
            post_to_edit.userId = current_user_dict['id']
            post_to_edit.updatedAt = date.today()
            db.session.commit()
            returning_value = post_to_edit.to_dict()
            return returning_value
        return {'Message': 'Unauthorized'}
    return {'errors': validation_errors_to_error_messages(form.errors)},401




@post_routes.route('/delete/<id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
    Query for deleting a post a user has created
    """
    current_user_dict = current_user.to_dict()
    to_delete = Post.query.get(id)

    if not to_delete:
        return {"Message": "Post Does Not Exist"}

    to_delete_dict = to_delete.to_dict()

    if current_user_dict['id'] == to_delete_dict['userId']:
        db.session.delete(to_delete)
        db.session.commit()
        return {"Message": "Post Deleted Successfully"}
    return {"Message": "Unauthorized"}
