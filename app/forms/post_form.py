from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User, Post


class PostForm(FlaskForm):
    post_type = StringField('post_type')
    title = StringField('title', validators=[Length(max=51, message='Title must be between 3 and 50 characters!')] )
    image_url = StringField('image_url', validators=[Length(max=256, message='Image URL must be less than 255 characters!')] )
    content = StringField('content', validators=[DataRequired(message='Content must be between 3 and 255 characters!'), Length(min=3,max=256, message='Content must be between 3 and 255 characters')] )
    userId = IntegerField('owner')
