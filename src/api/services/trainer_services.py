from ..models import User,Trainer,db


def register_trainer_services():
    email = data["email"]
    password = data["password"]
    gender = data["gender"]
    about = data["about"]
    experience_level = data["experience_level"]
    approved = data["approved"]
    city = data["city"]
    specialty = data["specialty"]
    coaching_style = data["coaching_style"]
    age = data["age"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    height = data["height"]
    weight = data["weight"]
    profile_image_url = data["uploadedProfileImageUrl"]

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
    user_to_register.user_role= "trainer"

    db.session.add(user_to_register)
    db.session.commit()
    user_data = user_to_register.serialize()

    trainer_to_register = Trainer()
    trainer_to_register.email = email
    trainer_to_register.password = password
    trainer_to_register.gender = gender
    trainer_to_register.about = about
    trainer_to_register.experience_level = experience_level
    trainer_to_register.approved = None
    trainer_to_register.city = city
    trainer_to_register.specialty = specialty
    trainer_to_register.coaching_style = coaching_style
    if profile_image_url: trainer_to_register.profile_image_url= profile_image_url
    trainer_to_register.user_id = data["id"]

    db.session.add(trainer_to_register)
    db.session.commit()
    new_trainee = trainer_to_register.serialize()
    
    return new_trainer


def get_given_trainer_services(trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()
    data = trainer.serialize() if trainer else None
    trainer_in_user = User.query.filter_by(id = data["user_id"]).first()
    data_user = trainer_in_user.serialize() if trainer_in_user else None
    return data_user
    
    
    return jsonify(data_user)

    return jsonify(data_user)

def edit_trainer_services(data,trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()
    if trainer is None: 
        return  jsonify({"respBody": None}), 400
    trainer_to_update = trainer.serialize()
    user = User.query.filter_by(id=trainer_to_update["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    user_to_edit = user.serialize()

    
    email = data["email"]
    gender = data["gender"]
    about = data["about"]
    experience_level = data["experience_level"]
    city = data["city"]
    specialty = data["specialty"]
    coaching_style = data["coaching_style"]
    age = data["age"]
    first_name = data["first_name"]
    last_name = data["last_name"]
    height = data["height"]
    weight = data["weight"]
    profile_image_url = data["uploadedProfileImageUrl"] or trainer_to_update["profile_image_url"]

    user.email= email
    user.gender= gender
    user.age= int(age)
    user.city= city
    user.first_name= first_name
    user.last_name= last_name
    user.height= height
    user.weight= weight

    db.session.commit()

    trainer.email = email
    trainer.gender = gender
    trainer.about = about
    trainer.experience_level = experience_level
    trainer.approved = None
    trainer.city = city
    trainer.specialty = specialty
    trainer.coaching_style = coaching_style
    trainer.profile_image_url = profile_image_url

    db.session.commit()

    return User.query.filter(User.trainer.has(id = trainer_id)).first().serialize(),


