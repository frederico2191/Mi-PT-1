from flask import jsonify
from dateutil import parser
from ..models import db, ActivityPerTrainer, User
from datetime import datetime
from dateutil import parser


def register_activity_services(data):
    name = data["name"]
    description = data["description"]
    duration = data["duration"]
    address = data["address"]
    price = data["price"]
    eventDate = data["eventDate"]
    hour = data["hour"]
    minutes = data["minutes"]
    city = data["city"]
    trainer_id = data["trainerId"]
    trainer_name = data["trainerName"]
    lat = data["lat"]
    lng = data["lng"]
    profile_image_url = data["trainerProfileImageUrl"]
    datetime_object = parser.parse(eventDate) if eventDate else None

    activity_to_register = ActivityPerTrainer()
    activity_to_register.description= description
    activity_to_register.duration= duration
    activity_to_register.price= price
    activity_to_register.date= datetime_object
    activity_to_register.hour= hour 
    activity_to_register.minutes = minutes 
    activity_to_register.activity_id = name 
    activity_to_register.trainer_id = trainer_id
    activity_to_register.city = city
    activity_to_register.lat = lat
    activity_to_register.lng = lng
    activity_to_register.trainer_name = trainer_name
    activity_to_register.address = address
    activity_to_register.trainer_profile_image_url = profile_image_url
    body = activity_to_register.serialize()
   
    db.session.add(activity_to_register)
    db.session.commit()
    return body

def get_given_activity_services(activity_id):
    activity = ActivityPerTrainer.query.get(activity_id)
    data = activity.serialize()
   
    return data

def get_all_activities_services():
    todays_datetime = datetime(datetime.today().year, datetime.today().month, datetime.today().day)
    upcoming_activities = ActivityPerTrainer.query.filter(ActivityPerTrainer.date >= todays_datetime).all()
    data = [activity_per_trainer.serialize() for activity_per_trainer in upcoming_activities]

    if data is None:
        return "Error in services", 400
   
    return data

def update_activity_services(data,activity_id):
    name = data["name"]
    activity_category_id = data["activityCategoryId"]
    description = data["description"]
    duration = data["duration"]
    address = data["address"]
    price = data["price"]
    eventDate = data["eventDate"]
    hour = data["hour"]
    minutes = data["minutes"]
    city = data["city"]
    lat = data["lat"]
    lng = data["lng"]
    datetime_object = parser.parse(eventDate) if eventDate else None
    activity_to_update = ActivityPerTrainer.query.get(activity_id)
    if activity_to_update is None: 
        return  None
    
    serialized_activity_to_update = activity_to_update.serialize()
    activity_category = ActivityPerTrainer.query.get(activity_category_id)
    serialized_activity_category = activity_category.serialize() if activity_category else None
    activity_to_update.description= description
    activity_to_update.duration= duration
    activity_to_update.price= price
    activity_to_update.date= datetime_object 
    activity_to_update.hour= hour 
    activity_to_update.minutes = minutes
    activity_to_update.activity_id = serialized_activity_category["id"] if serialized_activity_category else serialized_activity_to_update["activity_id"]
    activity_to_update.city = city 
    activity_to_update.lat = lat 
    activity_to_update.lng = lng 
    activity_to_update.address = address 
    data = activity_to_update.serialize()
    db.session.add(activity_to_update)
    db.session.commit()

    return data


def delete_activity_services(activity_id):
    activity_to_delete= ActivityPerTrainer.query.get(activity_id)
    if activity_to_delete is None: 
        return  None
    db.session.delete(activity_to_delete)
    db.session.commit()
    body = "Class Sucessfully Deleted"
    return body


def book_class_services(data):
    activity_id = data['activity_id']
    trainee_id = data['trainee_id']
    trainee_name = data['trainee_name']
    activity = ActivityPerTrainer.query.get(activity_id)
    serialized_activity = activity.serialize() if activity else None
    activity.trainee_id = trainee_id
    activity.trainee_name = trainee_name
    db.session.commit()
    resp_body = {
        "trainee_name": User.query.filter(User.trainee.has(id = trainee_id)).first().first_name, }
    return resp_body

def unbook_class_services(data):
    activity_id = data['activity_id']
    activity = ActivityPerTrainer.query.get(activity_id)
    if activity is None: 
        return  {"resp_body": None}
    
    activity.trainee_id = None 
    activity.trainee_name = None
    db.session.commit()
    resp_body = {
        "activity_unbooked": ActivityPerTrainer.query.get(activity_id).serialize()
    }
    return resp_body
    
