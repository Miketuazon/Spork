from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField
from wtforms.validators import Length
from app.api.aws_helpers import ALLOWED_EXTENSIONS


class ProfileForm(FlaskForm):
    profile_image = FileField('profile_image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    profile_banner = FileField('profile_banner', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    title = StringField('title', validators=[Length(max=26, message='Title must be less than 25 characters!')])
    description = StringField('description', validators=[Length(max=500, message='Description must be less than 500 characters!')])