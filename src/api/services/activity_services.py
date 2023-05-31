from ..repositories.ActivityRepository import ActivityRepository
from ..models import ActivityModel, ActivityCategoryModel

def register_activity_services(request):
    name = request.json.get("name",None)
    description = request.json.get("description",None)
    duration = request.json.get("duration",None)
    price = request.json.get("price",None)
    eventDate = request.json.get("eventDate",None)
    hour = request.json.get("hour",None)
    minutes = request.json.get("minutes",None)
    city = request.json.get("city",None)
    trainer_id = request.json.get("trainerId",None)
    trainer_name = request.json.get("trainerName",None)
    city = request.json.get("city",None)
    lat = request.json.get("lat",None)
    lng = request.json.get("lng",None)
    address = request.json.get("address",None)
    profile_image_url = request.json.get("trainerProfileImageUrl",None)
    datetime_object = parser.parse(eventDate) if eventDate else None

    activity_to_register = ActivityModel()
    activity_to_register.description= description
    activity_to_register.duration= duration
    activity_to_register.price= price
    activity_to_register.date= datetime_object
    activity_to_register.hour= hour 
    activity_to_register.minutes = minutes 
    activity_to_register.activity_id = name 
    activity_to_register.trainer_id = trainer_id
    activity_to_register.city = city
    activity_to_register.lat = lat
    activity_to_register.lng = lng
    activity_to_register.trainer_name = trainer_name
    activity_to_register.address = address
    activity_to_register.trainer_profile_image_url = profile_image_url

    activity_repository = ActivityRepository()
    # ActivityRepository().add(activity_to_register)
    activity_repository.save(activity_to_register)
    # db.session.commit()
    data = activity_to_register.serialize()

    return data,200


def get_given_activity_services(activity_id):
    # ActivityRepository.get(self, activity_id)
    activity = ActivityModel.query.filter_by(id = activity_id).first()

    data = activity.serialize()
   
    return jsonify(data)

def get_all_activity_services():
    ActivityRepository.get(self, activity_id)
    activities = ActivityModel.query.filter_by(id = activity_id).first()

    data = activities.serialize()
   
    return jsonify(data)

def update_activity_services(activity_id):
    activity_to_update = ActivityModel.query.filter_by(id = activity_id).first()
    if activity_to_update is None: 
        return  jsonify({"respBody": None}), 400
    
    serialized_activity_to_update = activity_to_update.serialize()
    name = request.json.get("name",None)
    description = request.json.get("description",None)
    duration = request.json.get("duration",None)
    price = request.json.get("price",None)
    eventDate = request.json.get("eventDate",None)
    hour = request.json.get("hour",None)
    minutes = request.json.get("minutes",None)
    city = request.json.get("city",None)
    lat = request.json.get("lat",None)
    lng = request.json.get("lng",None)
    address = request.json.get("address",None)
    datetime_object = parser.parse(eventDate) if eventDate else None

    activity_category = ActivityCategoryModel.query.filter_by(name=name).first()
    serialized_activity_category = activity_category.serialize() if activity_category else None


    activity_to_update.description= description
    activity_to_update.duration= duration
    activity_to_update.price= price
    activity_to_update.date= datetime_object 
    activity_to_update.hour= hour 
    activity_to_update.minutes = minutes
    activity_to_update.activity_id = serialized_activity["id"] if serialized_activity else serialized_activity_to_update["activity_id"]
    activity_to_update.city = city 
    activity_to_update.lat = lat 
    activity_to_update.lng = lng 
    activity_to_update.address = address 

    return ActivityRepository.update(self, activity_id, activity_to_update)

def book_class_services():
    data = request.get_json()
    activity_id = data.get('id')
    trainee_id = data.get('trainee_id')
    trainee_name = data.get('trainee_name')

    activity = ActivityModel.query.filter_by(id = activity_id).first()
    activity.trainee_id = trainee_id
    activity.trainee_name = trainee_name

    db.session.commit()
    resp_body = {
        "trainee_name": User.query.filter(User.trainee.has(id = trainee_id)).first().first_name,
    }
    return ActivityRepository.update(self, activity_id, {data:activity})

def unbook_class_services():
    data = request.get_json()
    activity_id = data.get('id')
    trainee_id = data.get('trainee_id')
    activity = ActivityPerTrainer.query.filter_by(id = activity_id).first()
    if activity is None: 
        return  jsonify({"respBody": None}), 400
    
    activity.trainee_id = None 
    activity.trainee_name = None
    db.session.commit()
    resp_body = {
        "class": ActivityPerTrainer.query.filter_by(id = activity_id).first().serialize()
    }
    return jsonify({"respBody": resp_body}), 200
    

def delete_activity_services(activity_id):
    activity_to_delete= ActivityPerTrainer.query.filter_by(id = activity_id).first()
    return ActivityRepository.delete(self, activity_to_delete)
