from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length, EqualTo
from app.models import User


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.data['email']
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class PasswordForm(FlaskForm):
    password = StringField('password', validators=[DataRequired()])
    new_password = StringField('new_password', validators=[DataRequired(message="Please add a New Password!"), Length(min=6, message='Password must be atleast 6 characters long!'), EqualTo('confirm_password', message='Passwords must match')])
    confirm_password = StringField('confirm_password', validators=[DataRequired(message="Please confirm your Password!"), Length(min=6, message='Password must be atleast 6 characters long!')])
