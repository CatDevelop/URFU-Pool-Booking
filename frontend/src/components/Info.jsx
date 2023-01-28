import Accordion from "react-bootstrap/Accordion";

function BasicExample() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Услуги</Accordion.Header>
        <Accordion.Body>
          Свободное плавание (для студентов и сотрудников УрФУ –со скидкой). На
          обучение плаванию с инструктором и аквааэробику скидка не
          распространяется. Также ведется набор детских групп для обучения
          плаванию. Занятия проводят опытные тренеры по плаванию.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Что взять с собой?</Accordion.Header>
        <Accordion.Body>
          Посетителям бассейна при себе необходимо иметь справку от врача
          (терапевт/ педиатр) и плавательную шапочку. Иметь при себе купальный
          костюм (плавки или купальник), моющие принадлежности, губку,
          полотенце, сланцы. Шапочку для плавания иметь всем обязательно.
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Контакты</Accordion.Header>
        <Accordion.Body>ул. Коминтерна, 14а, (343) 375-93-84</Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3">
        <Accordion.Header>О бассейне</Accordion.Header>
        <Accordion.Body>
          Длина бассейна составляет 25 метров, глубина - 1,20-1,80 м, бассейн
          разделен на 6 дорожек. Согласно САНПИН 2.1.2.1188-03 норма человек на
          дорожке 8 взрослые, 12 дети.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default BasicExample;
