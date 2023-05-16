import React, { useState } from "react";
import "./CardClass3.css";

const CardClass3 = ({ givenClass }) => {
  const [hovered, setHovered] = useState(false);

  const imageURL =
    "https://media.freemalaysiatoday.com/wp-content/uploads/2022/12/Nick-Bollettieri-Twitter.jpg";

  return (
    <div key={givenClass.id} className="card">
      <div
        className={`card-class3${hovered ? " card-class3--hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img src={imageURL} alt="test" className="card-class3__image" />
        <div className="card-class3__info">
          <h3 className="card-class3__name">
            {givenClass.trainerName?.toUpperCase()}
          </h3>
          <p className="card-class3__date-city">
            {givenClass.city?.toUpperCase()} /{" "}
            {givenClass.duration?.toUpperCase()}
          </p>
          {hovered && (
            <>
              <p className="card-class3__time-address">Date / Time</p>
              <a href="#" className="card-class3__button">
                View Details
              </a>
            </>
          )}
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
