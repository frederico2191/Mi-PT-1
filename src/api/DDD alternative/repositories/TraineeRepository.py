import AbstractRepository
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from .models import TraineeModel

db = SQLAlchemy()



class TraineeRepository(AbstractRepository.CRUService):
    def save(self,trainee_to_register):
        db.session.add(trainee_to_register)
        db.session.commit()
        print("trainee was saved")
        return 200

    def get(self,trainee_id):
        resp_body = {
        "Trainee Found" : self.query.filter_by(id = trainee_id).first()}
        return jsonify({"respBody": resp_body}), 200

    def update(self, trainee_id,data):
        db.session.commit()
        resp_body = {
        "Trainee Edited" : self.query.filter_by(id = trainee_id).first()}
        return jsonify({"respBody": resp_body}), 200


