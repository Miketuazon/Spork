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
        content = "I don't think that's fair"
    )

    comment_5 = Comment(userId=1, postId=1, content="Great post!")
    comment_6 = Comment(userId=2, postId=1, content="I found this really helpful, thank you!")
    comment_7 = Comment(userId=3, postId=2, content="Interesting topic, I'd like to learn more.")
    comment_8 = Comment(userId=4, postId=2, content="This is so useful, thanks for sharing!")
    comment_9 = Comment(userId=5, postId=3, content="I disagree with some of your points, but this was a thought-provoking read.")
    comment_10 = Comment(userId=6, postId=3, content="Great insights, thanks for sharing your perspective!")
    comment_11 = Comment(userId=7, postId=4, content="I'm so glad I came across this post, it's exactly what I was looking for.")
    comment_12 = Comment(userId=8, postId=4, content="Excellent article, I'll definitely be sharing this with others.")
    comment_13 = Comment(userId=9, postId=5, content="Wow, I had no idea about this topic before reading your post. Thanks for shedding light on it!")
    comment_14 = Comment(userId=10, postId=5, content="This is one of the best posts I've read on this subject. You did a great job!")
    comment_15 = Comment(userId=9, postId=6, content="This was really well-written and easy to understand. Thanks for breaking down a complex topic.")
    comment_16 = Comment(userId=8, postId=6, content="As someone who is new to this field, your post was incredibly helpful. Thanks for sharing your expertise!")
    comment_17 = Comment(userId=7, postId=7, content="I can tell you put a lot of time and effort into this post. Thanks for all the research and insights!")
    comment_18 = Comment(userId=6, postId=7, content="I loved reading this post and learned so much from it. Can't wait to see more from you!")
    comment_19 = Comment(userId=5, postId=8, content="I found this really interesting and thought-provoking. Thanks for sharing your thoughts!")
    comment_20 = Comment(userId=4, postId=8, content="Great post! I'll definitely be sharing this with my colleagues.")
    comment_21 = Comment(userId=4, postId=9, content="Your post really resonated with me, and I think it will with many others as well. Thanks for being vulnerable and sharing your story.")
    comment_22 = Comment(userId=7, postId=9, content="I appreciate your honesty and openness in sharing your experiences. It's so important to have these conversations.")
    comment_23 = Comment(userId=3, postId=10, content="I loved your post and think it's an important message that more people need to hear. Keep up")


    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)
    db.session.add(comment_14)
    db.session.add(comment_15)
    db.session.add(comment_16)
    db.session.add(comment_17)
    db.session.add(comment_18)
    db.session.add(comment_19)
    db.session.add(comment_20)
    db.session.add(comment_21)
    db.session.add(comment_22)
    db.session.add(comment_23)
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
