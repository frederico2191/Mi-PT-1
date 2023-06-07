import AbstractRepository
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from .models import UserModel


class UserRepository(AbstractRepository.CRUService):
    def save(self,user_to_register):
        db.session.add(user_to_register)
        db.session.commit()
        print("New user was saved")
        return 200

    def get(self,user_id):
        resp_body = {
        "User Found" : self.query.filter_by(id = user_id).first()}
        return jsonify({"respBody": resp_body}), 200

    def update(self, user_id,data):
        db.session.commit()
        resp_body = {
        "User Edited" : self.query.filter_by(id = user_id).first()}
        return jsonify({"respBody": resp_body}), 200

