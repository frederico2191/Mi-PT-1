import { useContext, useEffect } from "react";
import * as React from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CardClass3 from "../component/CardClass3";

export const Home = () => {
  const { store, actions } = useContext(Context);
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
      <div className="text-center mt-5 mb-5">
        <h1>Activities</h1>
        <p className="">
          Check the broad range of activities we have to offer, hosted by our
          experienced Trainers. Get ready to break a sweat!
        </p>
      </div>
      <div>
        <div>
          {store.allTypesActivities?.map((x) => {
            const activityClasses = store.allClasses?.filter(
              (givenClass) =>
                !givenClass.trainee_id && givenClass.name == x.name
            );
            return (
              <>
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
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
