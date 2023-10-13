import React, { useState } from "react";
import useQuery from "../utils/useQuery";

function Search() {
  const query = useQuery();
  const mobile_number = query.get("mobile_number")
  console.log("Query", mobile_number)
  const [results, setResults] = useState({});

  // const handleSubmit = async(event) =>{
  //   await searchCall
  // }

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
          placeholder="Enter a customer's phone number"
          name="search"
        />
        <button
          type="submit"
          onChange={handleChange}
          className="btn btn-primary mt-2"
        >
          Find
        </button>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </form>
    </>
  );
}

export default Search;
