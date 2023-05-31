from repositories.UserRepository import UserRepository
from .models import UserModel

def get_user_by_id_services(id: int):
    UserRepository.get(self, activity_id)
    user = UserModel.query.filter_by(id = activity_id).first()
    data = user.serialize()
    return jsonify(data)

