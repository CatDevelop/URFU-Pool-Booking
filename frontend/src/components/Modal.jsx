import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Notice from "./Notice";
import Card from "./Card";

export default function MyModal(props) {
  const [checked, setChecked] = useState(false);
  const [time, setTime] = useState(45);
  const [toast, setToast] = useState(false);

  const onHide = () => {
    setChecked(false);
    setTime(45);
    props.onHide();
    setToast(false);
  };

  const onSubmit = () => {
    setToast(true);
  };

  if (props.data?.seats === 0)
    return (
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Бронирование дорожки</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Извините, на данное время нет доступных дорожек</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={onHide}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    );

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header>
        <Modal.Title>Бронирование дорожки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {toast && <Card />}
        <h4>Введите данные</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Ваш номер телефона</Form.Label>
            <Form.Control
              disabled={toast}
              type="tel"
              placeholder="89000000000"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Количество дорожек</Form.Label>
            <Form.Control
              type="number"
              disabled={toast}
              placeholder={`Максимум ${props.data?.seats}`}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>На какое время?</Form.Label>
            <div className="d-flex">
              <Form.Control
                style={{ maxWidth: "300px" }}
                readOnly
                disabled
                value={time + " мин"}
              />
              <Button
                className="ms-2"
                variant="outline-secondary"
                disabled={time === 45 || toast}
                onClick={() => setTime((prev) => prev - 45)}
              >
                Меньше
              </Button>
              <Button
                className="ms-2"
                variant="outline-success"
                disabled={time === 360 || toast}
                onClick={() => setTime((prev) => prev + 45)}
              >
                Больше
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Время и день</Form.Label>
            <Form.Control
              disabled
              value={days[props.data?.day] + " " + props.data?.time}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              disabled={toast}
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              type="checkbox"
              label="Всё верно"
            />
          </Form.Group>
          <Button
            disabled={!checked || toast}
            variant="success"
            onClick={onSubmit}
          >
            Забронировать
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={onHide}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const days = {
  0: "Понедельник",
  1: "Вторник",
  2: "Среда",
  3: "Четверг",
  4: "Пятница",
  5: "Суббота",
  6: "Воскресение",
};
