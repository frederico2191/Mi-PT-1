from flask_bcrypt import generate_password_hash
from ..models import User,Trainer,db
import bcrypt


def register_trainer_services(data):
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
    profile_image_url = data["uploadedProfileImageUrl"]
    password = data["password"].encode("utf-8")
    # password_encoded = bytes(password, encoding='utf-8')
    # password_encoded_two = password.encode("utf-8")
    # password_encoded_three = password.encode("utf-8")
    # pw_hash = bcrypt.generate_password_hash(data["password"])
    # print("pw_hash",pw_hash)
    # pw_hash_three = bcrypt.hashpw(password_encoded_two, bcrypt.gensalt())
    # pw_hash_four = bcrypt.hashpw(password, bcrypt.gensalt())
    pw_hash = generate_password_hash(password, 10)
    pw_hash_string = pw_hash.decode("utf-8")
    # print("pw_hash_string",pw_hash_string)
    # pw_hash = generate_password_hash(password, 10)
    # print('pw_hash', pw_hash)
    # print('pw_hash_three', pw_hash_three)
    # print('pw_hash_four', pw_hash_four)

    # password_hashed_f = bcrypt.hashpw(data["password"].encode("UTF-8"), bcrypt.gensalt()) 
    # print("password_hashed_f",password_hashed_f)

    # password = data["password"]
    # password_encoded = bytes(password, "utf-8")
    # print("{password",password)
    # print("{password_encoded",password_encoded)
    # password_hashed = bcrypt.hashpw(password_encoded, bcrypt.gensalt()) 
    # print("password_hashed",password_hashed)


    dbEmail = User.query.filter_by(email = email).first()
    if dbEmail:
        return jsonify({"msg": "User already exists!"}), 401

    user_to_register = User()
    user_to_register.email= email
    user_to_register.password= pw_hash_string
    user_to_register.gender= gender
    user_to_register.age= int(age)
    user_to_register.city = city
    user_to_register.first_name= first_name
    user_to_register.last_name= last_name
    user_to_register.height= height
    user_to_register.weight= weight
    user_to_register.user_role= "trainer"

    db.session.add(user_to_register)
    db.session.commit()
    user_data = user_to_register.serialize()
    print("user_data",user_data)

    trainer_to_register = Trainer()
    trainer_to_register.about = about
    trainer_to_register.experience_level = experience_level
    trainer_to_register.approved = None
    trainer_to_register.city = city
    trainer_to_register.specialty = specialty
    trainer_to_register.coaching_style = coaching_style
    if profile_image_url: trainer_to_register.profile_image_url= profile_image_url
    trainer_to_register.user_id = user_data["id"]

    db.session.add(trainer_to_register)
    db.session.commit()
    new_trainer = trainer_to_register.serialize()
    
    return new_trainer


def get_given_trainer_services(trainer_id):
    trainer = Trainer.query.filter_by(id = trainer_id).first()
    data = trainer.serialize() if trainer else None
    trainer_in_user = User.query.filter_by(id = data["user_id"]).first()
    data_user = trainer_in_user.serialize() if trainer_in_user else None
    return data_user
    

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


