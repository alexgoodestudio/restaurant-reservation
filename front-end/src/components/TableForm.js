import { useHistory} from "react-router-dom";
import React, { useState } from "react";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";



function TableForm(){
    const history = useHistory();
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      table_name: "",
      capacity: Number(""),
    });
    
    function cancelAndReturn(){
        history.goBack()
      }

      function handleChange(event) {
        if(event.target.name === "capacity"){
          setFormData({
            ...formData,
            [event.target.name]: Number(event.target.value)
          })
        }else{
          setFormData({
            ...formData,
            [event.target.name]: event.target.value
        
        })
      }
      }
      const handleSubmit = async (event) => {
        event.preventDefault()
        const abortController = new AbortController()
        console.log("FormData", formData)
        try {
          await createTable(formData, abortController.signal)
          history.push(`/dashboard?date=${formData.reservation_date}`)
        } catch(error) {
          setError(error)
        }
      }
    

    return(
        <>
        <ErrorAlert error={error}/>
        <form onSubmit={handleSubmit} className="mt-3">
            <input placeholder="Table Name" onChange={handleChange} id= "table_name" className="" name="table_name"></input>
            <input placeholder="Capacity" onChange={handleChange} id= "capacity" className="" name="capacity"></input> 
            <br/>
            <button type="submit" className="btn btn-primary mt-2" >Save</button>
            <button className="btn btn-secondary mt-2" onClick={cancelAndReturn} >Cancel</button>
        </form>
        </>
    )
}

export default TableForm