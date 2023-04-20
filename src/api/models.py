from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    birthdate = db.Column(db.String(250), nullable=True)
    address = db.Column(db.String(250), nullable=True)
    first_name = db.Column(db.String(250), nullable=True)
    last_name = db.Column(db.String(250), nullable=True)
    weight = db.Column(db.String(250), nullable=True)
    height = db.Column(db.String(250), nullable=True)
    latitude = db.Column(db.String(250), nullable=True)
    longitude = db.Column(db.String(250), nullable=True)
    user_role = db.relationship('UserRole', backref='user', lazy=True)
    # trainee = db.relationship('Trainee', backref='user', lazy=True)
    # trainer = db.relationship('Trainer', backref='user', lazy=True)
    gender = db.relationship('Gender', backref='user', lazy=True)
    gender_id = db.Column(db.Integer, db.ForeignKey('gender.id'), nullable=False)


class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
   
    trainee = db.relationship('Trainee', backref='user_role', lazy=True) #TO CCHECK LATER
    trainer = db.relationship('Trainer', backref='user_role', lazy=True)  #TO CCHECK LATER



class Gender(db.Model): #ENUM
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)


    # female = db.Column(db.String(250), nullable=True) #Boolean!!!
    # male = db.Column(db.String(250), nullable=True) #Boolean!!!
    # non_binary = db.Column(db.String(250), nullable=True) #Boolean!!!
    # intersex = db.Column(db.String(250), nullable=True) #Boolean!!!
    # transgender = db.Column(db.String(250), nullable=True) #Boolean!!!

    


class BodyType(db.Model): #ENUM !!!
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)
    # endomorph = db.Column(db.String(250), nullable=True) #Boolean 
    # mesomorph = db.Column(db.String(250), nullable=True) #Boolean
    # ectomorph = db.Column(db.String(250), nullable=True) #Boolean

class Trainee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body_type = db.relationship('BodyType', backref='trainee', lazy=True) #ENUM !!! 
    body_type_id = db.Column(db.Integer, db.ForeignKey('body_type.id'), nullable=False)

    fitness_experience = db.relationship('FitnessExperience', backref='trainee', lazy=True) #ENUM !!! 
    fitness_experience_id = db.Column(db.Integer, db.ForeignKey('fitness_experience.id'), nullable=False)

    goal = db.relationship('Goal', backref='trainee', lazy=True) #ENUM !!! 
    goal_id = db.Column(db.Integer, db.ForeignKey('goal.id'), nullable=False)
    bank_account = db.Column(db.String(250), nullable=True)
    user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.id'), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)





class FitnessExperience(db.Model): #ENUM
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)


    # new_to_it = db.Column(db.String(250), nullable=True) #Boolean
    # getting_back = db.Column(db.String(250), nullable=True) #Boolean
    # currently_working_out = db.Column(db.String(250), nullable=True) #Boolean
    # fitness_enthusiast= db.Column(db.String(250), nullable=True) #Boolean

class Goal(db.Model): #ENUM
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)


    # lose_weight = db.Column(db.String(250), nullable=True) #Boolean
    # get_toned = db.Column(db.String(250), nullable=True) #Boolean
    # increas_muscle_mass = db.Column(db.String(250), nullable=True) #Boolean
    # improve_health= db.Column(db.String(250), nullable=True) #Boolean
    # improve_as_athlete= db.Column(db.String(250), nullable=True) #Boolean
    # not_sure= db.Column(db.String(250), nullable=True) #Boolean


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

    specialty = db.relationship('Specialty', backref='trainer', lazy=True) #ENUM !!! 
    specialty_id = db.Column(db.Integer, db.ForeignKey('specialty.id'), nullable=False)
    
    about = db.Column(db.String(250), nullable=True)
    experience_level = db.Column(db.Integer, nullable=True)
    bank_account = db.Column(db.String(250), nullable=True)

    user_role_id = db.Column(db.Integer, db.ForeignKey('user_role.id'), nullable=False)

class Specialty(db.Model): #ENUM
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)

    # running_performance = db.Column(db.String(250), nullable=True)
    # functional_training = db.Column(db.String(250), nullable=True)
    # postpartum_training = db.Column(db.String(250), nullable=True)
    # weight_loss = db.Column(db.String(250), nullable=True)
    # strength_development = db.Column(db.String(250), nullable=True)
    # metabolic_conditioning = db.Column(db.String(250), nullable=True)
    # injury_reduction = db.Column(db.String(250), nullable=True)
    # sports_performance = db.Column(db.String(250), nullable=True)
    # flexibility = db.Column(db.String(250), nullable=True)
    # metabolic_conditioning = db.Column(db.String(250), nullable=True)

class Specialty_Per_Trainer(db.Model): #MUST BECOME ASSOCIATION TABLE 
    id = db.Column(db.Integer, primary_key=True)
    specialty_id = db.Column(db.Integer, db.ForeignKey('specialty.id'))
    specialty = db.relationship(Specialty)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainer = db.relationship(Trainer)

    


class CoachingStyle(db.Model): #ENUM
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)

    # supportive = db.Column(db.String(250), nullable=True)
    # laid_back = db.Column(db.String(250), nullable=True)
    # results_oriented = db.Column(db.String(250), nullable=True)
    # motivating = db.Column(db.String(250), nullable=True)
    # high_energy = db.Column(db.String(250), nullable=True)
    # results_oriented = db.Column(db.String(250), nullable=True)
    # calm = db.Column(db.String(250), nullable=True)

class CoachingStylePerTrainer(db.Model): #MUST BECOME ASSOCIATION TABLE 
    id = db.Column(db.Integer, primary_key=True)
    coaching_style = db.relationship(CoachingStyle)
    coaching_style_id = db.Column(db.Integer, db.ForeignKey('coaching_style.id'))
    trainer = db.relationship(Trainer)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))

class IndoorOutdoorRemote(db.Model): #ENUM !!!
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250),nullable=False)

    # indoor = db.Column(db.String(250), nullable=True)
    # outdoor = db.Column(db.String(250), nullable=True)
    # remote = db.Column(db.String(250), nullable=True)
    
    activity = db.relationship('Activity', backref='indoor_outdoor_remote', lazy=True)
    def __repr__(self):
        return self.name

class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=True)
    indoor_outdoor_remote_id = db.Column(db.Integer, db.ForeignKey('indoor_outdoor_remote.id'),nullable=False)



class ActivityPerTrainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(250), nullable=True)
    duration = db.Column(db.String(250), nullable=True)
    location_range = db.Column(db.String(250), nullable=True)
    location_pinpoint = db.Column(db.String(250), nullable=True)
    price = db.Column(db.String(250), nullable=True)
    date = db.Column(db.String(250), nullable=True)
   
    activity_id = db.Column(db.Integer, db.ForeignKey('activity.id'))
    activity = db.relationship(Activity)
    trainer_id = db.Column(db.Integer, db.ForeignKey('trainer.id'))
    trainer = db.relationship(Trainer)


class BookedClass(db.Model):
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
  

