import React from "react"

function Tables({tables =[]}) {

    const list = tables.length ? (
        tables.map((table) => {
            return(
                <div key={table.table_id} >
                    <ol>Table ID: {table.table_id}</ol>
                    <ol>Table Status: {table.status}</ol>
                    {/* <ol> Reservation ID{table.reservation_id}</ol> */}
                </div>
            )
        })
    ) : (
        "No Tables"
    )

  return(
        <>
            {list}
        </>
  )
}

export default Tables