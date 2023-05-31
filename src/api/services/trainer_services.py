from repositories.TrainerRepository import TrainerRepository
from repositories.UserRepository import UserRepository
from .models import TrainerModel, UserModel

def register_trainer():
    email = request.json.get("email",None)
    password = request.json.get("password",None)
    gender = request.json.get("gender",None)
    about = request.json.get("about",None)
    experience_level = request.json.get("experience_level",None)
    approved = request.json.get("approved",None)
    city = request.json.get("city",None)
    specialty = request.json.get("specialty",None)
    coaching_style = request.json.get("coaching_style",None)
    age = request.json.get("age",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)
    profile_image_url = request.json.get("uploadedProfileImageUrl",None)

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
    user_to_register.user_role= "trainer"

    user_repository = UserRepository()
    user_repository.save(user_to_register)
    data = user_to_register.serialize()

    trainer_to_register = TrainerModel()
    trainer_to_register.email = email
    trainer_to_register.password = password
    trainer_to_register.gender = gender
    trainer_to_register.about = about
    trainer_to_register.experience_level = experience_level
    trainer_to_register.approved = None
    trainer_to_register.city = city
    trainer_to_register.specialty = specialty
    trainer_to_register.coaching_style = coaching_style
    trainer_to_register.profile_image_url= profile_image_url
    trainer_to_register.user_id = data["id"]

    trainer_repository = TrainerRepository()
    trainer_repository.save(trainer_to_register)
    new_trainer = trainer_to_register.serialize()
    
    return jsonify(new_trainer)



def get_given_trainer_services(trainer_id):
    trainer = TrainerModel.query.filter_by(id = trainerid).first()
    data = trainer.serialize() if trainee else None
    trainer_in_user = UserModel.query.filter_by(id = data["user_id"]).first()
    data_user = trainer_in_user.serialize() if trainer_in_user else None
    
    return jsonify(data_user)

@api.route('/edit/trainer/<trainer_id>', methods=['PUT'])
@jwt_required()
def edit_trainer(trainer_id):
    trainer = TrainerModel.query.filter_by(id = trainer_id).first()
    if trainer is None: 
        return  jsonify({"respBody": None}), 400
    trainer_to_edit = trainer.serialize()
    user = UserModel.query.filter_by(id=trainer_to_edit["user_id"]).first()
    if user is None: 
        return  jsonify({"respBody": None}), 400
    user_to_edit = user.serialize()
    
    data = request.get_json()
    email = request.json.get("email",None)
    gender = request.json.get("gender",None)
    about = request.json.get("about",None)
    experience_level = request.json.get("experience_level",None)
    city = request.json.get("city",None)
    specialty = request.json.get("specialty",None)
    coaching_style = request.json.get("coaching_style",None)
    age = request.json.get("age",None)
    first_name = request.json.get("first_name",None)
    last_name = request.json.get("last_name",None)
    height = request.json.get("height",None)
    weight = request.json.get("weight",None)
    profile_image_url = request.json.get("uploadedProfileImageUrl",None)

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

    trainer_to_update.email = email
    if gender not in possible_genders: return jsonify({"msg": "The back-end won't accept this altered option - gender"}), 404
    trainer_to_update.gender = gender
    trainer_to_update.about = about
    # if experience_level not in possible_experience_levels: return jsonify({"msg": "The back-end won't accept this altered option- exp level"}), 404
    trainer_to_update.experience_level = experience_level
    trainer_to_update.approved = None
    trainer_to_update.city = city
    # if specialty not in possible_specialties: return jsonify({"msg": "The back-end won't accept this altered option-specialty"}), 404
    trainer_to_update.specialty = specialty
    # if coaching_style not in possible_coaching_styles: return jsonify({"msg": "The back-end won't accept this altered option- coaching style"}), 404
    trainer_to_update.coaching_style = coaching_style
    trainer_to_update.profile_image_url= profile_image_url

    trainer_repository = TrainerRepository()
    trainer_repository.update(trainer_id, {data:trainer_to_update})
   

    resp_body = {
        "edited_user_trainer": UserModel.query.filter(User.trainer.has(id = trainer_id)).first().serialize(),
    }
    return jsonify({"respBody": resp_body}), 200

