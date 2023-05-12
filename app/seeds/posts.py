from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text
import datetime
import random

def random_date(start, end):
    return start + datetime.timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
        )

start_date = datetime.datetime(2022, 1, 1, 0, 0, 0)
end_date = datetime.datetime(2023, 5, 12)


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
        post_type="text",
        image_url="https://assets.pokemon.com/assets/cms2/img/pokedex/full/700.png",
        content="I like sylveon",
        userId=3
    )
    post4 = Post(
        post_type="text",
        content="bruh",
        userId=1
    )
    post5 = Post(post_type="text", title="My vacation", content="Loved going to the beach!", userId=5, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post6 = Post(post_type="text", title="Hiking in the mountains", content="Who knew you needed hiking shoes.", userId=6, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post7 = Post(post_type="text", title="Thoughts on current events", content="I can't believe what's happening in the world right now.", userId=7, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post8 = Post(post_type="text", title="My new painting", content="I thought I painted goo", userId=8, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post9 = Post(post_type="text", title="Cooking tutorial", content="Cooking is too easy", userId=9, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post10 = Post(post_type="text", title="Favorite book", content="I just finished reading 'To Kill a Mockingbird' and it was amazing.", userId=10, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post11 = Post(post_type="text", title="My dog", content="Is not a cat", userId=1, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post12 = Post(post_type="text", title="Travel vlog", content="Love to travel", userId=2, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post13 = Post(post_type="text", title="New hobby", content="I started learning how to knit and it's so relaxing.", userId=3, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post14 = Post(post_type="text", title="My garden", content="I have many plants", userId=4, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post15 = Post(post_type="text", title="Guitar cover", content="Trying to cover Enter Sandman. Super hard", userId=5, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post16 = Post(post_type="text", title="Favorite restaurant", content="I tried this new restaurant and the food was amazing.", userId=6, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post17 = Post(post_type="text", title="My new tattoo", content="I shouldn't have gotten a name on my arm :(", userId=7, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post18 = Post(post_type="text", title="Fitness routine", content="One day down! I really want a burger", userId=8, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post19 = Post(post_type="text", title="Travel bucket list", content="I want to visit Japan and learn more about its culture.", userId=9, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))
    post20 = Post(post_type="text", title="My artwork", content="My art is not timeless", userId=10, createdAt=random_date(start_date, end_date), updatedAt=random_date(start_date, end_date))

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts")),
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()
