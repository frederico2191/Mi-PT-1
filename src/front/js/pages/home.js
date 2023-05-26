import { useContext, useEffect, useState } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardClass3 from "../component/CardClass3";
import coverImage from "../../img/coverImage.jpeg";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [isHovered, setIsHovered] = useState(false);
  const user = store.user;

  useEffect(() => {
    (async () => {
      if (store.token && store.token != "" && store.token != undefined)
        await actions.getMessage();
      await actions.getAllTypesActivities();

      await actions.getAllClasses();
    })();
  }, [store.token, user]);

  return (
    <div>
      <div className="cover-image-container mb-3">
        <img className="img-fluid" src={coverImage} />
        <div
          className={`img__overlay img__overlay--${isHovered ? "on" : "off"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h1
            className={`fs-1 fw-600 img__overlay-text img__overlay-text--${
              isHovered ? "on" : "off"
            }`}
          >
            Welcome to Mi-PT
          </h1>
        </div>
      </div>
      <div className="text-center mt-4 mb-4 mx-2">
        <p className="fs-5">
          Check the broad range of activities we have to offer, hosted by our
          most experienced trainers. <br />
          Get ready to break a sweat!
        </p>
      </div>
      <div>
        <div className="mx-2">
          {store.allTypesActivities?.map((x) => {
            const activityClasses = store.allClasses?.filter(
              (givenClass) =>
                !givenClass.trainee_id && givenClass.name == x.name
            );
            return (
              <div key={x.id}>
                {activityClasses.length > 0 ? (
                  <>
                    <h1 className="scrollerTitles">{x.name}</h1>
                    <div className="list-group horizontal-scroller">
                      {activityClasses?.map((givenClass) => {
                        return (
                          <CardClass3
                            key={givenClass.id}
                            givenClass={givenClass}
                          ></CardClass3>
                        );
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
