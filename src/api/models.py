from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)
    birthdate = Column(String(250), nullable=True)
    address = Column(String(250), nullable=True)
    first_name = Column(String(250), nullable=True)
    last_name = Column(String(250), nullable=True)
    weight = Column(String(250), nullable=True)
    
    # role = relationship('User_Role', backref='user', lazy=True)
    # trainee = relationship('Trainee', backref='user', lazy=True)
    # trainer = relationship('Trainer', backref='user', lazy=True)
    # gender = relationship('Gender', backref='user', lazy=True)

    def to_dict(self):
        return {}

class Gender(Base):
    __tablename__ = 'gender'
    id = Column(Integer, primary_key=True)
    female = Column(String(250), nullable=True) #3
    male = Column(String(250), nullable=True)
    non_binary = Column(String(250), nullable=True)
    intersex = Column(String(250), nullable=True)
    transgender = Column(String(250), nullable=True)

    # user_id = Column(Integer, ForeignKey('user.id'), nullable=False)


class User_Role(Base):
    __tablename__ = 'user_role'
    id = Column(Integer, primary_key=True)
    trainee = Column(Integer,default=False, nullable=False) #Boolean?
    trainer = Column(Integer,default=False, nullable=False) #Boolean?
    both = Column(Integer,default=False, nullable=False) #Boolean?

    trainee = relationship('Trainee', backref='user_role', lazy=True)
    trainer = relationship('Trainer', backref='user_role', lazy=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)


class Trainee(Base):
    __tablename__ = 'trainee'
    id = Column(Integer, primary_key=True)
    body_type = relationship('Body_Type', backref='trainee', lazy=True)
    goal = relationship('Goal', backref='trainee', lazy=True)
    bank_account = Column(String(250), nullable=True)

    user_role_id = Column(Integer, ForeignKey('user_role.id'), nullable=False)


class Body_Type(Base):
    __tablename__ = 'body_type'
    id = Column(Integer, primary_key=True)
    endomorph = Column(String(250), nullable=True) #Boolean
    mesomorph = Column(String(250), nullable=True) #Boolean
    ectomorph = Column(String(250), nullable=True) #Boolean

    trainee_id = Column(Integer, ForeignKey('trainee.id'), nullable=False)


class Fitness_Experience(Base):
    __tablename__ = 'fitness_experience'
    id = Column(Integer, primary_key=True)
    new_to_it = Column(String(250), nullable=True) #Boolean
    getting_back = Column(String(250), nullable=True) #Boolean
    currently_working_out = Column(String(250), nullable=True) #Boolean
    fitness_enthusiast= Column(String(250), nullable=True) #Boolean

class Goal(Base):
    __tablename__ = 'goal'
    id = Column(Integer, primary_key=True)
    lose_weight = Column(String(250), nullable=True) #Boolean
    get_toned = Column(String(250), nullable=True) #Boolean
    increas_muscle_mass = Column(String(250), nullable=True) #Boolean
    improve_health= Column(String(250), nullable=True) #Boolean
    improve_as_athlete= Column(String(250), nullable=True) #Boolean
    not_sure= Column(String(250), nullable=True) #Boolean

    trainee_id = Column(Integer, ForeignKey('trainee.id'), nullable=False)

class Personal_Success(Base):
    __tablename__ = 'success'
    id = Column(Integer, primary_key=True)
    fit_old_clothes = Column(String(250), nullable=True) #Boolean
    feel_stronger = Column(String(250), nullable=True) #Boolean
    feel_energized = Column(String(250), nullable=True) #Boolean
    improve_mental_health= Column(String(250), nullable=True) #Boolean
    make_fitness_habit= Column(String(250), nullable=True) #Boolean
    make_eating_healthy_habit= Column(String(250), nullable=True) #Boolean
    learn_to_love_working_out= Column(String(250), nullable=True) #Boolean
    none_of_the_above= Column(String(250), nullable=True) #Boolean

class Personal_Adversity(Base):
    __tablename__ = 'adversity'
    id = Column(Integer, primary_key=True)
    injury = Column(String(250), nullable=True) #Boolean
    lack_accountability = Column(String(250), nullable=True) #Boolean
    lack_motivation = Column(String(250), nullable=True) #Boolean
    poor_results= Column(String(250), nullable=True) #Boolean
    exercise_not_enjoyable= Column(String(250), nullable=True) #Boolean
    too_busy= Column(String(250), nullable=True) #Boolean
    none_of_the_above= Column(String(250), nullable=True) #Boolean



class Trainer(Base):
    __tablename__ = 'trainer'
    id = Column(Integer, primary_key=True)
    about = Column(String(250), nullable=True)
    experience_level = Column(Integer, nullable=True)
    bank_account = Column(String(250), nullable=True)

    user_role_id = Column(Integer, ForeignKey('user_role.id'), nullable=False)

class Specialty(Base):
    __tablename__ = 'specialty'
    id = Column(Integer, primary_key=True)
    running_performance = Column(String(250), nullable=True)
    functional_training = Column(String(250), nullable=True)
    postpartum_training = Column(String(250), nullable=True)
    weight_loss = Column(String(250), nullable=True)
    strength_development = Column(String(250), nullable=True)
    metabolic_conditioning = Column(String(250), nullable=True)
    injury_reduction = Column(String(250), nullable=True)
    sports_performance = Column(String(250), nullable=True)
    flexibility = Column(String(250), nullable=True)
    metabolic_conditioning = Column(String(250), nullable=True)

class Specialty_Per_Trainer(Base):
    __tablename__ = 'specialty_per_trainer'
    id = Column(Integer, primary_key=True)
    specialty_id = Column(Integer, ForeignKey('specialty.id'))
    specialty = relationship(Specialty)
    trainer_id = Column(Integer, ForeignKey('trainer.id'))
    trainer = relationship(Trainer)


class Coaching_Style(Base):
    __tablename__ = 'coaching_style'
    id = Column(Integer, primary_key=True)
    supportive = Column(String(250), nullable=True)
    laid_back = Column(String(250), nullable=True)
    results_oriented = Column(String(250), nullable=True)
    motivating = Column(String(250), nullable=True)
    high_energy = Column(String(250), nullable=True)
    results_oriented = Column(String(250), nullable=True)
    calm = Column(String(250), nullable=True)

class Coaching_Style_Per_Trainer(Base):
    __tablename__ = 'coaching_style_per_trainer'
    id = Column(Integer, primary_key=True)
    coaching_style_id = Column(Integer, ForeignKey('coaching_style.id'))
    coaching_style = relationship(Coaching_Style)
    trainer_id = Column(Integer, ForeignKey('trainer.id'))
    trainer = relationship(Trainer)

class Indoor_Outdoor_Remote(Base):
    __tablename__ = 'indoor_outdoor_remote'
    id = Column(Integer, primary_key=True)
    indoor = Column(String(250), nullable=True)
    outdoor = Column(String(250), nullable=True)
    remote = Column(String(250), nullable=True)
    
    activity = relationship('Activity', backref='indoor_outdoor_remote', lazy=True)

class Activity(Base):
    __tablename__ = 'activity'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=True)
    indoor_outdoor_remote_id = Column(Integer, ForeignKey('indoor_outdoor_remote.id'),nullable=False)



class Activity_Per_Trainer(Base):
    __tablename__ = 'activity_per_trainer'
    id = Column(Integer, primary_key=True)
    description = Column(String(250), nullable=True)
    duration = Column(String(250), nullable=True)
    location_range = Column(String(250), nullable=True)
    location_pinpoint = Column(String(250), nullable=True)
    price = Column(String(250), nullable=True)
    date = Column(String(250), nullable=True)
   
    activity_id = Column(Integer, ForeignKey('activity.id'))
    activity = relationship(Activity)
    trainer_id = Column(Integer, ForeignKey('trainer.id'))
    trainer = relationship(Trainer)


class Booked_Class(Base):
    __tablename__ = 'booked_Class'
    id = Column(Integer, primary_key=True)
    date = Column(String(250), nullable=True)
    location = Column(String(250), nullable=True)

    activity_per_trainer_id = Column(Integer, ForeignKey('activity_per_trainer.id'))
    activity_per_trainer = relationship(Activity_Per_Trainer)
    trainer_id = Column(Integer, ForeignKey('trainer.id'))
    trainer = relationship(Trainer)
    trainee_id = Column(Integer, ForeignKey('trainee.id'))
    trainee = relationship(Trainee)



class Favorites(Base):
    __tablename__ = 'favorites'
    # Here we define columns for the table person
    # Notice that each column is also a normal Python instance attribute.
    id = Column(Integer, primary_key=True)
    # username = Column(String(250), nullable=False)
    user_id = Column(String(250), ForeignKey('user.id'))
    user = relationship(User)
    fav_trainer_id = Column(Integer, ForeignKey('trainer.id'))
    trainer = relationship(Trainer)
  


## Draw from SQLAlchemy base
render_er(Base, 'diagram.png')