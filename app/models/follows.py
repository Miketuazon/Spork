from .db import db, environment, SCHEMA, add_prefix_for_prod

follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
)

if environment == "production":
    follows.schema = SCHEMA
