import AbstractRepository
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from .models import ActivityCategoryModel

db = SQLAlchemy()

class ActivityCategoryRepository(AbstractRepository.GetService):
    def get(self):
        all_activity_categories = ActivityCategoryModel.query.all()

        data = [{"name": activityCategory.name, "id": activityCategory.id} for activityCategory in all_activity_categories]

        resp_body = {
        "All the Activity Categories found" : data
}
        return jsonify({"respBody": resp_body}), 200



