import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import {useForm} from 'react-hook-form';
import Card from "./Card";
import {useSelector} from "react-redux";

export default function MyModal(props) {
    const [checked, setChecked] = useState(false);
    const [time, setTime] = useState(45);
    const [toast, setToast] = useState(false);
    const [inputData, setInputData] = useState();
    const week = useSelector((state) => state.data.currentWeek);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        defaultValues: {
            phone_number: '', seats_count: 0,
        }, mode: "onBlur"
    });

    const closeCard = () => {
        setToast(!toast);
    }

    const onHide = () => {
        setChecked(false);
        setTime(45);
        reset({phone_number: '', seats_count: 0})
        props.onHide();
        setToast(false);
    };

    const onSubmit = (payload) => {
        const data = {
            week: week,
            day: props.data.day,
            startTime: props.data.time,
            durationCount: time / 45,
            seatsCount: Number(payload.seats_count),
            phone: payload.phone_number
        };
        setInputData(data);
        setToast(true);
    };

    if (props.data?.seats === 0) return (<Modal {...props} size="lg" centered>
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
        </Modal>);

    return (<Modal {...props} size="lg" centered>
            <Modal.Header>
                <Modal.Title>Бронирование дорожки</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {<Card close={closeCard} show={toast} data={inputData} hideModal={onHide}/>}
                <h4>Введите данные</h4>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">

                        <Form.Label>Ваш номер телефона</Form.Label>

                        <Form.Control
                            {...register('phone_number', {
                                required: true, pattern: {
                                    value: /^[0-9]{11}$/, message: "Введите номер телефона"
                                }
                            })}
                            disabled={toast}
                            type="tel"
                            placeholder="89000000000"
                            className={errors?.phone_number && "is-invalid"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Количество дорожек</Form.Label>
                        <Form.Control
                            {...register('seats_count', {
                                required: true, min: {
                                    value: 1, message: "Минимум 1 дорожка"
                                }, max: {
                                    value: props.data?.seats, message: "Максимум" + props.data?.seats
                                }
                            })}
                            type="number"
                            disabled={toast}
                            placeholder={`Максимум ${props.data?.seats}`}
                            className={errors?.seats_count && "is-invalid"}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>На какое время?</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                style={{maxWidth: "300px"}}
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
                                -
                            </Button>
                            <Button
                                className="ms-2"
                                variant="outline-success"
                                disabled={time === 360 || toast}
                                onClick={() => setTime((prev) => prev + 45)}
                            >
                                +
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
                        type="submit"
                    >
                        Забронировать
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-primary" onClick={onHide} disabled={toast}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>);
}

const days = {
    0: "Понедельник", 1: "Вторник", 2: "Среда", 3: "Четверг", 4: "Пятница", 5: "Суббота", 6: "Воскресение",
};
