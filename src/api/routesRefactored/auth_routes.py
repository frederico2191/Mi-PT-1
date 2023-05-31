from services.auth_services import *

def create_token_route():
    return create_token_services()

def verify_token_route():
    return verify_token_services()

