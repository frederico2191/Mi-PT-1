import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

@api.route('/token', methods=['POST'])
def create_token():
    # email = request.json.get("email",None)
    # password = request.json.get("password",None)
    email = "test EMAIL"
    password = 1234
    if email != "test" or password != "test": #Query to the DATA BASE!!!
        return jsonify({"msg": "Bad email or password"}), 401

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
    "message": "Welcome Voludo"
    }
    return jsonify(helloDictionary)

@api.route('/users', methods=['GET'])
# @jwt_required()
def get_users():
    users = User.query.all()
    print(users, "We are the users cqueried")

    return jsonify(users)


