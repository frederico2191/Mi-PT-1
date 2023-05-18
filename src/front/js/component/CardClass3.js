import React, { useState } from "react";
import "./CardClass3.css";
import dayjs from "dayjs";

const CardClass3 = ({ givenClass }) => {
  const [hovered, setHovered] = useState(false);

  const imageURL =
    "https://media.freemalaysiatoday.com/wp-content/uploads/2022/12/Nick-Bollettieri-Twitter.jpg";

  return (
    <div
      key={givenClass.id}
      className={`card card-class3${
        hovered ? " card-class3--hovered" : ""
      } w-auto card-container mb-5 mx-2`}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="card-image__gradient" />
        <img src={imageURL} alt="test" className="card-class3__image" />
        <div className="card-class3__info">
          <div className="h-100 d-flex flex-column justify-content-end align-items-center">
            {hovered && (
              <>
                <a href="#" className="card-class3__button">
                  View Details
                </a>
                <p className="card-class3__time-address">
                  {console.log("papagay", dayjs(givenClass.date).format("LL"))}
                  {dayjs(givenClass.date).format("lll")}
                </p>
              </>
            )}
            <h3 className="card-class3__name">
              {givenClass.trainerName?.toUpperCase()}
            </h3>
            <p className="card-class3__date-city">
              {givenClass.city?.toUpperCase()} &bull; {givenClass.duration}min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardClass3;

// const CardClass3 = ({ givenClass }) => {
//   // Placeholder data for now, we'll receive the right props from fetch and other
//   // const placeholderTrainer = {
//   //   name: "Roger Federer",
//   //   imageURL:
//   //     "https://cdn.pixabay.com/photo/2015/07/15/12/52/roger-federer-846343_960_720.jpg",
//   // };

//   // const { name, imageURL } = trainer || placeholderTrainer;

//   return (
//     <div key={givenClass.id}>
//       <div className="card card-class3">
//         <img
//           src="
//         https://media.freemalaysiatoday.com/wp-content/uploads/2022/12/Nick-Bollettieri-Twitter.jpg"
//           alt="test"
//           className="card-class3__image"
//         />
//         <div className="card-class3__info">
//           <h3 className="card-class3__name">{givenClass.trainerName}</h3>
//           <p className="card-class3__details">
//             {givenClass.city} / {givenClass.duration}
//           </p>
//           <p className="card-class3__details">Date / Time</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardClass3;
