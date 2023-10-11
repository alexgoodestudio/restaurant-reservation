import React, { useState, useEffect } from "react";
import { seatedReservation, listTables } from "../utils/api"; // Assuming listTables is your API call to get tables

function SeatPage() {
  const [input, setInput] = useState({ table_id: "" });
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setError);
    return () => abortController.abort();
  }, []);

  function changeHandler(event) {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  }
console.log(input,"ABCDEFG")
  async function submitHandler(event) {
    event.preventDefault();
    const abortController = new AbortController();
    try {
       const data= await seatedReservation(input.table_id, abortController.signal);
       console.log(data,"DATA");
    } catch (error) {
      setError(error);
    }
  }
  
//reservations table status to seated
//tables table status to occupied
  return (
    <>
      <form onSubmit={submitHandler}>
        <select name="table_id" id="tables" onChange={changeHandler} value={input.table_id}>
          {tables.map((table) => (
            <option key={table.table_id} value={table.table_id}>
              {`Table Name: ${table.table_name} - Capacity: ${table.capacity}`}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {error && <div>Error: {error.message}</div>}
    </>
  );
}

export default SeatPage;
