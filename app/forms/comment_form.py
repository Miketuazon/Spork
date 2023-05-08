from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.models import User, Post, Comment


class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), Length(min=3,max=256, message='Content must be between 3 and 255 characters')] )
    userId = IntegerField('owner')
    postId = IntegerField('post')
