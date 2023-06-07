
from ..models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

def create_token_services(data):
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email = email,password = password).first()
    if not user: return jsonify({"msg": "Wrong email or password, if you don't have an account please register first"}), 401
    access_token = create_access_token(identity=email)
    return access_token


def verify_token_services():
    email_provided = get_jwt_identity()
    user = User.query.filter_by(email = email_provided["email"]).first()
    if user is None:
        return "User not found",400
    serialized_user = user.serialize()
    return serialized_user
