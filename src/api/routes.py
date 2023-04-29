import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User, Trainer, ActivityPerTrainer

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register_user():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    dbEmail = User.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = User()
    user_to_register.email= email
    user_to_register.password= password
    db.session.add(user_to_register)
    db.session.commit()
    data = user_to_register.serialize()
    
    return jsonify(data)

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    db_email = User.query.filter_by(email = email,password = password).first()
    if email != db_email.email:
        return jsonify({"msg": "Wrong email or password, if you don't have an account please Register First"}), 401
    access_token = create_access_token(identity=email)

    return jsonify(access_token=access_token)

@api.route('/hello_user', methods=['GET'])
@jwt_required()
def get_hello():
    email_provided = get_jwt_identity()
    helloDictionary = {
    "message": "Welcome " + email_provided 
    }
    return jsonify(helloDictionary)

#Get all trainers to render all the available trainers (initial rending of the)
@api.route('/trainers', methods=['GET'])
# @jwt_required()
def get_trainers():
    # trainers = User.query.filter_by(email = "email1")
    # trainers = User.query.filter(User.user_role.name == "Trainer")
    # trainers = User.query.filter(User.user_role.has(name="Trainer"))
    trainers = Trainer.query.all()

    data = [trainer.serialize() for trainer in trainers]
    print("I am the data after serialization for trainer",data)
    return jsonify(data)

# For one individual trainer profile. Upper part of detailTrainer.
@api.route('/trainer/<trainer_id>', methods=['GET']) 
@jwt_required()
def getGivenTrainer(trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()

    data = trainer.serialize()
    # trainers = User.query.filter_by(role = "trainer")
    # data = [activity_per_trainer.serialize() for given_class in activity_per_trainer]
    return jsonify(data)
    # return jsonify(data)



# For all the available classes from all the trainers! All activity per trainer table.
# @api.route('/activity_per_trainer/<trainer_id>', methods=['GET']) 
# @jwt_required()
# def getAllClasses(trainer_id):
#     activities = ActivityPerTrainer.query.filter_by(trainer_id= trainer_id)
#     print(activities, "activitieshuyjuy fsdanjfsnda")
#     # trainers = User.query.filter_by(role = "trainer")
#     data = [activity_per_trainer.serialize() for activity_per_trainer in activities]
#     # data = activity_per_trainer.serialize()
#     return jsonify(data)


# For all the available classes from all the trainers! All activity per trainer table.
@api.route('/activity_per_trainer', methods=['GET']) 
# @jwt_required()
def getAllClasses():
    activities = ActivityPerTrainer.query.all()
    data = [activity_per_trainer.serialize() for activity_per_trainer in activities]
    return jsonify(data)


# # For one individual class, that can be booked.
@api.route('/activity_per_trainer/<activity_per_trainer_id>', methods=['GET']) 
@jwt_required()
def getGivenClass(activity_per_trainer_id):
    activity_per_trainer = ActivityPerTrainer.query.filter_by(id = activity_per_trainer_id).first()

    data = activity_per_trainer.serialize()
   
    return jsonify(data)

# @api.route('/activity_per_trainer/<activity_per_trainer_id>', methods=['GET']) 
# @jwt_required()
# def getGivenClass(activity_per_trainer_id):
#     activity_per_trainer = ActivityPerTrainer.query.filter_by(id = activity_per_trainer_id).first()

#     data = activity_per_trainer.serialize()
   
#     return jsonify(data)



