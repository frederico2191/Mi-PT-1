import React from 'react';

const TraineeProfileModal = ({ trainee }) => {
  // Placeholder data for now, just to make the modal render with some content
  const placeholderTrainee = {
    name: 'Peter Parker',
    age: 25,
    email: 'peter@parker.com',
    bodyType: 'Athletic',
    about: 'Trying to live as healthy as I can',
    imageURL: 'https://via.placeholder.com/150'
  };

  // Will "activate" as soon as it receives the props from trainee
  const { name, age, email, bodyType, about, imageURL } = trainee || placeholderTrainee;

  const greenColor = '#198754'; // Bootstrap button success color to match 

  /* inline styles to avoid creating extra files for now; 
  Following color scheme from the logo */
  return (
    <div
      className="card"
      style={{
        backgroundColor: 'black',
        color: greenColor,
        position: 'relative',
        width: 'fit-content',
        minWidth: '350px',
        padding: '10px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <div className="card-body d-flex flex-column">
        <div className="row">
          <div className="col-4">
            <img src={imageURL} className="rounded-circle" alt="Trainee" />
          </div>
          <div className="col-8">
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
            <p>Body Type: {bodyType}</p>
            <p>About: {about}</p>
          </div>
        </div>
        <div className="mt-auto">
          <button
            type="button"
            className="btn btn-success"
            style={{ alignSelf: 'flex-end' }}
          >
            Go to Trainee Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default TraineeProfileModal;