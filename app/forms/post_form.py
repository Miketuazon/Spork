from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class PostForm(FlaskForm):
    type = StringField('type', validators=[DataRequired()] )
    title = StringField('title', validators=[ Length(max=51, message='Title must be between 50 characters')])
    image_url = StringField('image_url', validators=[ Length(max=501, message='Image URL must be between 500 characters')])
    content = StringField('content', validators=[DataRequired(), Length(min=3,max=256, message='Content must be between 3 and 255 characters')] )
    userId = IntegerField('owner')
