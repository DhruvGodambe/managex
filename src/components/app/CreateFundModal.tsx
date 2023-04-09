import React, { useState } from "react";

export const CreateFundModal = ({closeModal}: any) => {
  return (
    <div className="modal">
      <div className="overlay">
        <div
          className="modal-content"
          style={{
            width: "50%",
            top: "30%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <h1>Select Portfolio Assets</h1>
            <div style={{ float: "right", padding: "0 20px" }} onClick={closeModal}>X</div>
          </div>
          <div>
            <div>ETH</div>
            <div>WBTC</div>
            <div>BNB</div>
          </div>
        </div>
      </div>
    </div>
  );
};
