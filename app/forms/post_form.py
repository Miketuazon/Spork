from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class PostForm(FlaskForm):
    post_type = StringField('post_type')
    title = StringField('title', validators=[Length(max=51, message='Title must be between 3 and 50 characters!')] )
    file_one = FileField('file_one', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_two = FileField('file_two', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_three = FileField('file_three', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_four = FileField('file_four', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_five = FileField('file_five', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_six = FileField('file_six', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_seven = FileField('file_seven', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_eight = FileField('file_eight', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_nine = FileField('file_nine', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    file_ten = FileField('file_ten', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    content = StringField('content', validators=[DataRequired(message='Content must be between 3 and 255 characters!'), Length(min=3,max=256, message='Content must be between 3 and 255 characters')] )
    userId = IntegerField('owner')
