import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

const NoResult = () => (
  <p>No Results found for your search. Please try again.</p>
);

const CityResponse = ({ name, country }) => (
  <div>
    <span className="d-flex">
      <b>Country:  </b>
      <p>{country}</p>
    </span>
    <span className="d-flex">
      <b>City:  </b>
      <p>{name}</p>
    </span>
  </div>
);

const RenderCityResponse = ({ shouldDisplay, result }) => {
  if (!shouldDisplay) return null;
  return result?.name ? (
    <CityResponse name={result.name} country={result.country} />
  ) : (
    <NoResult />
  );
};

const SearchCity = ({ city, setCity }) => {
  const { store, actions } = useContext(Context);
  const [searched, setSearched] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const result = await actions.searchCity(searched);
    setIsSubmitted(true);
    if (!result?.length) return setCity();
    setCity(result[0]);
  };

  const handleType = (event) => {
    event.preventDefault();
    setSearched(event.target.value);
  };

  return (
    <>
      <label hmtlFor="city" className="form-label">
        City
      </label>
      <input
        type="text"
        className="form-control"
        id="city"
        onChange={handleType}
      />
      <button type="button" class="btn btn-secondary" onClick={handleSearch}>
        Search
      </button>
      <RenderCityResponse shouldDisplay={isSubmitted} result={city} />
    </>
  );
};

export default SearchCity;
