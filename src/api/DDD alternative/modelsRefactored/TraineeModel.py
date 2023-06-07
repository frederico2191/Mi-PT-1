from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class TraineeModel(db.Model):
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