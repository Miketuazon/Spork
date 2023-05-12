from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import random
# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    user1 = User(username='MikeIsTired', email='Mike@example.com', password='password')
    user2 = User(username='BrianSleepy', email='Brian@example.com', password='password')
    user3 = User(username='DerrickIsAlive?', email='Derrick@example.com', password='password')
    user4 = User(username='KishaDying', email='Kisha@example.com', password='password')
    user5 = User(username='Dav1dT', email='JD@example.com', password='password')
    user6 = User(username='BradTeaches', email='Brad@demo.com', password='password')
    user7 = User(username='KeeganStays', email='Keegan@demo.com', password='password')
    user8 = User(username='DavidLeads', email='David@demo.com', password='password')
    user9 = User(username='PythonMaster', email='isabella@demo.com', password='password')
    user10 = User(username='JSIsInferior', email='jake@demo.com', password='password')

    # adding followers to seed data
    demo.followers.append(marnie)
    demo.followers.append(bobbie)
    marnie.followers.append(bobbie)
    bobbie.followers.append(marnie)

    users = [demo, marnie, bobbie, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]
    for user in users:
        followers = random.sample(users, 3)

    for follower in followers:
        if follower != user:
            user.followers.append(follower)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.add(user4)
    db.session.add(user5)
    db.session.add(user6)
    db.session.add(user7)
    db.session.add(user8)
    db.session.add(user9)
    db.session.add(user10)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM follows"))
        db.session.execute(text("DELETE FROM likes"))


    db.session.commit()
