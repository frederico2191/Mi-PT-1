from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String(250), nullable=True)
    first_name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    weight = db.Column(db.String(250), nullable=True)
    height = db.Column(db.String(250), nullable=True)
    paypal_link = db.Column(db.String(250), nullable=True)
    gender = db.Column(db.String(250), nullable=True)
    user_role = db.Column(db.String(250), nullable=True)
    
    trainee = db.relationship('Trainee', backref='user', lazy=True, uselist=False)
    # trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id'), nullable=False)
    trainer = db.relationship('Trainer', backref='user', uselist=False)
    # trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'), nullable=False)

    # gender = db.relationship('Gender', backref='user', lazy=True)
    # gender_id = db.Column(db.Integer, db.ForeignKey('gender.id'), nullable=True)
    # user_role = db.relationship('UserRole', backref='user', lazy=True)
    # user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.id'), nullable=True)

    def __repr__(self):
        return self.first_name

    def serialize(self):
        print(self.trainer, "$$$$$$$$")
        if (self.user_role == "trainer"): 
            trainer = Trainer.query.filter_by(user_id = self.id).first()
            serializedTrainer = trainer.serialize() if trainer else None
            activities = ActivityPerTrainer.query.filter_by(trainer_id = serializedTrainer["id"]).all() if serializedTrainer else []
        elif(self.user_role == "trainee"):
            trainee = Trainee.query.filter_by(user_id = self.id).first()
            serializedTrainee = trainee.serialize() if trainee else None
            activities = ActivityPerTrainer.query.filter_by(trainee_id = serializedTrainee["id"]).all() if serializedTrainee else []
        

        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
            "age": self.age,
            "city": self.city,
            "weight": self.weight,
            "height": self.height,
            "gender": self.gender,
            "paypal_link": self.paypal_link,
            # "user_role": self.user_role.name if self.user_role else "unknown",
            "user_role": self.user_role,
            "activities": [activity.serialize() for activity in activities],
            "trainer": self.trainer.serialize() if self.trainer else None,
            "trainee": self.trainee.serialize() if self.trainee else None,
        }

atendencies = db.Table('atendencies',
    db.Column('activity_per_trainer_id', db.Integer, db.ForeignKey('activity_per_trainer.id'), primary_key=True),
    db.Column('trainee_id', db.Integer, db.ForeignKey('trainee.id'), primary_key=True)
)

class Trainee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body_type = db.Column(db.String(250), nullable=True)
    goal = db.Column(db.String(250), nullable=True)
    fitness_experience = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    atendencies = db.relationship('ActivityPerTrainer', secondary=atendencies, lazy='subquery',backref=db.backref('trainees', lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "body_type": self.body_type,
            "goal": self.goal,
            "fitness_experience": self.fitness_experience,
            "city": self.city,
            "user_id": self.user_id
        }

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    approved = db.Column(db.Boolean(), nullable=True)
    about = db.Column(db.String(1000), nullable=True)
    experience_level = db.Column(db.String(250), nullable=True)
    bank_account = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    specialty = db.Column(db.String(250), nullable=True)
    coaching_style = db.Column(db.String(250), nullable=True)

    # user = db.relationship('User', backref='trainer', lazy=True) #ENUM !!! 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    activities = db.relationship("ActivityPerTrainer")


    def serialize(self):
        return {
            "id": self.id,
            "approved": self.approved,
            "about": self.about,
            "experience_level": self.experience_level,
            "city": self.city,
            "bank_account": self.bank_account,
            "specialty": self.specialty,
            "coaching_style": self.coaching_style,
            "user_id": self.user_id
        }


class ActivityPerTrainer(db.Model):
# class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), nullable=True)
    # name = db.Column(db.String(250), nullable=True)
    duration = db.Column(db.String(250), nullable=True)
    location_range = db.Column(db.String(250), nullable=True)
    location_pinpoint = db.Column(db.String(250), nullable=True)
    price = db.Column(db.String(250), nullable=True)
    date = db.Column(db.DateTime(timezone=False), nullable=True)
    hour = db.Column(db.String(250), nullable=True)
    minutes = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    lat = db.Column(db.String(250), nullable=True)
    lng = db.Column(db.String(250), nullable=True)
    address = db.Column(db.String(1000), nullable=True)
    trainer_name = db.Column(db.String(250), nullable=True)
    trainee_name = db.Column(db.String(250), nullable=True)
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id')) 
    
    def serialize(self):
        activity = Activity.query.get(self.activity_id)
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "date": self.date,
            "price": self.price,
            "trainer_id": self.trainer_id,
            "trainee_id": self.trainee_id,
            "hour": self.hour,
            "minutes": self.minutes,
            "name": activity.name,
            "city": self.city,
            "lat": self.lat,
            "lng": self.lng,
            "address": self.address,
            "trainerName":self.trainer_name,
            "traineeName":self.trainee_name,
        }

class Activity(db.Model):
# class ActivityCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    location_type = db.Column(db.String(250), nullable=True)
    # indoor_outdoor_remote_id = db.Column(db.Integer, db.ForeignKey('indoor_outdoor_remote.id'),nullable=False)
    # activities = db.relationship(ActivityPerTrainer)
    activities_per_trainer = db.relationship('ActivityPerTrainer', backref='activity', lazy=True)


    def __repr__(self):
        return self.name
    
    def serialize(self):
        
        return {"name": self.name, "activitiesPerTrainer":self.activities_per_trainer}




class BookedClass(db.Model):
# class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(250), nullable=True)
    # location = db.Column(db.String(250), nullable=True) # WE can probably retrieve this from  activity_per_trariner

    activity_per_trainer_id = db.Column(db.Integer, db.ForeignKey('activity_per_trainer.id'))
    activity_per_trainer = db.relationship(ActivityPerTrainer)

    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainer = db.relationship(Trainer)

    trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id'))
    trainee = db.relationship(Trainee)

    def serialize(self):
        activity_per_trainer = ActivityPerTrainer.query.get(self.activity_per_trainer_id)
        trainer = Trainer.query.get(self.trainer_id)
        trainee = Trainee.query.get(self.trainee_id)

        return {
            "id": self.id,
            "date": self.date,
            "activity_per_trainer": activity_per_trainer.serialize() if activity_per_trainer else None,
            "trainer": trainer.serialize() if trainer else None,
            "trainee": trainee.serialize() if trainee else None,}




# class Favorites(db.Model): # For LAter !!
#     # Here we define columns for the table person
#     # Notice that each column is also a normal Python instance attribute.
#     id = db.Column(db.Integer, primary_key=True)
#     # username = db.Column(db.String(250), nullable=False)
#     user_id = db.Column(db.String(250), db.ForeignKey('user.id'))
#     user = db.relationship(User)
#     fav_trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     trainer = db.relationship(Trainer)
  
# class Availability(db.Model): # For LAter !!
#     id = db.Column(db.Integer, primary_key=True)
#     trainer_id = db.Column(db.String(250), nullable=False)
      
#     day = db.Column(db.time(250), db.ForeignKey('user.id'))
#     from = time db.relationship(User)
#     to = time db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     peoples = integer   this is a relationship witht the trainee.   db.relationship(Trainer)
  

