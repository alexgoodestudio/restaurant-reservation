import React from "react";


function Search() {
    return (
      <>

      <form className="m-5 w-50">
        <h4>Search for Reservation</h4> 
        <input className="form-control" type="text"  id="search" placeholder="search" name="search"/>
        <button type="submit" className="btn btn-primary mt-2" >Save</button>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </form>
   

      </>
    );
  }
export default Search;