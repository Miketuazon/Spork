from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text

def seed_posts():
    demo = Post(
        type="text",
        title="testing",
        content="hello",
        userId=1
    )
    marnie = Post(
        type="image",
        image_url="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pokemon.com%2Fus%2Fpokedex%2Feevee&psig=AOvVaw1J8p3wI_owwLV1ys_yrvk2&ust=1683740655239000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCJDHuvDk6P4CFQAAAAAdAAAAABAM",
        content="I Like Eevee",
        userId=2
    )
    bobbie = Post(
        type="image",
        image_url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/700.png",
        content="I like Sylveon",
        userId=3
    )
    demo2 = Post(
        type="text",
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
