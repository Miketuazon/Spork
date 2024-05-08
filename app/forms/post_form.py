from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    post_type = StringField('post_type')
    title = StringField('title', validators=[Length(max=51, message='Title must be between 3 and 50 characters!')] )
    file_one = FileField('file_one', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    content = StringField('content', validators=[DataRequired(message='Content must be between 3 and 255 characters!'), Length(min=3,max=256, message='Content must be between 3 and 255 characters')] )
    userId = IntegerField('owner')
