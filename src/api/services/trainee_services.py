from ..models import User,Trainee,db

def register_trainee_services(data):
    email = data["email"]
    password = data["password"]
    gender = data["gender"]
    city = data["city"]
    age = data["age"]
    fitness_experience = data["fitness_experience"]
    goal = data["goal"]
    body_type = data["body_type"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    height = data["height"]
    weight = data["weight"]
    dbEmail = User.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = User()
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

    db.session.add(user_to_register)
    db.session.commit()
    user_data = user_to_register.serialize()

    trainee_to_register = TraineeModel()
    trainee_to_register.email = email
    trainee_to_register.password = password
    trainee_to_register.gender = gender
    trainee_to_register.fitness_experience = fitness_experience
    trainee_to_register.goal = goal
    trainee_to_register.city = city
    trainee_to_register.body_type = body_type
    trainee_to_register.user_id = user_data["id"]

    db.session.add(trainee_to_register)
    db.session.commit()
    new_trainee = trainee_to_register.serialize()
    return jsonify(new_trainee)


def get_given_trainee_services(trainee_id):
    trainee = Trainee.query.filter_by(id = trainee_id).first()
    data = trainee.serialize() if trainee else None
    trainee_in_user = User.query.filter_by(id = data["user_id"]).first()
    data_user = trainee_in_user.serialize() if trainee_in_user else None
    return data_user


def edit_trainee_services(data,trainee_id):
    trainee = Trainee.query.filter_by(id = trainee_id).first()
    if trainee is None: 
        return  jsonify({"respBody": None}), 400
    user = User.query.filter_by(id=trainee_to_edit["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    
    email = data["email"]
    gender = data["gender"]
    city = data["city"]
    age = data["age"]
    fitness_experience = data["fitness_experience"]
    goal = data["goal"]
    body_type = data["body_type"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    height = data["height"]
    weight = data["weight"]

    user.email= email
    user.gender= gender
    user.age= int(age)
    user.city= city
    user.first_name= first_name
    user.last_name= last_name
    user.height= height
    user.weight= weight

    db.session.commit()

    trainee.email = email
    trainee.gender = gender
    trainee.fitness_experience = fitness_experience
    trainee.goal = goal
    trainee.city = city
    trainee.body_type = body_type

    db.session.commit()
   
    return UserModel.query.filter(User.trainee.has(id = trainee_id)).first().serialize()




