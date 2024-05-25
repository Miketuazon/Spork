from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_type = db.Column(db.String(10), nullable=True)
    title = db.Column(db.String(50), nullable=True)
    content = db.Column(db.String(255), nullable=True)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    file_one = db.Column(db.String)
    file_two = db.Column(db.String)
    file_three = db.Column(db.String)
    file_four = db.Column(db.String)
    file_five = db.Column(db.String)
    file_six = db.Column(db.String)
    file_seven = db.Column(db.String)
    file_eight = db.Column(db.String)
    file_nine = db.Column(db.String)
    file_ten = db.Column(db.String)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    #likes relationship
    user_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="post_likes"
    )

    owner = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='comment_post')


    def to_dict(self):
        return {
            'id': self.id,
            'post_type': self.post_type,
            'title': self.title,
            'content': self.content,
            'userId': self.userId,
            'file_one': self.file_one,
            'file_two': self.file_two,
            'file_three': self.file_three,
            'file_four': self.file_four,
            'file_five': self.file_five,
            'file_six': self.file_six,
            'file_seven': self.file_seven,
            'file_eight': self.file_eight,
            'file_nine': self.file_nine,
            'file_ten': self.file_ten,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'likes': [user.id for user in self.user_likes],
            'comments': [comment.to_dict() for comment in self.comments],
            'notes': len(self.user_likes),
            'owner': self.owner.to_dict()
        }
