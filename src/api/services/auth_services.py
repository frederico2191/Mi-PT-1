
from ..models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import bcrypt

def create_token_services(data):
    email = data["email"]
    password = data["password"].encode("utf-8")
    user = User.query.filter_by(email=email).first()
    password_hashed = user.password.encode("utf-8")
    # password_hashed = user.password
    print("password_hashed 6645",password_hashed)

    if bcrypt.checkpw(password, password_hashed):
        access_token = create_access_token(identity=email)
    else: jsonify({"msg": "Wrong email or password, if you don't have an account please register first"}), 401

    # if not user: return jsonify({"msg": "Wrong email or password, if you don't have an account please register first"}), 401
    # access_token = create_access_token(identity=email)
    return access_token


def verify_token_services():
    email_provided = get_jwt_identity()
    print("email_provided",email_provided)
    user = User.query.filter_by(email = email_provided).first()
    if user is None:
        return "User not found",400
    serialized_user = user.serialize()
    return serialized_user
