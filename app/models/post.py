from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post_type = db.Column(db.String(10), nullable=False)
    title = db.Column(db.String(50), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)
    content = db.Column(db.String(255), nullable=True)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    owner = db.relationship('User', back_populates='posts')
    likes = db.relationship('Like', back_populates="post")
    like = db.relationship('Like', back_populates='post')
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
            'updatedAt': self.updatedAt
        }
