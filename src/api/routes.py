import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User, Trainer, ActivityPerTrainer, Trainee, Activity, BookedClass
from datetime import datetime
from dateutil import parser

api = Blueprint('api', __name__)

possible_genders=["male", "female", "non-binary", "intersex", "transgender", ""]
possible_body_types=["endomorph", "mesomorph", "ectomorph", ""]
possible_fitness_experiences=["new_to_it", "getting_back", "currently_working_out","fitness_enthusiast", ""]
possible_goals=[ "lose_weight","get_toned", "increas_muscle_mass","improve_health", "improve_as_athlete",""]
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
@jwt_required()
def register_class():
    
    name = request.json.get("name",None)
    description = request.json.get("description",None)
    duration = request.json.get("duration",None)
    price = request.json.get("price",None)
    eventDate = request.json.get("eventDate",None)
    hour = request.json.get("hour",None)
    minutes = request.json.get("minutes",None)
    city = request.json.get("city",None)
    trainer_id = request.json.get("trainerId",None)
    trainer_name = request.json.get("trainerName",None)
    city = request.json.get("city",None)
    lat = request.json.get("lat",None)
    lng = request.json.get("lng",None)
    address = request.json.get("address",None)


    print("####4444444 T NAMEEE",trainer_name)
    datetime_object = parser.parse(eventDate) if eventDate else None
    # datetime_object = datetime.strptime(eventDate.split(".")[0].replace("T"," "), '%y-%m-%d %H:%M:%S')




    class_to_register = ActivityPerTrainer()
    class_to_register.description= description
    class_to_register.duration= duration
    class_to_register.price= price
    class_to_register.date= datetime_object #dt.parse(eventDate) # datetime
    class_to_register.hour= hour # HH
    class_to_register.minutes = minutes # mm
    class_to_register.activity_id = name # mm
    class_to_register.trainer_id = trainer_id # mm
    class_to_register.city = city["name"] if city else None # mm
    class_to_register.lat = lat # mm
    class_to_register.lng = lng # mm
    class_to_register.trainer_name = trainer_name # mm
    class_to_register.address = address # mm
    

    db.session.add(class_to_register)
    db.session.commit()
    data = class_to_register.serialize()
    
    return jsonify(data)



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
    

    return jsonify(user=serializedUser)

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
    combined_dictionary = {
    "dataTrainer": data_trainer,
    "dataUser": data_user
    }
    
    # trainers = User.query.filter_by(role = "trainer")
    # data = [activity_per_trainer.serialize() for given_class in activity_per_trainer]
    return jsonify(combined_dictionary)
    # return jsonify(data)

@api.route('/trainee/<trainee_id>', methods=['GET']) 
@jwt_required()
def getGivenTrainee(trainee_id):
    trainee = Trainee.query.filter_by(id = trainee_id).first()
    data = trainee.serialize() if trainee else None

    trainee_in_user = User.query.filter_by(id = data["user_id"]).first()
    data_user = trainee_in_user.serialize() if trainee_in_user else None

    return jsonify(data_user)

@api.route('/activity/<activity_id>', methods=['DELETE']) 
@jwt_required()
def deleteClass(activity_id):
    activity_to_delete= ActivityPerTrainer.query.filter_by(id = activity_id).first()
    db.session.delete(activity_to_delete)
    db.session.commit()
    
    return jsonify()

# @api.route('/bookedclass/<bookedclass_id>', methods=['DELETE']) 
# @jwt_required()
# def deleteClass(bookedclass_id):
#     booked_class_to_delete= BookedClass.query.filter_by(id = bookedclass_id).first()
#     db.session.delete(booked_class_to_delete)
#     db.session.commit()
    
#     return jsonify()



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
    # activities = ActivityPerTrainer.query.all()
    # data = [activity_per_trainer.serialize() for activity_per_trainer in activities]

    todays_datetime = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
    upcoming_activities = ActivityPerTrainer.query.filter(ActivityPerTrainer.date >= todays_datetime).all()
    data = [activity_per_trainer.serialize() for activity_per_trainer in upcoming_activities]
    # payments = Payment.query.filter(Payment.due_date >= todays_datetime).all()
    # data_future = data.filter_by(activity_per_trainer_date> date.now())

    return jsonify(data)



@api.route('/classes', methods=['GET'])
@jwt_required()
def get_classes():
    # Query the database for all ActivityPerTrainer instances
    classes = ActivityPerTrainer.query.all()

    # Serialize the data for the response
    classes_data = [c.serialize() for c in classes]

    # Return the data as JSON
    return jsonify(classes_data), 200


# # For one individual class, that can be booked.
@api.route('/activity_per_trainer/<activity_per_trainer_id>', methods=['GET']) 
@jwt_required()
def getGivenClass(activity_per_trainer_id):
    activity_per_trainer = ActivityPerTrainer.query.filter_by(id = activity_per_trainer_id).first()

    data = activity_per_trainer.serialize()
   
    return jsonify(data)

@api.route('/book_class', methods=['PUT'])
@jwt_required()
def book_class():
    data = request.get_json()
    activity_per_trainer_id = data.get('id')
    trainee_id = data.get('trainee_id')
    trainee_name = data.get('trainee_name')
    # user_id = data.get('user_id')

    # activity_per_trainer = ActivityPerTrainer.query.get(activity_per_trainer_id)
    activity_per_trainer = ActivityPerTrainer.query.filter_by(id = activity_per_trainer_id).first()
    # print(activity_per_trainer.serialize(),"$$$888888888888888")
    # activity_per_trainer = activity_per_trainer.serialize()
    # aux = ...activities_per_trainer.trainee_name
    activity_per_trainer.trainee_id = trainee_id
    # activity_per_trainer.trainee_name = [...activities_per_trainer.trainee_name, trainee_name]
    # activity_per_trainer.trainee_name = trainee_name if activity_per_trainer.trainee_id is None else return
    activity_per_trainer.trainee_name = trainee_name

    # trainee = Trainee.query.get(trainee_id)

    # if not trainee or not activity_per_trainer:
    #     return jsonify({'error': 'Invalid trainee or activity_per_trainer ID.'}), 400

    
    existing_booking = BookedClass.query.filter_by(activity_per_trainer_id=activity_per_trainer_id).first()
    if existing_booking:
        return jsonify({'error': 'Class already booked.'}), 400


    # new_booking = BookedClass(
    #     date=datetime.now(),
    #     activity_per_trainer_id=activity_per_trainer_id,
    #     trainer_id=activity_per_trainer.trainer_id,
    #     trainee_id=trainee_id,
    
    # db.session.add(activity_per_trainer)
    db.session.commit()
    resp_body = {
        "trainee_name": User.query.filter(User.trainee.has(id = trainee_id)).first().first_name,
    }
    return jsonify({"respBody": resp_body}), 200


# @api.route('/activity_per_trainer/<activity_per_trainer_id>', methods=['GET']) 
# @jwt_required()
# def getGivenClass(activity_per_trainer_id):
#     activity_per_trainer = ActivityPerTrainer.query.filter_by(id = activity_per_trainer_id).first()

#     data = activity_per_trainer.serialize()
   
#     return jsonify(data)
