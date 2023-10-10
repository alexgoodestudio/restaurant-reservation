import React, { useState } from "react";
import useQuery from "../utils/useQuery";
//useQuery is a helper function to obtain search results

function Search() {
  const query = useQuery();
  // figure out how to use this function to display search results

  const [results, setResults] = useState({});

  const handleChange = (event) => {
    setResults({
      ...results,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <form className="m-5 w-50">
        <h4>Find Reservation</h4>
        <input
          className="form-control"
          type="text"
          id="search"
          placeholder="Search"
          name="search"
        />
        <button
          type="submit"
          onChange={handleChange}
          className="btn btn-primary mt-2"
        >
          Save
        </button>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </form>
    </>
  );
}

export default Search;
