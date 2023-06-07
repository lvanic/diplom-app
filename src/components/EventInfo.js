import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { GetServer } from '../helpers/GetServer';
import { Button, Form } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { userStateAtom } from '../atoms/userStateAtom';

export const EventInfo = () => {
    const [userState, setUserState] = useRecoilState(userStateAtom);
    const [event, setEvent] = useState()
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const id = location.pathname.split('/')[2]
        fetch(GetServer() + `/api/event/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEvent(data)
            })
    }, [])
    const eventChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }))
    }
    const unparticipate = (e) => {
        const id = location.pathname.split('/')[2]
        fetch(GetServer() + `/api/event/unparticipate?id=${id}`, { credentials: 'include', })
            .then((response) => {
                if (response.ok) alert('Вы успешно отписались от мероприятия!')
                else alert('Произошла какая-то ошибка!')
            })
            window.location.reload();
    }
    const participate = (e) => {
        const id = location.pathname.split('/')[2]
        fetch(GetServer() + `/api/event/participate?id=${id}`, { credentials: 'include', })
            .then((response) => {
                if (response.ok) alert('Вы успешно записались на мероприятие!')
                else alert('Вы уже записаны на это мероприятие!')
            })
            window.location.reload();
    }
    const deleteEvent = (e) => {
        const id = location.pathname.split('/')[2]
        const requestOption = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }
        fetch(GetServer() + `/api/event/${id}`, requestOption)
        navigate('/events')
    }
    const editEvent = (e) => {
        const id = location.pathname.split('/')[2]
        const requestOption = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(event),
        }
        fetch(GetServer() + `/api/event/${id}`, requestOption)
        setIsEdit(false)
        window.location.reload();
    }
    const deleteStudent = (id) => {
        const requestOption = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }
        fetch(GetServer() + `/api/event/${event.id}/student/${id}`, requestOption)
        setEvent((prevEvent) =>
        ({
            ...prevEvent,
            idУченикаs: prevEvent.idУченикаs.filter(x => x.id == id)
        }))
        window.location.reload();
    }
    return (
        <div className="d-flex flex-column align-items-center">
            <Card className='d-flex' style={{ width: '90%', minHeight: '50vh' }}>
                <Card.Body>
                    <Card.Title>{event?.название}</Card.Title>
                    <Card.Text>
                        {isEdit
                            ?
                            <Form.Control name='описание' type='text' value={event?.описание} onChange={eventChange} />
                            :
                            event?.описание
                        }
                        {
                            userState.role == 'Administrator' ?
                                <div onClick={() => setIsEdit(!isEdit)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </div>
                                : null
                        }

                    </Card.Text>

                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <Card.Text>
                                Место проведения - {event?.местоПроведения}
                            </Card.Text>
                            <Card.Text>
                                Организатор - {event?.idОрганизатораNavigation.фио}
                                (<a href={`tel:${event?.idОрганизатораNavigation.номерТелефона}`}>
                                    {event?.idОрганизатораNavigation.номерТелефона}</a>
                                /
                                <a href={`mailto:${event?.idОрганизатораNavigation.email}`}>
                                    {event?.idОрганизатораNavigation.email}</a>)
                            </Card.Text>
                            <Card.Text>
                                Количество мест - {event?.количествоМест}
                            </Card.Text>
                        </div>
                    </div>
                    <div>
                        <div>
                            {
                                new Date(event?.деньНачала) < new Date() ? 'Участники:' : 'Список записанных:'
                            }
                        </div>
                        <div>
                            {event?.idУченикаs?.map((x, indx) => (
                                <div key={indx} className='d-flex flex-row'>
                                    <div className='me-2'>{x.фио} - {x.idКлассаNavigation.номер}{x.idКлассаNavigation.буква}</div>
                                    {
                                        userState.role == 'Administrator' ?
                                            <div onClick={() => deleteStudent(x.id)} style={{cursor:'pointer'}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-dash-fill" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
                                                    <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                </Card.Body>
                <div className='ms-3 mb-2 d-flex justify-content-between align-items-center'>
                    <Card.Subtitle className="text-muted">{event?.деньНачала}({event?.времяНачала} - {event?.времяОкончания})</Card.Subtitle>
                    <Badge bg="secondary" className='me-3'>
                        {event?.типМероприятия}
                    </Badge>
                </div>
                {
                    userState.role == 'User'
                        ?
                        new Date(event?.деньНачала) > new Date() ?
                            event?.idУченикаs.findIndex(x => x.email == userState.email) == -1 ?
                                < Button variant='primary' className='ms-3 me-3 mb-3' onClick={participate}>Записаться</Button>
                                :
                                <Button variant='primary' className='ms-3 me-3 mb-3' onClick={unparticipate}>Отписаться</Button>
                            : null
                        : null
                }
                {
                    userState.role == 'Administrator'
                        ?
                        <Button variant='primary' className='ms-3 me-3 mb-3' onClick={deleteEvent}>Удалить</Button>
                        :
                        null
                }
                {
                    userState.role == 'Administrator' && isEdit
                        ?
                        <Button variant='primary' className='ms-3 me-3 mb-3' onClick={editEvent}>Сохранить изменения</Button>
                        :
                        null
                }

            </Card>
        </div >
    );
}
