from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()


class ActivityCategoryModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    location_type = db.Column(db.String(250), nullable=True)
    activities_per_trainer = db.relationship('ActivityPerTrainer', backref='activity', lazy=True)

    def __repr__(self):
        return self.name
    
    def serialize(self):
        
        return {"name": self.name, "id": self.id, "activitiesPerTrainer": self.activities_per_trainer}
