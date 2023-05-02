import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

import { RegisterTrainer } from "../component/RegisterTrainer";
import { RegisterTrainee } from "../component/RegisterTrainee";

export const Register = () => {
  const [trainer, setTrainer] = useState(false);
  const [trainee, setTrainee] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setTrainer(!trainer);
          setTrainee(false);
        }}
        className="btn btn-primary mb-5"
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
      {trainer && <RegisterTrainer />}
      {trainee && <RegisterTrainee />}
    </>
  );
};
