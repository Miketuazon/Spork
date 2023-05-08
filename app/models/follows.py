from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Follower(db.Table):
#     __tablename__ = "follows"

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     following_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     followed_user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))



#     def to_dict(self):
#         return {
#             "following_user_id": self.following_user_id,
#             "followed_user_id": self.followed_user_id,
#         }

followers = db.Table(
    "followers",
    db.Column('following_user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followed_user_id', db.Integer, db.ForeignKey('users.id')),
)
