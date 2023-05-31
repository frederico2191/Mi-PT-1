from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class UserModel(db.Model):
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
    trainer = db.relationship('Trainer', backref='user', uselist=False)

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
            "user_role": self.user_role,
            "activities": [activity.serialize() for activity in activities],
            "trainer": self.trainer.serialize() if self.trainer else None,
            "trainee": self.trainee.serialize() if self.trainee else None,
        }

atendencies = db.Table('atendencies',
    db.Column('activity_per_trainer_id', db.Integer, db.ForeignKey('activity_per_trainer.id'), primary_key=True),
    db.Column('trainee_id', db.Integer, db.ForeignKey('trainee.id'), primary_key=True)
)
