from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments():
    comment_1  = Comment(
        userId = 2,
        postId = 1,
        content = "I love this"
    )

    comment_2  = Comment(
        userId = 1,
        postId = 2,
        content = "I hate this"
    )

    comment_3  = Comment(
        userId = 3,
        postId = 1,
        content = "You should delete this"
    )

    comment_4  = Comment(
        userId = 3,
        postId = 4,
        content = "Kill Yourself"
    )


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
