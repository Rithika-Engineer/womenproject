import React, { useEffect, useState } from "react";

function Admin() {
  const [sosList, setSosList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/sos")
      .then((res) => res.json())
      .then((data) => setSosList(data))
      .catch((err) => console.error(err));
  }, []);

  fetch("http://localhost:5000/api/admin/sos", {
  headers: {
    "x-admin-key": "admin123"
  }
})
  .then((res) => res.json())
  .then((data) => setSosList(data))
  .catch((err) => console.error(err));


  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🚨 SOS Alerts (Admin)</h2>

      {sosList.length === 0 && <p>No SOS alerts found</p>}

      {sosList.map((sos, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <p><b>Message:</b> {sos.message}</p>
          <p><b>Time:</b> {new Date(sos.receivedAt).toLocaleString()}</p>

          {sos.location && (
            <p>
              <b>Location:</b> {sos.location.lat}, {sos.location.lng}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default Admin;
