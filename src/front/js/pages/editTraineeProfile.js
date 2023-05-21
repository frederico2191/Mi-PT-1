import React from "react";
import { RegisterTrainee } from "../component/RegisterTrainee";

const EditTraineeProfile = () => {
  return (
    <div className="container text-center mt-4">
      <RegisterTrainee isEdit={true} />
    </div>
  );
};

export default EditTraineeProfile;
