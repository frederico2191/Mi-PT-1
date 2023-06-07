import AbstractRepository
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from .models import TrainerModel


class TrainerRepository(AbstractRepository.CRUService):
    def save(self,trainer_to_register):
        db.session.add(trainer_to_register)
        db.session.commit()
        print("trainer was saved")
        return 200

    def get(self,trainer_id):
        resp_body = {
        "Trainer Found" : self.query.filter_by(id = trainer_id).first()}
        return jsonify({"respBody": resp_body}), 200

    def update(self, trainer_id,data):
        db.session.commit()
        resp_body = {
        "Trainer Edited" : self.query.filter_by(id = trainer_id).first()}
        return jsonify({"respBody": resp_body}), 200