import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MainTable from "./components/MainTable";
import Modal from "./components/Modal";
import Info from "./components/Info";
import WeekPicker from "./components/WeekPicker";
import Logo from "./components/logo.png";

function App() {
  const [id, setID] = useState(null);

  return (
    <div className="App">
      <Container>
        <Row className="mt-2">
          <Col md={6}>
            <div className="mb-6 d-flex">
              <div className="me-6">
                <img src={Logo} alt="logo" />
              </div>
              <h4>Бронирование бассейна УрФУ</h4>
            </div>
            <h5>
              6 дорожек длиной в 25 метров ждут всех желающих. Помимо студентов
              в ранние утренние и вечерние часы, а также в выходные дни по
              абонементной системе здесь могут заниматься все желающие. В числе
              преимуществ и особенностей бассейна: двойная отчистка озонирование
              и хлорирование, автоматизированная система наблюдения, которая
              выводит все необходимые данные, такие как температура воды и
              воздуха. За сутки вода в бассейне обновляется 2,5 раза.
            </h5>
          </Col>
          <Col className="text-center" md={5}>
            <h5>Выбрать неделю</h5>
            <WeekPicker />
          </Col>
        </Row>
        <div>
          <MainTable setID={setID} />
          <Modal
            show={id}
            onHide={() => {
              setID(null);
            }}
            data={id}
          />
        </div>
        <Info />
      </Container>
    </div>
  );
}

export default App;
