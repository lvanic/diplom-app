import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { GetServer } from '../helpers/GetServer';
import Modal from 'react-bootstrap/Modal';

export const CreateStudent = (props) => {
    const [student, setStudent] = useState({
        фио: '',
        email: '',
        номерТелефона: '',
        пароль: '',
        адрес: '',
        датаРождения: '',
        пол: 'Мужской',
        idКласса: 12,
        роль: 'Ученик'
    });
    const [grades, setGrades] = useState([])

    useEffect(() => {
        fetch(GetServer() + "/api/grade")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setGrades(data)
            })
    }, [])
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStudent((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setModalOpen(false)
        fetch(GetServer() + '/api/student', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student),
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
        console.log(student);
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
                            value={student.фио}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control
                            type="tel"
                            name="номерТелефона"
                            value={student.номерТелефона}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="text"
                            name="пароль"
                            value={student.пароль}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAdress">
                        <Form.Label>Адрес</Form.Label>
                        <Form.Control
                            type="text"
                            name="адрес"
                            value={student.адрес}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBday">
                        <Form.Label>датаРождения</Form.Label>
                        <Form.Control
                            type="date"
                            name="датаРождения"
                            value={student.датаРождения}
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
                    <Form.Group controlId="formGrade">
                        <Form.Label>Класс</Form.Label>
                        <Form.Select
                            name="idКласса"
                            onChange={handleInputChange}
                        >
                            {
                                grades.map(x => <option value={x.id}>{x.номер + x.буква}</option>)
                            }

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='d-flex justify-content-between'>
                        <Button variant="primary" type="submit" className='mt-2'>
                            Создать ученика
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