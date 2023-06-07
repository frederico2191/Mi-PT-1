from ..services.activity_services import *


def register_activity_route(request):
    return register_activity_services(request)

def get_given_activity_route(activity_id):
    return get_given_activity_services(activity_id)

def get_all_activity_route():
    return get_all_activity_services()

def edit_activity_route(request,activity_id):
    return update_activity_services(request,activity_id)

def book_class_route(request):
    return book_class_services(request)

def unbook_class_route(request):
    return unbook_class_services(request)

def delete_activity_route(activity_id):
    return delete_activity_services(activity_id)