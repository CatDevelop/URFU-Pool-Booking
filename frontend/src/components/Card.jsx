import React from "react";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import ToastContainer from "react-bootstrap/ToastContainer";
import Button from "react-bootstrap/Button";

function PlacementExample() {
  return (
    <ToastContainer className="p-3" position={"top-center"}>
      <Toast>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">УрФУ</strong>
          <small>Только что</small>
        </Toast.Header>
        <Toast.Body>
          <Form.Group className="mb-3">
          <Form.Label>Номер карты</Form.Label>
          <Form.Control
              type="tel"
              name="number"
              placeholder="0000 0000 0000 0000"
            />
            <Form.Label>Имя владельца</Form.Label>
            <Form.Control
              type="tel"
              name="name"
              placeholder="Имя"
            />
            <Form.Label>Срок действия</Form.Label>
            <Form.Control
              type="tel"
              name="expiry"
              placeholder="0101"
            />
            <Form.Label>CVC</Form.Label>
            <Form.Control
              type="tel"
              name="cvc"
              placeholder="CVC"
            />
          </Form.Group>
          <Button type = "submit">Оплатить</Button>
          </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default PlacementExample;
