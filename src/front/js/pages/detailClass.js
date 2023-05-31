import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "./detail.css";
import dayjs from "dayjs";
import { mappedCoachingStyle, mappedSpecialty } from "../utilities";
import ConfirmationModal from "../component/ConfirmationModal";

const fallbackImageUrl =
  "https://media.freemalaysiatoday.com/wp-content/uploads/2022/12/Nick-Bollettieri-Twitter.jpg";

const TrainerSection = () => {
  const { store, actions } = useContext(Context);

  const getSpecialty = () =>
    mappedSpecialty.find(
      (el) => el.value === store.givenTrainer.trainer?.specialty
    )?.label;

  const getCoachingStyle = () =>
    mappedCoachingStyle.find(
      (el) => el.value === store.givenTrainer.trainer?.coaching_style
    )?.label;

  return (
    <div className="class__trainer-section mx-2 mt-5">
      <div className="me-4">
        <Link to={`/trainer/${store.givenTrainer?.trainer?.id}`}>
          <h3>
            {store.givenTrainer?.firstName} {store.givenTrainer?.lastName}
          </h3>
        </Link>
        <p>
          <b>CITY </b>&bull;{store.givenTrainer?.city}
        </p>
        <p>
          <b>EXP LEVEL</b> &bull;{" "}
          {store.givenTrainer?.trainer?.experience_level}
        </p>
        <p>
          <b>SPECIALTY</b> &bull; {getSpecialty()}
        </p>
        <p>
          <b>COACHING STYLE</b> &bull; {getCoachingStyle()}
        </p>
      </div>
      <img
        src={store.givenClass?.profile_image_url || fallbackImageUrl}
        alt="trainer's profile image"
        className="object-fit-contain class__trainer-image"
      />
    </div>
  );
};

const ClassSection = ({ classId }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const isTrainee = store.user?.user_role == "trainee";
  const isAvailable = store.user?.givenClass?.trainee_id == null;

  const handleBookClass = async () => {
    const traineeId = store.user?.trainee?.id;
    const traineeName = store.user?.firstName;
    await actions.bookClass({ id: classId, traineeId, traineeName });
    const closeModal = document.getElementById("btn-close");
    closeModal?.click();
    navigate("/trainee/upcomingclasses");
  };

  return (
    <>
      <ConfirmationModal
        id="bookClass"
        message="Are you sure you want to book this class?"
        submitText="Confirm"
        title="Book Class"
        onConfirm={handleBookClass}
      />
      <div className="mx-2 class__class-section">
        <p>
          <b>DATE</b> &bull; {dayjs(store.givenClass?.date).format("lll")}
        </p>
        <p>
          <b>DURATION</b> &bull; {store.givenClass?.duration} min
        </p>
        <p>
          <b>CITY</b> &bull; {store.givenClass?.city}
        </p>
        <p>
          <b>ADDRESS</b> &bull; {store.givenClass?.address}
        </p>
        <p>
          <b>PRICE</b> &bull; {store.givenClass?.price} €
        </p>
        <p>
          <b>DESCRIPTION</b> &bull; {store.givenClass?.description}
        </p>
      </div>
      {isTrainee && isAvailable ? (
        <button
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#bookClass"
        >
          Book this Class
        </button>
      ) : null}
    </>
  );
};

export const DetailClass = () => {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    (async () => {
      await actions.getGivenClass({ id });
      const trainerId = store.givenClass?.trainer_id;
      await actions.getGivenTrainer(trainerId);
    })();
  }, [id]);

  return (
    <div className="detail-container">
      <TrainerSection />
      <div className="detail-separator" />
      <div className="d-flex flex-row align-items-center">
        &bull;
        <h2 className="fst-italic mb-0 mx-3">{store.givenClass?.name} Class</h2>
        &bull;
      </div>
      <div className="detail-separator" />
      <ClassSection classId={id} />
      <Link to="/">
        <span className="btn btn-secondary btn-lg mt-5" href="#" role="button">
          Back home
        </span>
      </Link>
    </div>
  );
  {
    /* <h1>
        This will show the demo element:{store.trainers[0].first_name}
        {store.trainers.map((elm) => (
          <Card item={elm} key={elm.id}></Card>
        ))}
      </h1> */
  }
};
