import { useState } from "react";
import { finishTableStatus } from "../utils/api";


function Tables({ tables = [] }) {
    
    const [isButtonVisible, setIsButtonVisible] = useState(true); 
    
    async function clickHandler(){
      const finish = window.confirm("Is this table ready to seat new guests? This cannot be undone."); 
      if(finish){
          setIsButtonVisible(false)
          await finishTableStatus
            
        }
    }

    function handleSubmit(){

    }

    const list = tables.length ? (
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>Table ID</th>
              <th>Table Name</th>
              <th>Table Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.table_id}>
                <td>{table.table_id}</td>
                <td>{table.table_name}</td>
                <td data-table-id-status={table.table_id}>{table.status}</td>
                <td>
                  {table.status === "occupied" && isButtonVisible ? (
                    <button
                      onClick={clickHandler}
                      className="btn btn-primary"
                      data-table-id-finish={table.table_id}
                    >
                      Finish
                    </button>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No Tables"
      );
    
      return (
        <form onSubmit={handleSubmit}>
          {list}
        </form>
      );
    }
    
    export default Tables;