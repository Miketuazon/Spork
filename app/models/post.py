from .db import db, environment, SCHEMA, add_prefix_for_prod

class Post(db.Model):
    __tablename__ = "posts"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    owner = db.relationship('User', back_populates='posts')
    likes = db.relationship('Like', back_populates="post")
    like = db.relationship('Like', back_populates='post')
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'userId': self.userId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
