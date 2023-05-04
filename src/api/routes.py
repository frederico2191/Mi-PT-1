import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User, Trainer, ActivityPerTrainer, Trainee, Activity

api = Blueprint('api', __name__)

possible_genders=["male", "female", "non-binary", "intersex", "transgender", ""]
possible_body_types=["endomorph", "mesomorph", "ectomorph", ""]
possible_fitness_experiences=["new_to_it", "getting_back", "currently_working_out","fitness_enthusiast", ""]
possible_goals=[ "loose_weight","get_toned", "increas_muscle_mass","improve_health", "improve_as_athlete",""]
possible_specialties=["running_performance", "functional_training", "postpartum_training","weight_loss","strength_development","metabolic_conditioning","injury_reduction","sports_performance","flexibility","metabolic_conditioning", ""]
possible_coaching_styles=["supportive", "laid_back", "results_oriented","motivating","high_energy", "calm", ""]
# possible_indoor_outdoor_remote=["indoor", "outdoor", "remote"]
possible_experience_levels=["expert", "beginner", "professional", "medium", ""]



# @api.route('/register', methods=['POST'])
# def register_user():
#     email = request.json.get("email",None)
#     password = request.json.get("password",None)
#     dbEmail = User.query.filter_by(email = email).first()
#     if dbEmail:
#         return jsonify({"msg": "User already exists!"}), 401

#     user_to_register = User()
#     user_to_register.email= email
#     user_to_register.password= password
#     db.session.add(user_to_register)
#     db.session.commit()
#     data = user_to_register.serialize()
    
#     return jsonify(data)

@api.route('/register/trainer', methods=['POST'])
def register_trainer():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    gender = request.json.get("gender",None)
    about = request.json.get("about",None)
    experience_level = request.json.get("experience_level",None)
    approved = request.json.get("approved",None)
    city = request.json.get("city",None)
    specialty = request.json.get("specialty",None)
    coaching_style = request.json.get("coaching_style",None)
    age = request.json.get("age",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)

    dbEmail = User.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = User()
    user_to_register.email= email
    user_to_register.password= password
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option - gender"}), 404
    user_to_register.gender= gender
    user_to_register.age= int(age)
    user_to_register.city= city
    user_to_register.first_name= first_name
    user_to_register.last_name= last_name
    user_to_register.height= height
    user_to_register.weight= weight
    user_to_register.user_role= "trainer"
    db.session.add(user_to_register)
    db.session.commit()
    data = user_to_register.serialize()

    trainer_to_register = Trainer()
    trainer_to_register.email = email
    trainer_to_register.password = password
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option - gender"}), 404
    trainer_to_register.gender = gender
    trainer_to_register.about = about
    if experience_level not in possible_experience_levels: return jsonify({"msg": "The back-end won't accept this altered option- exp level"}), 404
    trainer_to_register.experience_level = experience_level
    trainer_to_register.approved = None
    trainer_to_register.city = city
    if specialty not in possible_specialties: return jsonify({"msg": "The back-end won't accept this altered option-specialty"}), 404
    trainer_to_register.specialty = specialty
    if coaching_style not in possible_coaching_styles: return jsonify({"msg": "The back-end won't accept this altered option- coaching style"}), 404
    trainer_to_register.coaching_style = coaching_style
    trainer_to_register.user_id = data["id"]

    db.session.add(trainer_to_register)
    db.session.commit()
    new_trainer = trainer_to_register.serialize()
    
    return jsonify(new_trainer)

@api.route('/register/trainee', methods=['POST'])
def register_trainee():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    gender = request.json.get("gender",None)
    city = request.json.get("city",None)
    age = request.json.get("age",None)
    fitness_experience = request.json.get("fitness_experience",None)
    goal = request.json.get("goal",None)
    body_type = request.json.get("body_type",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)

    dbEmail = User.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = User()
    user_to_register.email= email
    user_to_register.password= password
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    user_to_register.gender= gender
    user_to_register.age= int(age)
    user_to_register.city= city
    user_to_register.first_name= first_name
    user_to_register.last_name= last_name
    user_to_register.height= height
    user_to_register.weight= weight
    user_to_register.user_role= "trainee"
    db.session.add(user_to_register)
    db.session.commit()
    data = user_to_register.serialize()

    trainee_to_register = Trainee()
    trainee_to_register.email = email
    trainee_to_register.password = password
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    trainee_to_register.gender = gender
    if fitness_experience not in possible_fitness_experiences: return jsonify({"msg": "The back-end won't accept this altered option-fitness exp."}), 404
    trainee_to_register.fitness_experience = fitness_experience
    if goal not in possible_goals: return jsonify({"msg": "The back-end won't accept this altered option-goal"}), 404
    trainee_to_register.goal = goal
    trainee_to_register.city = city
    if body_type not in possible_body_types: return jsonify({"msg": "The back-end won't accept this altered option-body_type"}), 404
    trainee_to_register.body_type = body_type
    trainee_to_register.user_id = data["id"]
    db.session.add(trainee_to_register)
    db.session.commit()
    new_trainee = trainee_to_register.serialize()

    # trainee_role_to_register = UserRole()
    # elm = UserRole.query.filter_by(id = data["id"]).first()
    # role_data = []
    # if elm: role_data = elm.serialize()
    # print(elm, "elm DATA!!!")
    # print(role_data, "ROLE DATA!!!")
    # # role_data.name = "trainee"
    # # # trainee_role_to_register.name = "trainee"
    # # db.session.add(role_data)
    # # db.session.commit()
    
    return jsonify(new_trainee)


@api.route('/register/class', methods=['POST'])
def register_class():
    
    description = request.json.get("description",None)
    duration = request.json.get("duration",None)
    price = request.json.get("price",None)
    name = request.json.get("name",None)

    class_to_register = ActivityPerTrainer()
    class_to_register.description= description
    class_to_register.duration= duration
    class_to_register.price= price
    db.session.add(class_to_register)
    db.session.commit()
    data = class_to_register.serialize()

    activity_to_register = Activity()
    activity_to_register.name = name
    db.session.add(activity_to_register)
    db.session.commit()

    
    return jsonify(data)



@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    db_email = User.query.filter_by(email = email,password = password).first()
    if email != db_email.email: return jsonify({"msg": "Wrong email or password, if you don't have an account please Register First"}), 401
    access_token = create_access_token(identity=email)
    user = db_email.serialize()
    

    return jsonify(access_token=access_token, email=email, user=user)

@api.route('/hello_user', methods=['GET'])
@jwt_required()
def get_hello():
    email_provided = get_jwt_identity()
    helloDictionary = {
    "message": "Welcome " + email_provided 
    }
    return jsonify(helloDictionary)

@api.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    db_email = User.query.filter_by(email = user_email)
    user = db_email.serialize()
    
    return jsonify(user)

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



