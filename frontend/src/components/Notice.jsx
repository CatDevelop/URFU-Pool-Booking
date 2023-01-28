import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function PlacementExample() {
  return (
    <ToastContainer className="p-3" position={"top-center"}>
      <Toast>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">УрФУ</strong>
          <small>Только что</small>
        </Toast.Header>
        <Toast.Body>Вы успешно забронировали!</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default PlacementExample;
