"""empty message

Revision ID: 72031cf48c80
Revises: 4f0717cfd7e6
Create Date: 2024-05-08 14:06:00.046540

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '72031cf48c80'
down_revision = '4f0717cfd7e6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('file_one', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_column('file_one')

    # ### end Alembic commands ###