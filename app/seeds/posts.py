from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts():

    post1 = Post(
        post_type="text",
        title="Wow",
        content="hello",
        userId=1
    )
    post2 = Post(
        post_type="image",
        image_url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png",
        content="I like eevee",
        userId=2
    )
    post3 = Post(
        post_type="image",
        image_url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/700.png",
        content="I like sylveon",
        userId=3
    )
    post4 = Post(
        post_type="text",
        content="bruh",
        userId=1
    )

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts")),
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
