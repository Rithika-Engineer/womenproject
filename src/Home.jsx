import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [contacts, setContacts] = useState([]);
  const [location, setLocation] = useState(null);
  const [sirenOn, setSirenOn] = useState(false);

  const sirenRef = useRef(null);

  // Load saved contacts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(saved);
  }, []);

  // Track internet status
  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);

    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  // Siren toggle
  const toggleSiren = () => {
    if (!sirenOn) {
      sirenRef.current.play();
      setSirenOn(true);
    } else {
      sirenRef.current.pause();
      sirenRef.current.currentTime = 0;
      setSirenOn(false);
    }
  };

  // When SOS popup opens — get location
  const openPopup = () => {
    setShowPopup(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        },
        () => setLocation(null)
      );
    }
  };

  // YES — Send SOS
  const handleSendSOS = () => {

    // vibrate feedback
    if (navigator.vibrate) {
      navigator.vibrate([300, 200, 300]);
    }

    setShowPopup(false);
    setShowSuccess(true);

    if (isOnline)
      setStatusText("✅ SOS Sent Successfully");
    else
      setStatusText("📦 SOS Stored — Will Send Later");

    setTimeout(() => {
      setShowSuccess(false);
      setStatusText("");
    }, 3000);
  };

  return (
    <div className="app">

      {/* TOP APP BAR */}
      <div className="app-header">
        Women Safety App
      </div>

      {/* MAIN SCREEN */}
      <div className="app-body">

        <div className={`status-bar ${isOnline ? "onlineBox" : "offlineBox"}`}>
          {isOnline
            ? "🟢 Online — SOS will send immediately"
            : "🔴 Offline — SOS will be stored"}
        </div>

        {/* BIG SOS BUTTON */}
        <button className="sos-btn" onClick={openPopup}>
          SOS
        </button>

        {/* SIREN */}
        <button className="action-btn siren-btn" onClick={toggleSiren}>
          {sirenOn ? "🔇 Stop Siren" : "🔊 Siren Alarm"}
        </button>

        {/* CONTACTS */}
        <Link to="/contacts">
          <button className="action-btn contacts-btn">
            👥 Emergency Contacts
          </button>
        </Link>

      </div>

      {/* BOTTOM BAR */}
      <div className="bottom-nav">
        Safety — Always With You
      </div>

      {/* AUDIO (hidden) */}
      <audio ref={sirenRef} src="/src/assets/siren.mp3" loop />

      {/* POPUP */}
      {showPopup && (
        <div className="popup-bg">
          <div className="popup-box">

            <h2>⚠ Emergency SOS</h2>

            {location ? (
              <p>
                📍 Location Attached
                <br />
                Lat: {location.lat.toFixed(4)} | Lng: {location.lng.toFixed(4)}
              </p>
            ) : (
              <p>📍 Location not available</p>
            )}

            <p>Alert will be sent to:</p>

            {contacts.length === 0 && (
              <p style={{ color: "red" }}>No contacts added</p>
            )}

            {contacts.map((c, i) => (
              <p key={i}>📩 {c.name} — {c.phone}</p>
            ))}

            <button className="yes-btn" onClick={handleSendSOS}>
              YES — Send SOS
            </button>

            <button className="cancel-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="success-box">
          {statusText}
        </div>
      )}

    </div>
  );
}

export default Home;
