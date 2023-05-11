from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User, Post


class PostForm(FlaskForm):
    post_type = StringField('post_type')
    title = StringField('title', validators=[Length(max=51, message='Title must be less than 51 characters')] )
    image_url = StringField('image_url', validators=[Length(max=256, message='Image URL must be less than 256 characters')] )
    content = StringField('content', validators=[Length(max=256, message='Content must be less than 256 characters')] )
    link_url = StringField('link_url', validators=[Length(max=256, message='Link URL must be less than 255 characters')] )
    userId = IntegerField('owner')
