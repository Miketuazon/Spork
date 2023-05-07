from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts():
    demo = Post(
        content="hello",
        userId=1
    )
    marnie = Post(
        content="goodbye",
        userId=2
    )
    bobbie = Post(
        content="wow really",
        userId=3
    )
    demo2 = Post(
        content="bruh",
        userId=1
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(demo2)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
