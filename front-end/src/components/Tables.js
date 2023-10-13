import { useState } from "react";
import { finishTableStatus } from "../utils/api";

function Tables({ tables = [] }) {
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  async function clickHandler(tableId) {
    const finish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (finish) {
      setIsButtonVisible(false);
      await handleSubmit(tableId);
    }
  }

  async function handleSubmit(tableId) {
    console.log("TABLETABLETABLEID", tableId);
    const abortController = new AbortController();
    await finishTableStatus(tableId, abortController.signal);
  }

  const list = tables.length ? (
    <table className="table ">
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
                  onClick={() => clickHandler(table.table_id)}
                  className="btn btn-outline-primary"
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

  return <div>{list}</div>;
}

export default Tables;
