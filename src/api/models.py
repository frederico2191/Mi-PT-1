from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    age = db.Column(db.Integer, nullable=True)
    city = db.Column(db.String(250), nullable=True)
    first_name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    weight = db.Column(db.String(250), nullable=True)
    height = db.Column(db.String(250), nullable=True)
    paypal_link = db.Column(db.String(250), nullable=True)
    gender = db.Column(db.String(250), nullable=True)
    user_role = db.Column(db.String(250), nullable=True)
    
    # trainee = db.relationship('Trainee', backref='user', lazy=True)
    # trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id'), nullable=False)
    # trainer = db.relationship('Trainer', backref='user', lazy=True)
    # gender = db.relationship('Gender', backref='user', lazy=True)
    # gender_id = db.Column(db.Integer, db.ForeignKey('gender.id'), nullable=True)
    # user_role = db.relationship('UserRole', backref='user', lazy=True)
    # user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.id'), nullable=True)

    def __repr__(self):
        return self.first_name

    def serialize(self):
        trainer = Trainer.query.filter_by(user_id = self.id).first()
        serializedTrainer = trainer.serialize() if trainer else None
        activity_per_trainer = ActivityPerTrainer.query.filter_by(trainer_id = serializedTrainer["id"]).all() if serializedTrainer else []

        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "age": self.age,
            "city": self.city,
            "weight": self.weight,
            "height": self.height,
            "gender": self.gender,
            "paypal_link": self.paypal_link,
            # "user_role": self.user_role.name if self.user_role else "unknown",
            "user_role": self.user_role,
            "activities": [activity.serialize() for activity in activity_per_trainer]
        }

atendencies = db.Table('atendencies',
    db.Column('activity_per_trainer_id', db.Integer, db.ForeignKey('activity_per_trainer.id'), primary_key=True),
    db.Column('trainee_id', db.Integer, db.ForeignKey('trainee.id'), primary_key=True)
)

class Trainee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # body_type = db.relationship('BodyType', backref='trainee', lazy=True) #ENUM !!! 
    # body_type_id = db.Column(db.Integer, db.ForeignKey('body_type.id'), nullable=False)
    body_type = db.Column(db.String(250), nullable=True)
    goal = db.Column(db.String(250), nullable=True)
    fitness_experience = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)



    # fitness_experience = db.relationship('FitnessExperience', backref='trainee', lazy=True) #ENUM !!! 
    # fitness_experience_id = db.Column(db.Integer, db.ForeignKey('fitness_experience.id'), nullable=False)

    # goal = db.relationship('Goal', backref='trainee', lazy=True) #ENUM !!! 
    # goal_id = db.Column(db.Integer, db.ForeignKey('goal.id'), nullable=False)
    
    
    # user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.id'), nullable=False)
    user = db.relationship('User', backref='trainee', lazy=True) #ENUM !!! 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    atendencies = db.relationship('ActivityPerTrainer', secondary=atendencies, lazy='subquery',backref=db.backref('trainees', lazy=True))

    def serialize(self):
        return {
            "id": self.id,
            "body_type": self.body_type,
            "goal": self.goal,
            "fitness_experience": self.fitness_experience,
            "city": self.city,
            "user_id": self.user_id
        }

# class UserRole(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=True)
#     # trainee = db.relationship('Trainee', backref='user_role', lazy=True) #TO CCHECK LATER
#     # trainer = db.relationship('Trainer', backref='user_role', lazy=True)  #TO CCHECK LATER
#     def __repr__(self):
#         return self.name
    



# class Gender(db.Model): #ENUM
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)

    # female = db.Column(db.String(250), nullable=True) #Boolean!!!
    # male = db.Column(db.String(250), nullable=True) #Boolean!!!
    # non_binary = db.Column(db.String(250), nullable=True) #Boolean!!!
    # intersex = db.Column(db.String(250), nullable=True) #Boolean!!!
    # transgender = db.Column(db.String(250), nullable=True) #Boolean!!!

    # def __repr__(self):
    #     return self.name


# class BodyType(db.Model): #ENUM !!!
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)
#     # endomorph = db.Column(db.String(250), nullable=True) #Boolean 
#     # mesomorph = db.Column(db.String(250), nullable=True) #Boolean
#     # ectomorph = db.Column(db.String(250), nullable=True) #Boolean
#     def __repr__(self):
#         return self.name



# class FitnessExperience(db.Model): #ENUM
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)

#     def __repr__(self):
#         return self.name

#     # new_to_it = db.Column(db.String(250), nullable=True) #Boolean
#     # getting_back = db.Column(db.String(250), nullable=True) #Boolean
#     # currently_working_out = db.Column(db.String(250), nullable=True) #Boolean
#     # fitness_enthusiast= db.Column(db.String(250), nullable=True) #Boolean

# class Goal(db.Model): #ENUM
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)

#     def __repr__(self):
#         return self.name


    # lose_weight = db.Column(db.String(250), nullable=True) #Boolean
    # get_toned = db.Column(db.String(250), nullable=True) #Boolean
    # increas_muscle_mass = db.Column(db.String(250), nullable=True) #Boolean
    # improve_health= db.Column(db.String(250), nullable=True) #Boolean
    # improve_as_athlete= db.Column(db.String(250), nullable=True) #Boolean
    # c= db.Column(db.String(250), nullable=True) #Boolean


# class Personal_Success(db.Model): # IMPROVEMENTS PHASE!!!
#     id = db.Column(db.Integer, primary_key=True)
#     fit_old_clothes = db.Column(db.String(250), nullable=True) #Boolean
#     feel_stronger = db.Column(db.String(250), nullable=True) #Boolean
#     feel_energized = db.Column(db.String(250), nullable=True) #Boolean
#     improve_mental_health= db.Column(db.String(250), nullable=True) #Boolean
#     make_fitness_habit= db.Column(db.String(250), nullable=True) #Boolean
#     make_eating_healthy_habit= db.Column(db.String(250), nullable=True) #Boolean
#     learn_to_love_working_out= db.Column(db.String(250), nullable=True) #Boolean
#     none_of_the_above= db.Column(db.String(250), nullable=True) #Boolean

# class Personal_Adversity(db.Model): # IMPROVEMENTS PHASE!!!
#     id = db.Column(db.Integer, primary_key=True)
#     injury = db.Column(db.String(250), nullable=True) #Boolean
#     lack_accountability = db.Column(db.String(250), nullable=True) #Boolean
#     lack_motivation = db.Column(db.String(250), nullable=True) #Boolean
#     poor_results= db.Column(db.String(250), nullable=True) #Boolean
#     exercise_not_enjoyable= db.Column(db.String(250), nullable=True) #Boolean
#     too_busy= db.Column(db.String(250), nullable=True) #Boolean
#     none_of_the_above= db.Column(db.String(250), nullable=True) #Boolean

class Trainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    approved = db.Column(db.Boolean(), nullable=True)
    about = db.Column(db.String(250), nullable=True)
    experience_level = db.Column(db.String(250), nullable=True)
    bank_account = db.Column(db.String(250), nullable=True)
    city = db.Column(db.String(250), nullable=True)
    specialty = db.Column(db.String(250), nullable=True)
    coaching_style = db.Column(db.String(250), nullable=True)

    # specialty = db.relationship('Specialty', backref='trainer', lazy=True) #ENUM !!! 
    # specialty_id = db.Column(db.Integer, db.ForeignKey('specialty.id'), nullable=False)
   
    # coaching_style = db.relationship('CoachingStyle', backref='trainer', lazy=True) #ENUM !!! 
    # coaching_style_id = db.Column(db.Integer, db.ForeignKey('coaching_style.id'), nullable=False)
    user = db.relationship('User', backref='trainer', lazy=True) #ENUM !!! 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    activities = db.relationship("ActivityPerTrainer")

    # def __repr__(self):
    #     return self.id

    def serialize(self):
        return {
            "id": self.id,
            "approved": self.approved,
            "about": self.about,
            "experience_level": self.experience_level,
            "city": self.city,
            "bank_account": self.bank_account,
            "specialty": self.specialty,
            "coaching_style": self.coaching_style,
            "user_id": self.user_id
        }


# class Specialty(db.Model): #ENUM
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)
#     # running_performance = db.Column(db.String(250), nullable=True)
#     # functional_training = db.Column(db.String(250), nullable=True)
#     # postpartum_training = db.Column(db.String(250), nullable=True)
#     # weight_loss = db.Column(db.String(250), nullable=True)
#     # strength_development = db.Column(db.String(250), nullable=True)
#     # metabolic_conditioning = db.Column(db.String(250), nullable=True)
#     # injury_reduction = db.Column(db.String(250), nullable=True)
#     # sports_performance = db.Column(db.String(250), nullable=True)
#     # flexibility = db.Column(db.String(250), nullable=True)
#     # metabolic_conditioning = db.Column(db.String(250), nullable=True)

#     def __repr__(self):
#         return self.name

# class Specialty_Per_Trainer(db.Model): #MUST BECOME ASSOCIATION TABLE 
#     id = db.Column(db.Integer, primary_key=True)
#     specialty_id = db.Column(db.Integer, db.ForeignKey('specialty.id'))
#     specialty = db.relationship(Specialty)
#     trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     trainer = db.relationship(Trainer)

# class CoachingStyle(db.Model): #ENUM
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)
#     # supportive = db.Column(db.String(250), nullable=True)
#     # laid_back = db.Column(db.String(250), nullable=True)
#     # results_oriented = db.Column(db.String(250), nullable=True)
#     # motivating = db.Column(db.String(250), nullable=True)
#     # high_energy = db.Column(db.String(250), nullable=True)
#     # calm = db.Column(db.String(250), nullable=True)
#     def __repr__(self):
#         return self.name

# class CoachingStylePerTrainer(db.Model): #MUST BECOME ASSOCIATION TABLE 
#     id = db.Column(db.Integer, primary_key=True)
#     coaching_style_id = db.Column(db.Integer, db.ForeignKey('coaching_style.id'))
#     coaching_style = db.relationship(CoachingStyle)

#     trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     trainer = db.relationship(Trainer)

# class IndoorOutdoorRemote(db.Model): #ENUM !!!
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(250),nullable=False)

#     # indoor = db.Column(db.String(250), nullable=True)
#     # outdoor = db.Column(db.String(250), nullable=True)
#     # remote = db.Column(db.String(250), nullable=True)
#     def __repr__(self):
#         return self.name
    
#     activity = db.relationship('Activity', backref='indoor_outdoor_remote', lazy=True)
#     def __repr__(self):
#         return self.name


class ActivityPerTrainer(db.Model):
# class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), nullable=True)
    # name = db.Column(db.String(250), nullable=True)
    duration = db.Column(db.String(250), nullable=True)
    location_range = db.Column(db.String(250), nullable=True)
    location_pinpoint = db.Column(db.String(250), nullable=True)
    price = db.Column(db.String(250), nullable=True)
    date = db.Column(db.DateTime(timezone=False), nullable=True)
    hour = db.Column(db.String(250), nullable=True)
    minutes = db.Column(db.String(250), nullable=True)

    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'), nullable=False)
    
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id'))
    
    def serialize(self):
        activity = Activity.query.get(self.activity_id)
        return {
            "id": self.id,
            "description": self.description,
            "duration": self.duration,
            "date": self.date,
            "price": self.price,
            "trainer_id": self.trainer_id,
            "trainee_id": self.trainee_id,
            "hour": self.hour,
            "minutes": self.minutes,
            "name": activity.name,
            "trainer_id":self.trainer_id,
            "trainee_id":self.trainee_id
        }

class Activity(db.Model):
# class ActivityCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    location_type = db.Column(db.String(250), nullable=True)
    # indoor_outdoor_remote_id = db.Column(db.Integer, db.ForeignKey('indoor_outdoor_remote.id'),nullable=False)
    # activities = db.relationship(ActivityPerTrainer)
    activities_per_trainer = db.relationship('ActivityPerTrainer', backref='activity', lazy=True)


    def __repr__(self):
        return self.name
    
    def serialize(self):
        
        return {"name": self.name, "activitiesPerTrainer":self.activities_per_trainer}




class BookedClass(db.Model):
# class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(250), nullable=True)
    # location = db.Column(db.String(250), nullable=True) # WE can probably retrieve this from  activity_per_trariner

    activity_per_trainer_id = db.Column(db.Integer, db.ForeignKey('activity_per_trainer.id'))
    activity_per_trainer = db.relationship(ActivityPerTrainer)

    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainer = db.relationship(Trainer)

    trainee_id = db.Column(db.Integer, db.ForeignKey('trainee.id'))
    trainee = db.relationship(Trainee)





# class Favorites(db.Model): # For LAter !!
#     # Here we define columns for the table person
#     # Notice that each column is also a normal Python instance attribute.
#     id = db.Column(db.Integer, primary_key=True)
#     # username = db.Column(db.String(250), nullable=False)
#     user_id = db.Column(db.String(250), db.ForeignKey('user.id'))
#     user = db.relationship(User)
#     fav_trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     trainer = db.relationship(Trainer)
  
# class Availability(db.Model): # For LAter !!
#     id = db.Column(db.Integer, primary_key=True)
#     trainer_id = db.Column(db.String(250), nullable=False)
      
#     day = db.Column(db.time(250), db.ForeignKey('user.id'))
#     from = time db.relationship(User)
#     to = time db.Column(db.Integer, db.ForeignKey('trainer.id'))
#     peoples = integer   this is a relationship witht the trainee.   db.relationship(Trainer)
  

