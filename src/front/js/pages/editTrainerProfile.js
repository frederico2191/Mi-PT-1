import React from "react";
import { RegisterTrainer } from "../component/RegisterTrainer";

const EditTrainerProfile = () => {
  return (
    <div className="container text-center mt-4">
      <RegisterTrainer isEdit={true} />
    </div>
  );
};

export default EditTrainerProfile;
