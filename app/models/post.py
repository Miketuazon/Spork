from .db import db, environment, SCHEMA, add_prefix_for_prod
from .likes import likes

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_type = db.Column(db.String(10), nullable=True)
    title = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    content = db.Column(db.String(255), nullable=True)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
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
            'image_url': self.image_url,
            'content': self.content,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'likes': [user.id for user in self.user_likes],
            'comments': [comment.to_dict() for comment in self.comments],
            'notes': len(self.user_likes),
            'owner': self.owner.to_dict()
        }
