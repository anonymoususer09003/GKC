import React, { useState } from "react";

export default function DeleteRecurringClassModal({
  onAccept,
  onCancel,
  text1,
  text2,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: "rgba(0, 0, 0, 0.4)",
      }}
    >
      <div
        style={{
          background: "white",
          margin: "500px auto",
          padding: 20,
          width: "380px",
        }}
      >
        <p
          style={{
            width: 350,
            margin: "auto",
            textAlign: "center",
            fontSize: 18,
          }}
        ></p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "center",
          }}
        >
          <label
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <input
              type="radio"
              name="confirmation"
              value="single"
              onChange={() => setSelectedOption("single")}
              checked={selectedOption === "yes"}
              style={{ marginRight: "10px" }}
            />
            {text1}
          </label>
          <label
            style={{ marginTop: "10px", display: "flex", alignItems: "center" }}
          >
            <input
              type="radio"
              name="confirmation"
              value="future"
              onChange={() => setSelectedOption("future")}
              checked={selectedOption === "no"}
              style={{ marginRight: "10px", marginBottom: "3px" }}
            />
            {text2}
          </label>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => {
                onAccept(selectedOption);
              }}
              disabled={!selectedOption}
              className={`${
                selectedOption ? "btn_primary" : "btn_disabled"
              } text-light p-2 rounded fw-bold mt-3`}
              style={{ width: 100 }}
            >
              Confirm
            </button>
            <button
              className="p-2 rounded fw-bold mt-3"
              style={{ background: "none", border: "none" }}
              onClick={() => {
                onCancel();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
