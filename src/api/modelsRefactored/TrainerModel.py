from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class TrainerModel(db.Model):
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