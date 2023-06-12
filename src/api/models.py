from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
# from sqlalchemy_utils import PasswordType
# import passlib

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    # password = db.Column(db.LargeBinary(1137), nullable=False)
    # db.String(250), nullable=False)
    # password = db.Column(
    #     PasswordType(
    #     schemes=[
    #         'pbkdf2_sha512',
    #         'md5_crypt'
    #     ],
    #     deprecated=['md5_crypt'],
    #     max_length=1137, nullable=False
    # )
    # )
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
    trainer = db.relationship('Trainer', backref='user', uselist=False)

    def __repr__(self):
        return self.first_name

    def serialize(self):
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
            "user_role": self.user_role,
            "activities": [activity.serialize() for activity in activities],
            "trainer": self.trainer.serialize() if self.trainer else None,
            "trainee": self.trainee.serialize() if self.trainee else None,
        }

class Trainee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body_type = db.Column(db.String(250), nullable=True)
    goal = db.Column(db.String(250), nullable=True)
    fitness_experience = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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
    about = db.Column(db.String(10000), nullable=True)
    experience_level = db.Column(db.String(250), nullable=True)
    bank_account = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    specialty = db.Column(db.String(250), nullable=True)
    coaching_style = db.Column(db.String(250), nullable=True)
    profile_image_url = db.Column(db.String(250), nullable=True)
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
            "user_id": self.user_id,
            "profile_image_url": self.profile_image_url
        }

class ActivityPerTrainer(db.Model):
# class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(10000), nullable=True)
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
    trainer_profile_image_url = db.Column(db.String(250), nullable=True)
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
            "activity_id": activity.id,
            "city": self.city,
            "lat": self.lat,
            "lng": self.lng,
            "address": self.address,
            "trainerName":self.trainer_name,
            "traineeName":self.trainee_name,
            "profile_image_url": self.trainer_profile_image_url
            
        }

class Activity(db.Model):
# class ActivityCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    location_type = db.Column(db.String(250), nullable=True)
    activities_per_trainer = db.relationship('ActivityPerTrainer', backref='activity', lazy=True)


    def __repr__(self):
        return self.name
    
    def serialize(self):
        
        return {"name": self.name, "id": self.id, "activitiesPerTrainer": self.activities_per_trainer}


