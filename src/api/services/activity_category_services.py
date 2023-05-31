from repositories.ActivityRepository import ActivityRepository
from .models import ActivityCategoryModel

def get_all_activity_category_services():
    allActivityCategories = ActivityCategoryModel.query.all()
    
    data = [{"name": activity.name, "id": activity.id} for activity in allTypesActivities]

    return jsonify(data)
