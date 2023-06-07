import { GetServer } from "../helpers/GetServer";
import { useEffect, useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
    const [event, setEvent] = useState({
        Название: '',
        ДеньНачала: '',
        ВремяНачала: '',
        ВремяОкончания: '',
        МестоПроведения: '',
        ТипМероприятия: 'Образовательное',
        Описание: '',
        КоличествоМест: null,
        IdОрганизатора: null,
    });
    const [selectedUser, setSelectedUser] = useState('');
    const [organizers, setOrganizers] = useState([])
    const navigator = useNavigate()
    useEffect(() => {
        fetch(GetServer() + "/api/organizer", { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrganizers(data)
            })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const resultEvent = {
            ...event,
            ВремяНачала: event.ВремяНачала + ':00',
            ВремяОкончания: event.ВремяОкончания + ':00'
        }
        // Создаем объект с данными для отправки
        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultEvent),
            credentials: 'include',
        };

        // Отправляем запрос на сервер
        fetch(GetServer() + '/api/event', data)
            .then((response) => {
                if (response.status == 201) {
                    navigator('/events')
                    console.log('Мероприятие сохранено');
                } else {
                    console.error('Произошла ошибка при сохранении мероприятия');
                }
            })
            .catch((error) => {
                console.error('Произошла ошибка при отправке запроса', error);
            });
            window.location.reload();
    };
    const handleSelectChange = (event) => {
        setEvent((prevEvent) => ({
            ...prevEvent,
            IdОрганизатора: event.target.value,
        }));
        setSelectedUser(event.target.value);
    };

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <Form onSubmit={handleSubmit}
                    className="d-flex flex-column p-2 w-50 justify-content-between border border-dark rounded">
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Название:</Form.Label>
                        <Form.Control
                            type="text"
                            name="Название"
                            value={event.Название}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>День начала:</Form.Label>
                        <Form.Control
                            type="date"
                            name="ДеньНачала"
                            value={event.ДеньНачала}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Время начала:</Form.Label>
                        <Form.Control
                            type="time"
                            name="ВремяНачала"
                            value={event.ВремяНачала}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Время окончания:</Form.Label>
                        <Form.Control
                            type="time"
                            name="ВремяОкончания"
                            value={event.ВремяОкончания}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Место проведения:</Form.Label>
                        <Form.Control
                            type="text"
                            name="МестоПроведения"
                            value={event.МестоПроведения}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Тип мероприятия:</Form.Label>
                        <Form.Select
                            type="text"
                            name="ТипМероприятия"
                            value={event.ТипМероприятия}
                            onChange={handleChange}
                            className="w-50"
                        >
                            <option value="Образовательное">Образовательное</option>
                            <option value="Воспитательное">Воспитательное</option>
                            <option value="Развлекательное">Развлекательное</option>
                            <option value="Спортивное">Спортивное</option>
                            <option value="Оздоровительное">Оздоровительное</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Описание:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="Описание"
                            value={event.Описание}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Количество мест:</Form.Label>
                        <Form.Control
                            type="number"
                            name="КоличествоМест"
                            value={event.КоличествоМест || ''}
                            onChange={handleChange}
                            className="w-50"
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-between mb-2">
                        <Form.Label>Организатор:</Form.Label>
                        <div>
                            <Form.Select value={selectedUser} onChange={handleSelectChange}>
                                <option value="">Выберите пользователя</option>
                                {organizers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.фио}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                    </Form.Group>
                    <Button type="submit">Сохранить</Button>
                </Form>
            </div>
        </div>
    )
}
