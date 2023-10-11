import React from "react";

function Tables({ tables = [] }) {
    const list = tables.length
        ? tables.map((table) => {
            return (
                <div>
                    <div key={table.table_id} className="bg bg-light p-">
                        <div className="form-group row"></div>
                        <ol className="d-inline-block">Table ID: {table.table_id}</ol>
                        <ol className="d-inline-block">Table Name: {table.table_name}</ol>
                        <ol className="d-inline-block" data-table-id-status={table.table_id}>Table Status: {table.status}</ol>
                       
                        {table.status ==="occupied" ?  (<ol><button className="btn btn-primary d-inline">Finish</button></ol>): ""}

                        {/* onClick Finish button dissapears | updates Tables status to free | updates Reservations status to seated */}
                    </div>
                </div>
            );
        })
        : "No Tables";
    return <>{list}</>;
}

export default Tables;
