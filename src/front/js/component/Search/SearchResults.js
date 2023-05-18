import { useContext } from "react";
import * as React from "react";
import { Context } from "../../store/appContext";
import "../../../styles/home.css";
import "./search.css";
import CardClass3 from "../../component/CardClass3";

const NoResults = () => (
  <p>
    Unfortunately, your search did not find any events. How about trying a new
    activity?
  </p>
);

const SearchResults = ({ filteredEvents, searchPerformed }) => {
  const { store } = useContext(Context);

  console.log("filteredEvents", filteredEvents);

  if (!filteredEvents?.length && searchPerformed) return <NoResults />;
  return (
    <div>
      {store.allTypesActivities?.map((activityType) => {
        const activityClasses = filteredEvents?.filter(
          (givenClass) => givenClass.name == activityType.name
        );
        return (
          activityClasses?.length && (
            <>
              <h1 className="scrollerTitles">{activityType.name}</h1>
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
          )
        );
      })}
    </div>
  );
};

export default SearchResults;
