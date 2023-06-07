from ..models import Activity

def get_all_activity_category_services():
    allActivityCategories = Activity.query.all()
    data = [{"name": activity.name, "id": activity.id} for activity in allActivityCategories]

    return data
