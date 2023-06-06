import os
from flask import Flask, request, jsonify, url_for, Blueprint, json, make_response
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User, Trainer, ActivityPerTrainer, Trainee, Activity
from datetime import datetime
from dateutil import parser
import cloudinary
import cloudinary.uploader

from .routesRefactored.activity_routes import register_activity_route
from .services import activity_services as act

api = Blueprint('api', __name__)

possible_genders=["male", "female", "non-binary", "intersex", "transgender", ""]
possible_body_types=["endomorph", "mesomorph", "ectomorph", ""]
possible_fitness_experiences=["new_to_it", "getting_back", "currently_working_out","fitness_enthusiast", ""]
possible_goals=[ "lose_weight","get_toned", "increas_muscle_mass","improve_health", "improve_as_athlete",""]
possible_specialties=["running_performance", "functional_training", "postpartum_training","weight_loss","strength_development","metabolic_conditioning","injury_reduction","sports_performance","flexibility","metabolic_conditioning", ""]
possible_coaching_styles=["supportive", "laid_back", "results_oriented","motivating","high_energy", "calm", ""]
possible_experience_levels=["expert", "beginner", "professional", "medium", ""]




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
    profile_image_url = request.json.get("uploadedProfileImageUrl",None)

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
    # if experience_level not in possible_experience_levels: return jsonify({"msg": "The back-end won't accept this altered option- exp level"}), 404
    trainer_to_register.experience_level = experience_level
    trainer_to_register.approved = None
    trainer_to_register.city = city
    # if specialty not in possible_specialties: return jsonify({"msg": "The back-end won't accept this altered option-specialty"}), 404
    trainer_to_register.specialty = specialty
    # if coaching_style not in possible_coaching_styles: return jsonify({"msg": "The back-end won't accept this altered option- coaching style"}), 404
    trainer_to_register.coaching_style = coaching_style
    trainer_to_register.profile_image_url= profile_image_url
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
    
@api.route('/register/activity', methods=['POST'])
@jwt_required()
def register_class():
    data = request.json
    # data = json.loads(request.data)
    new_class = act.register_activity_services(data)

    return make_response(jsonify(new_class), 200)

@api.route('/all_activities', methods=['GET'])
def get_all_activities():
    all_activities = act.get_all_activities_services()
    return make_response(jsonify(all_activities), 200)


@api.route('/activity/<activity_id>', methods=['GET']) 
def get_given_activity(activity_id):
    data = act.get_given_activity_services(activity_id)
    return make_response(jsonify(data), 200)

    

@api.route('/edit/activity/<activity_id>', methods=['PUT'])
@jwt_required()
def edit_activity(activity_id):
    data=request.json
    print("333", data)
    edited_class = act.update_activity_services(data,activity_id)
    
    # return jsonify(edited_class)
    return make_response(jsonify(edited_class), 200)


@api.route('/activity/<activity_id>', methods=['DELETE']) 
@jwt_required()
def deleteClass(activity_id):
    delete_class = act.delete_activity_services(activity_id)
    return jsonify(delete_class),200


@api.route('/book_class', methods=['PUT'])
@jwt_required()
def book_class():
    data = request.json
    booked_class = act.book_class_services(data)
    return jsonify(booked_class),200
    # return make_response(jsonify(classes), 200)



@api.route('/unbook_class', methods=['PUT'])
@jwt_required()
def unbook_class():
    data = request.json
    unbooked_class = act.unbook_class_services(data)
    return jsonify({"respBody": unbooked_class}), 200


    




@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    user = User.query.filter_by(email = email,password = password).first()
    if not user: return jsonify({"msg": "Wrong email or password, if you don't have an account please Register First"}), 401
    access_token = create_access_token(identity=email)
    

    return jsonify(access_token=access_token, email=email)

@api.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    email_provided = get_jwt_identity()

    user = User.query.filter_by(email = email_provided).first()
    serializedUser = user.serialize()
    

    return jsonify(user=serializedUser), 200

@api.route('/byebye', methods=['GET'])
# @jwt_required()
def thing():
    body = act.think()
    return body

@api.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    user_email = get_jwt_identity()
    db_email = User.query.filter_by(email = user_email)
    user = db_email.serialize()
    # data = [user.serialize() for user in db_email]
    return jsonify(user)
    # return jsonify(data)



@api.route('/all_types_activities', methods=['GET'])
# @jwt_required()
def get_all_types_activities():
    # trainers = User.query.filter_by(email = "email1")
    # trainers = User.query.filter(User.user_role.name == "Trainer")
    # trainers = User.query.filter(User.user_role.has(name="Trainer"))
    allTypesActivities = Activity.query.all()

    data = [{"name": activity.name, "id": activity.id} for activity in allTypesActivities]
    print("222222222m I am the data after serialization for all activities",data)
    return jsonify(data)

# For one individual trainer profile. Upper part of detailTrainer.
@api.route('/trainer/<trainer_id>', methods=['GET']) 
@jwt_required()
def getGivenTrainer(trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()
    data_trainer = trainer.serialize()
    trainer_in_user = User.query.filter_by(id = data_trainer["user_id"]).first()
    data_user = trainer_in_user.serialize()
    # combined_dictionary = {
    # "dataTrainer": data_trainer,
    # "dataUser": data_user
    # }
    
    # trainers = User.query.filter_by(role = "trainer")
    # data = [activity_per_trainer.serialize() for given_class in activity_per_trainer]
    return jsonify(data_user)
    # return jsonify(data)

@api.route('/trainee/<trainee_id>', methods=['GET']) 
@jwt_required()
def getGivenTrainee(trainee_id):
    trainee = Trainee.query.filter_by(id = trainee_id).first()
    data = trainee.serialize() if trainee else None

    trainee_in_user = User.query.filter_by(id = data["user_id"]).first()
    data_user = trainee_in_user.serialize() if trainee_in_user else None

    return jsonify(data_user)





@api.route('/edit/trainee/<trainee_id>', methods=['PUT'])
@jwt_required()
def edit_trainee(trainee_id):
    trainee = Trainee.query.filter_by(id = trainee_id).first()
    if trainee is None: 
        return  jsonify({"respBody": None}), 400
    trainee_to_edit = trainee.serialize()
    user = User.query.filter_by(id=trainee_to_edit["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    
    email = request.json.get("email",None)
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



    user.email= email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    user.gender= gender
    user.age= int(age)
    user.city= city
    user.first_name= first_name
    user.last_name= last_name
    user.height= height
    user.weight= weight

    db.session.commit()


    trainee.email = email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    trainee.gender = gender
    # if fitness_experience not in possible_fitness_experiences: return jsonify({"msg": "The back-end won't accept this altered option-fitness exp."}), 404
    trainee.fitness_experience = fitness_experience
    # if goal not in possible_goals: return jsonify({"msg": "The back-end won't accept this altered option-goal"}), 404
    trainee.goal = goal
    trainee.city = city
    # if body_type not in possible_body_types: return jsonify({"msg": "The back-end won't accept this altered option-body_type"}), 404
    trainee.body_type = body_type


    db.session.commit()
    resp_body = {
        "edited_user_trainee": User.query.filter(User.trainee.has(id = trainee_id)).first().serialize(),
    }
    return jsonify({"respBody": resp_body}), 200



@api.route('/edit/trainer/<trainer_id>', methods=['PUT'])
@jwt_required()
def edit_trainer(trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()
    if trainer is None: 
        return  jsonify({"respBody": None}), 400
    trainer_to_edit = trainer.serialize()
    user = User.query.filter_by(id=trainer_to_edit["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    user_to_edit = user.serialize()

    print(trainer_to_edit, "555trainer_to_edit")
    print(user_to_edit, "555user_to_edit")
    
    data = request.get_json()
    email = request.json.get("email",None)
    gender = request.json.get("gender",None)
    about = request.json.get("about",None)
    experience_level = request.json.get("experience_level",None)
    city = request.json.get("city",None)
    specialty = request.json.get("specialty",None)
    coaching_style = request.json.get("coaching_style",None)
    age = request.json.get("age",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)
    profile_image_url = request.json.get("uploadedProfileImageUrl",None)


    user.email = email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    user.gender = gender
    user.age = int(age)
    user.city = city
    user.first_name = first_name
    user.last_name = last_name
    user.height = height
    user.weight = weight

    db.session.commit()

    trainer.email = email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option - gender"}), 404
    trainer.gender = gender
    trainer.about = about
    # if experience_level not in possible_experience_levels: return jsonify({"msg": "The back-end won't accept this altered option- exp level"}), 404
    trainer.experience_level = experience_level
    trainer.approved = None
    trainer.city = city
    # if specialty not in possible_specialties: return jsonify({"msg": "The back-end won't accept this altered option-specialty"}), 404
    trainer.specialty = specialty
    # if coaching_style not in possible_coaching_styles: return jsonify({"msg": "The back-end won't accept this altered option- coaching style"}), 404
    trainer.coaching_style = coaching_style
    trainer.profile_image_url= profile_image_url



    db.session.commit()
    resp_body = {
        "edited_user_trainer": User.query.filter(User.trainer.has(id = trainer_id)).first().serialize(),
    }
    return jsonify({"respBody": resp_body}), 200


@api.route('/upload', methods=['POST'])
def handle_upload():

    data= cloudinary.uploader.upload(request.files['profile_image'])
    # cloudinary.uploader.upload(request.files['profile_image'], public_id=f'trainers_profile_image_folder/',width=450, height=450 )
    profile_image_url=data['secure_url']
    return jsonify({"profile_image_url" : profile_image_url}),200



