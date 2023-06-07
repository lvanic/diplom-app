import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GetServer } from '../helpers/GetServer';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

export const CreateOrganizer = (props) => {
    const [organizer, setOrganizer] = useState({
        фио: '',
        email: '',
        номерТелефона: '',
    });
    const navigator = useNavigate()
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setOrganizer((prevOrganizer) => ({
            ...prevOrganizer,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(GetServer() + '/api/Organizer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(organizer),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                navigator('/events')
                // Обработка ответа от сервера
                console.log(data);
            })
            .catch(error => {
                // Обработка ошибки
                console.error(error);
            });
        console.log(organizer);
        window.location.reload();
    };

    return (
        <Modal className='' show={true} onHide={() => props.setModalOpen(false)}>
            {/* <div className='d-flex flex-column align-items-center'> */}
                <Form onSubmit={handleSubmit} className='p-3'>
                    <Form.Group controlId="formFullName">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            type="text"
                            name="фио"
                            value={organizer.фио}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={organizer.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="tel"
                            name="номерТелефона"
                            value={organizer.номерТелефона}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className='mt-2'>
                        Создать организатора
                    </Button>
                </Form>
            {/* </div> */}
        </Modal>
    );
};