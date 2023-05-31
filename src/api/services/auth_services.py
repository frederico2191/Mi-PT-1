from repositories.UserRepository import UserRepository
from .models import UserModel
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

def create_token_services():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    user = UserModel.query.filter_by(email = email,password = password).first()
    if not user: return jsonify({"msg": "Wrong email or password, if you don't have an account please Register First"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, email=email)


def verify_token_services():
    email_provided = get_jwt_identity()
    user = UserModel.query.filter_by(email = email_provided).first()
    serializedUser = user.serialize()
    return jsonify(user=serializedUser), 200
