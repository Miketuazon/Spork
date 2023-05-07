from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')))
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(db.DateTime, default=db.func.now())

    owner = db.relationship('User', back_populates='likes')
    post = db.relationship('Post', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
        }
