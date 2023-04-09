import React, { useState } from "react";
import { CreateFundModal } from "./CreateFundModal";

const modalStyles: any = {
  width: "250px",
  background: "red"
}

export default function Dashboard() {
    let subtitle: any;
    let modal: any;
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
      }
    
      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
        modal.style.color = '#f00';
      }
    
      function closeModal() {
        setIsOpen(false);
      }

  return (
    <div>
      <div
        style={{
          background: "#aaa",
          borderRadius: "20px",
          padding: "100px",
          alignItems: "center",
          textAlign: "center",
          fontSize: "20px",
        }}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <p>+</p>
        <p>create a fund</p>
      </div>

      {modalIsOpen && <CreateFundModal closeModal={closeModal}/>}
    </div>
  );
}
