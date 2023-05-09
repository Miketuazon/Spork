# from .db import db, environment, SCHEMA, add_prefix_for_prod

# follows = db.Table(
#     'follows',
#     db.Model.metadata,
#     db.Column('follower_id', db.Integer, db.ForeignKey("users.id"), nullable=False),
#     db.Column('followed_id', db.Integer, db.ForeignKey('users.id'), nullable=False)
# )

# if environment == "production":
#     follows.schema = SCHEMA
