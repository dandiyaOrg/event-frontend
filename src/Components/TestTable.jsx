import React from "react";

const data = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
];

export default function TestTable() {
  return (
    <table>
      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            onClick={() => {
              console.log("row clicked:", row);
              alert(row.name);
            }}
            style={{ background: "#ff0", cursor: "pointer" }}
          >
            <td>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
