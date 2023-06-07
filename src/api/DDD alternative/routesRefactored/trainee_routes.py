from services.trainee_services import *

def register_trainee():
    return register_trainee_services(request)

def getGivenTrainee(trainee_id):
    return get_given_trainee_services(trainee_id)

def edit_trainee(trainee_id):
    return edit_trainee_services(trainee_id)