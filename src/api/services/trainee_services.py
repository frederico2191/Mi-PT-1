from repositories.TraineeRepository import TraineeRepository
from repositories.UserRepository import UserRepository
from .models import TraineeModel, UserModel

def register_trainee_services(request):
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    gender = request.json.get("gender",None)
    city = request.json.get("city",None)
    age = request.json.get("age",None)
    fitness_experience = request.json.get("fitness_experience",None)
    goal = request.json.get("goal",None)
    body_type = request.json.get("body_type",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)

    dbEmail = UserModel.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = UserModel()
    user_to_register.email= email
    user_to_register.password= password
    user_to_register.gender= gender
    user_to_register.age= int(age)
    user_to_register.city= city
    user_to_register.first_name= first_name
    user_to_register.last_name= last_name
    user_to_register.height= height
    user_to_register.weight= weight
    user_to_register.user_role= "trainee"

    user_repository = UserRepository()
    user_repository.save(user_to_register)
    data = user_to_register.serialize()

    trainee_to_register = TraineeModel()
    trainee_to_register.email = email
    trainee_to_register.password = password
    trainee_to_register.gender = gender
    trainee_to_register.fitness_experience = fitness_experience
    trainee_to_register.goal = goal
    trainee_to_register.city = city
    trainee_to_register.body_type = body_type
    trainee_to_register.user_id = data["id"]

    trainee_repository = TraineeRepository()
    trainee_repository.save(trainee_to_register)

    new_trainee = trainee_to_register.serialize()
    return jsonify(new_trainee)



def get_given_trainee_services(trainee_id):
    trainee = TraineeModel.query.filter_by(id = trainee_id).first()
    data = trainee.serialize() if trainee else None

    trainee_in_user = UserModel.query.filter_by(id = data["user_id"]).first()
    data_user = trainee_in_user.serialize() if trainee_in_user else None

    return jsonify(data_user)


def edit_trainee_services(trainee_id):
    trainee = TraineeModel.query.filter_by(id = trainee_id).first()
    if trainee is None: 
        return  jsonify({"respBody": None}), 400
    trainee_to_edit = trainee.serialize()
    user = UserModel.query.filter_by(id=trainee_to_edit["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    
    email = request.json.get("email",None)
    gender = request.json.get("gender",None)
    city = request.json.get("city",None)
    age = request.json.get("age",None)
    fitness_experience = request.json.get("fitness_experience",None)
    goal = request.json.get("goal",None)
    body_type = request.json.get("body_type",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)



    user_to_update.email= email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option-gender"}), 404
    user_to_update.gender= gender
    user_to_update.age= int(age)
    user_to_update.city= city
    user_to_update.first_name= first_name
    user_to_update.last_name= last_name
    user_to_update.height= height
    user_to_update.weight= weight

    user_repository = UserRepository()
    user_repository.save(user_to_update)
    data = user_to_update.serialize()

    trainee_to_update.email = email
    trainee_to_update.gender = gender
    trainee_to_update.fitness_experience = fitness_experience
    trainee_to_update.goal = goal
    trainee_to_update.city = city
    trainee_to_update.body_type = body_type

    trainee_repository = TraineeRepository()
    trainee_repository.update(trainee_id, {data:trainee_to_update})
   
    resp_body = {
        "edited_user_trainee": UserModel.query.filter(User.trainee.has(id = trainee_id)).first().serialize(),
    }
    return jsonify({"respBody": resp_body}), 200




