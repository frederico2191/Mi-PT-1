import React, { useContext, useState } from "react";
import { RegisterTrainer } from "../component/RegisterTrainer";
import { RegisterTrainee } from "../component/RegisterTrainee";

export const Register = () => {
  const [trainer, setTrainer] = useState(false);
  const [trainee, setTrainee] = useState(false);

  return (
    <div className="container text-center mt-4">
      <button
        onClick={() => {
          setTrainer(!trainer);
          setTrainee(false);
        }}
        className="btn btn-primary mb-5 me-5"
      >
        Trainer
      </button>
      <button
        onClick={() => {
          setTrainee(!trainee);
          setTrainer(false);
        }}
        className="btn btn-primary mb-5"
      >
        Trainee
      </button>
      <h1 className="fst-italic">{trainer && "Trainer"}</h1>
      <h1 className="fst-italic">{trainee && "Trainee"}</h1>
      {trainer && <RegisterTrainer />}
      {trainee && <RegisterTrainee />}
    </div>
  );
};
