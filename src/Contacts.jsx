import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Contacts() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(saved);
  }, []);

  const saveContacts = (newList) => {
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  const addContact = () => {
    if (!name || !phone) {
      alert("Please enter both name and phone.");
      return;
    }

    const newList = [...contacts, { name, phone }];
    setContacts(newList);
    saveContacts(newList);

    setName("");
    setPhone("");
  };

  const deleteContact = (index) => {
    const newList = contacts.filter((_, i) => i !== index);
    setContacts(newList);
    saveContacts(newList);
  };

  return (
    <div className="app">
      <h1 className="title">Emergency Contacts</h1>

      <input
        className="inputBox"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="inputBox"
        placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button className="contacts-btn" onClick={addContact}>
        ➕ Add Contact
      </button>

      <h3>Saved Contacts</h3>

      {contacts.map((c, i) => (
        <div className="contactCard" key={i}>
          <div>
            <b>{c.name}</b><br />
            {c.phone}
          </div>

          <button className="deleteBtn" onClick={() => deleteContact(i)}>
            ❌
          </button>
        </div>
      ))}

      <Link to="/">
        <button className="contacts-btn">⬅ Back to Home</button>
      </Link>
    </div>
  );
}

export default Contacts;
