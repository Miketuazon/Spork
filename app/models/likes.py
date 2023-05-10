from .db import db, environment, SCHEMA, add_prefix_for_prod

likes = db.Table(
    "likes",
    db.Column(
        "userId",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        "postId",
        db.Integer,
        db.ForeignKey("posts.id"),
        primary_key=True
    )
)

if environment == "production":
    likes.schema = SCHEMA
