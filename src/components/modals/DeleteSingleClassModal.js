import React from "react";

export default function DeleteSingleClassModal({ onAccept, onCancel, text }) {
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
        >
          {text}
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button
            onClick={() => {
              onAccept();
            }}
            className="btn_primary text-light p-2 rounded fw-bold mt-3"
            style={{ width: 100 }}
          >
            Yes
          </button>
          <button
            className="p-2 rounded fw-bold mt-3"
            style={{ background: "none", border: "none" }}
            onClick={() => {
              onCancel();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
