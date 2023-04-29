  
import os
from flask_admin import Admin
from .models import db, User, UserRole, Trainee, Trainer, Activity, ActivityPerTrainer, BookedClass
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(UserRole, db.session))
    admin.add_view(ModelView(Trainee, db.session))
    admin.add_view(ModelView(Trainer, db.session))
    admin.add_view(ModelView(Activity, db.session))
    admin.add_view(ModelView(ActivityPerTrainer, db.session))
    admin.add_view(ModelView(BookedClass, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))