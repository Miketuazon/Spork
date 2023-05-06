from app.models import db, environment, SCHEMA
from app.models.likes import Like
from sqlalchemy.sql import text

def seed_likes():
    like_1  = Like(
        userId = 2,
        postId = 1,
    )

    like_2  = Like(
        userId = 1,
        postId = 2,
    )

    like_3  = Like(
        userId = 2,
        postId = 3,
    )

    like_4  = Like(
        userId = 1,
        postId = 4,
    )

    like_5  = Like(
        userId = 2,
        postId = 4,
    )

    db.session.add(like_1)
    db.session.add(like_2)
    db.session.add(like_3)
    db.session.add(like_4)
    db.session.add(like_5)

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
