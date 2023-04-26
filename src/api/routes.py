import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from .models import db, User

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
    db_email = User.query.filter_by(email = email).first()
    if email != db_email.email:
        return jsonify({"msg": "Please Register First"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route('/token', methods=['POST'])
def login_user():
    body= request.json
    user = User.query.filter_by(email = body["email"], password = body["password"]).first()
    if user:
        return jsonify()
    

    return jsonify(access_token=access_token)


@api.route('/hello_user', methods=['GET'])
# @jwt_required()
def get_hello():
    # email_provided = get_jwt_identity()
    helloDictionary = {
    "message": "Welcome Boludo"
    }
    return jsonify(helloDictionary)

@api.route('/users', methods=['GET'])
# @jwt_required()
def get_users():
    users = User.query.all()
    print(users, "we are usersss!!")
    data = [user.serialize() for user in users]
    
    return jsonify(data)


@api.route('/trainers', methods=['GET'])
# @jwt_required()
def get_trainers():
    trainers = User.query.filter_by(email = "email1")
    # trainers = User.query.filter_by(role = "trainer")
    data = [user.serialize() for user in trainers]
    print("I am the data after serialization for trainer",data)
    return jsonify(data)


@api.route('/register', methods=['GET'])
# @jwt_required()
def register():
    trainers = User.query.filter_by(email = "email1")
    # trainers = User.query.filter_by(role = "trainer")
    data = [user.serialize() for user in trainers]
    print("I am the data after serialization for trainer",data)
    return jsonify(data)


