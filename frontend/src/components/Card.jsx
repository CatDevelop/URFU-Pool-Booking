import React, {useState} from "react";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import ToastContainer from "react-bootstrap/ToastContainer";
import LoadingButton from "./LoadingButton";
import {useForm} from "react-hook-form";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux";
import {book} from "../store/DataSlice";
import Button from "react-bootstrap/Button";

function PlacementExample(props) {
    const dispatch = useDispatch();
    const [isLoading, setLoading] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            card_number: '',
            card_name: '',
            card_date: '',
            card_cvc: '',
        },
        mode: "onBlur"
    });
    const handleClick = () => setLoading(true);

    const onSubmit = (payload) => {
        if (!isLoading)
            handleClick();
        const data = {
            ...props.data,
            cardNumber: payload.card_number,
            cardName: payload.card_name,
            cardDate: payload.card_date,
            cardCVC: Number(payload.card_cvc)
        };

        const bookToast = toast.loading("Отправляю запрос на сервер...")

        dispatch(book(data)).then(response => {
            console.log(response);
            if (response.payload.status !== 200)
                toast.update(bookToast, {
                    render: response.payload.error,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                });
            else {
                props.close();
                props.hideModal();
                toast.update(bookToast, {
                    render: response.payload.data,
                    type: "success",
                    isLoading: false,
                    autoClose: 5000
                });
            }
            setLoading(false);
        });
    };

    return (<ToastContainer className="p-3" position={"top-center"}>
        <Toast onClose={props.close} animation={true} show={props.show}>
            <Toast.Header closeButton={true}>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                <strong className="me-auto">УрФУ</strong>
                {/*<small>Только что</small>*/}
            </Toast.Header>
            <Toast.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Номер карты</Form.Label>
                        <Form.Control
                            {...register(
                                'card_number',
                                {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/, message: "Введите номер карты"
                                    }
                                })}
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            className={errors?.card_number && "is-invalid"}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Имя владельца</Form.Label>
                        <Form.Control
                            {...register('card_name', {
                                required: "Введите имя владельца карты"
                            })}
                            type="text"
                            placeholder="Имя"
                            className={errors?.card_name && "is-invalid"}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Срок действия</Form.Label>
                        <Form.Control
                            {...register('card_date', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]{2}\/[0-9]{2}$/i, message: "Введите срок действия карты"
                                }
                            })}
                            type="text"
                            placeholder="31/12"
                            className={errors?.card_date && "is-invalid"}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>CVC</Form.Label>
                        <Form.Control
                            {...register('card_cvc', {
                                required: true,
                                pattern: {
                                    value: /^[0-9]{3}$/,
                                    message: "Введите CVC код"
                                }
                            })}
                            type="text"
                            placeholder="CVC"
                            className={errors?.card_cvc && "is-invalid"}
                        />
                    </Form.Group>
                    <Button variant="primary"
                            disabled={isLoading}
                            type="submit"
                            //onClick={!isLoading ? handleClick : null}
                        >
                        {isLoading ? 'Загрузка…' : 'Оплатить'}
                    </Button>
                </Form>
            </Toast.Body>
        </Toast>
    </ToastContainer>);
}

export default PlacementExample;
