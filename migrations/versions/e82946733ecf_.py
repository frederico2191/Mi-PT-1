"""empty message

Revision ID: e82946733ecf
Revises: 50a1996b5835
Create Date: 2023-04-25 19:09:03.927544

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e82946733ecf'
down_revision = '50a1996b5835'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('approved', sa.Boolean(), nullable=True))
        batch_op.drop_column('Approved')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('trainer', schema=None) as batch_op:
        batch_op.add_column(sa.Column('Approved', sa.BOOLEAN(), autoincrement=False, nullable=True))
        batch_op.drop_column('approved')

    # ### end Alembic commands ###
