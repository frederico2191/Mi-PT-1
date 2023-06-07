
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from ..models import ActivityModel
from .AbstractRepository import CRUDService

db = SQLAlchemy()

class ActivityRepository(CRUDService):
    def save(self,activity_to_register):
        db.session.add(activity_to_register)
        db.session.commit()
        print("activity was saved")
        return 200

    def get(self,activity_id):
        resp_body = {
        "Class Found" : self.query.filter_by(id = activity_id).first()}
        return jsonify({"respBody": resp_body}), 200

    def update(self,activity_id,data):
        db.session.commit()
        resp_body = {
        "Class Edited" : self.query.filter_by(id = activity_id).first()}
        return jsonify({"respBody": resp_body}), 200

    def delete(self,activity_to_delete):
        db.session.delete(activity_to_delete)
        db.session.commit()
        return jsonify("activity deleted."), 200






# class ActivityRepository(CRUDService):
#     def add(activity_to_register):
#         if AbstractRepository.add(activity_to_register) is not 200:
#             return 400;
#         return 200

#     def update(self,activity_to_update):
#         if AbstractRepository.update(activity_to_update) is not 200:
#             return 400
#         resp_body = {
#         "class just edited" = self.query.filter_by(id = class_id).first()
#     }
#     return jsonify({"respBody": resp_body}), 200




