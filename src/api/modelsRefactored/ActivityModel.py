from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class ActivityModel(db.Model):
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
