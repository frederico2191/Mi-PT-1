import os
from flask import Flask, request, jsonify, url_for, Blueprint, json, make_response
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required
from .models import db, User, Trainer, ActivityPerTrainer, Trainee, Activity
import cloudinary
import cloudinary.uploader
from .services import activity_services
from .services import activity_category_services
from .services import auth_services
from .services import trainee_services
from .services import trainer_services

api = Blueprint('api', __name__)

@api.route('/token', methods=['POST'])
def create_token():
    data = request.json
    email = request.json.get("email",None)
    body = auth_services.create_token_services(data)
    return jsonify(access_token= body, email=email),200

@api.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    user = auth_services.verify_token_services()
    return jsonify(user=user), 200


@api.route('/register/activity', methods=['POST'])
@jwt_required()
def register_class():
    data = request.json
    # data = json.loads(request.data)
    new_class = activity_services.register_activity_services(data)
    return make_response(jsonify(new_class), 200)

@api.route('/all_activities', methods=['GET'])
def get_all_activities():
    all_activities = activity_services.get_all_activities_services()
    return make_response(jsonify(all_activities), 200)

@api.route('/activity/<activity_id>', methods=['GET']) 
def get_given_activity(activity_id):
    data = activity_services.get_given_activity_services(activity_id)
    return make_response(jsonify(data), 200)

@api.route('/edit/activity/<activity_id>', methods=['PUT'])
@jwt_required()
def edit_activity(activity_id):
    data=request.json
    edited_class = activity_services.update_activity_services(data,activity_id)
    return make_response(jsonify(edited_class), 200)

@api.route('/activity/<activity_id>', methods=['DELETE']) 
@jwt_required()
def deleteClass(activity_id):
    delete_class = activity_services.delete_activity_services(activity_id)
    return jsonify(delete_class),200

@api.route('/book_class', methods=['PUT'])
@jwt_required()
def book_class():
    data = request.json
    booked_class = activity_services.book_class_services(data)
    return jsonify(booked_class),200

@api.route('/unbook_class', methods=['PUT'])
@jwt_required()
def unbook_class():
    data = request.json
    unbooked_class = activity_services.unbook_class_services(data)
    return jsonify({"respBody": unbooked_class}), 200

@api.route('/all_types_activities', methods=['GET'])
def get_all_types_activities():
    body = activity_category_services.get_all_activity_category_services()
    return make_response(jsonify(body), 200)

@api.route('/register/trainee', methods=['POST'])
def register_trainee():
   data = request.json
   print("888 data", data)
   new_trainee = trainee_services.register_trainee_services(data)
   return jsonify(new_trainee), 200

@api.route('/trainee/<trainee_id>', methods=['GET'])
def get_given_trainee(trainee_id):
    data = trainee_services.get_given_trainee_services(trainee_id)
    return make_response(jsonify(data), 200)

@api.route('/edit/trainee/<trainee_id>', methods=['PUT'])
@jwt_required()
def edit_trainee(trainee_id):
    data=request.json
    edited_trainee = trainee_services.edit_trainee_services(data,trainee_id)
    return make_response(jsonify(edited_trainee), 200)

@api.route('/register/trainer', methods=['POST'])
def register_trainer():
    data = request.json
    new_trainer = trainer_services.register_trainer_services(data)
    return jsonify(new_trainer)

@api.route('/trainer/<trainer_id>', methods=['GET']) 
@jwt_required()
def getGivenTrainer(trainer_id):
    data = trainer_services.get_given_trainer_services(trainer_id)
    return make_response(jsonify(data), 200)

@api.route('/edit/trainer/<trainer_id>', methods=['PUT'])
@jwt_required()
def edit_trainer(trainer_id):
    data=request.json
    edited_trainer = trainer_services.edit_trainer_services(data,trainer_id)
    return make_response(jsonify(edited_trainer), 200)

@api.route('/upload', methods=['POST'])
def handle_upload():
    data= cloudinary.uploader.upload(request.files['profile_image'])
    profile_image_url=data['secure_url']
    return jsonify({"profile_image_url" : profile_image_url}),200



