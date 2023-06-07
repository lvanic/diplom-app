import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GetServer } from '../helpers/GetServer';
import Modal from 'react-bootstrap/Modal';

export const CreateTeacher = (props) => {
    const [teacher, setTeacher] = useState({
        фио: '',
        email: '',
        номерТелефона: '',
        пароль: '',
        адрес: '',
        датаРождения: '',
        пол: 'Мужской',
        роль: 'Учитель'
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTeacher((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setModalOpen(false)
        fetch(GetServer() + '/api/teacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher),
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => {
                // Обработка ответа от сервера
                console.log(data);
            })
            .catch(error => {
                // Обработка ошибки
                console.error(error);
            });
        console.log(teacher);
        window.location.reload();
    };

    return (
        // <div className='position-absolute z-2 p-3 border rounded mt-5' style={{ backgroundColor: 'white' }}>
        <Modal className='' show={true} onHide={() => props.setModalOpen(false)}>
            <div className='d-flex flex-column align-items-center w-100 p-3'>
                <Form onSubmit={handleSubmit} className='w-100'>
                    <Form.Group controlId="formFullName">
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            type="text"
                            name="фио"
                            value={teacher.фио}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={teacher.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="tel"
                            name="номерТелефона"
                            value={teacher.номерТелефона}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="text"
                            name="пароль"
                            value={teacher.пароль}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formAdress">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            type="text"
                            name="адрес"
                            value={teacher.адрес}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBday">
                        <Form.Label>датаРождения</Form.Label>
                        <Form.Control
                            type="date"
                            name="датаРождения"
                            value={teacher.датаРождения}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBday">
                        <Form.Label>пол</Form.Label>
                        <Form.Select
                            name="пол"
                            onChange={handleInputChange}
                        >
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                            <option value="Другой">Другой</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between'>
                        <Button variant="primary" type="submit" className='mt-2'>
                            Создать учителя
                        </Button>
                        <Button variant="danger" onClick={() => { props.setModalOpen(false) }} className='mt-2'>
                            Отменить
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </Modal>
        // </div>
    );
};