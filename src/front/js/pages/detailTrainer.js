import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "./detail.css";
import { mappedCoachingStyle, mappedSpecialty } from "../utilities";

const fallbackImageUrl =
  "https://media.freemalaysiatoday.com/wp-content/uploads/2022/12/Nick-Bollettieri-Twitter.jpg";

export const DetailTrainer = () => {
  const { store, actions } = useContext(Context);
  const { pathname } = useLocation();
  const [, type, id] = pathname.split("/");

  useEffect(() => {
    actions.getGivenTrainer(id);
  }, []);

  const getImageUrl = () => {
    if (!store.givenTrainer.trainer?.profile_image_url) return fallbackImageUrl;
    const url = store.givenTrainer.trainer?.profile_image_url.split("/upload/");
    const findFace = "/upload/c_thumb,g_face,h_500,w_600/".concat(url[1]);
    const finalUrl = [url[0], findFace].join("");
    return finalUrl;
  };

  const getSpecialty = () =>
    mappedSpecialty.find(
      (el) => el.value === store.givenTrainer.trainer?.specialty
    )?.label;

  const getCoachingStyle = () =>
    mappedCoachingStyle.find(
      (el) => el.value === store.givenTrainer.trainer?.coaching_style
    )?.label;

  return (
    <div className="mt-5">
      <div className="container-fluid mt-6">
        <div className="container text-center">
          <div className="row">
            <div className="row">
              <h2 className="col-12 text-start">
                {store.givenTrainer?.firstName} {store.givenTrainer.lastName}
              </h2>
            </div>
            <div className="row">
              <div className="col-6 text-start mb-3">
                {store.givenTrainer?.city}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="col-6 text-start">
                {store.givenTrainer.trainer?.about}
              </div>
              <div className="col-6">
                <img
                  src={getImageUrl()}
                  alt="profile_image_url"
                  className="object-fit-contain detail-image col-12"
                  // className="img-fluid col-12"
                />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              EXPERIENCE LEVEL{" "}
              <h4 className="detail__section-title">
                {store.givenTrainer.trainer?.experience_level
                  .charAt(0)
                  .toUpperCase() +
                  store.givenTrainer.trainer?.experience_level.slice(1)}
              </h4>
            </div>
            &bull;
            <div className="col">
              SPECIALTY{" "}
              <h4 className="detail__section-title">{getSpecialty()}</h4>
            </div>
            &bull;
            <div className="col">
              COACHING STYLE{" "}
              <h4 className="detail__section-title">{getCoachingStyle()}</h4>
            </div>
            <Link to="/" className="detail__button-back">
              <span className="btn btn-secondary btn-lg" role="button">
                Back home
              </span>
            </Link>
          </div>
        </div>
      </div>
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
