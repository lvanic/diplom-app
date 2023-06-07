import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { GetServer } from '../helpers/GetServer';

export const OrganizerCard = (props) => {
    const [isEditable, setIsEditable] = useState(false)
    const [organizer, setOrganizer] = useState(props.organizer)
    const deleteOrganizer = () => {
        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };
        fetch(GetServer() + `/api/organizer/${organizer.id}`, data)
        window.location.reload();
    }
    const setEdit = (e) => {
        if (isEditable) {
            const data = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(organizer),
                credentials: 'include',
            };

            fetch(GetServer() + `/api/organizer/${organizer.id}`, data)
            window.location.reload();
        }
        setIsEditable(!isEditable)
    }
    const organizerChangeInfo = (e) => {
        const { name, value } = e.target;
        setOrganizer(prevOrg => ({
            ...prevOrg,
            [name]: value
        }))
    }
    return (
        <Card className='teacherCard w-100 m-0 mb-1 mt-1'>
            <Card.Header>{organizer.фио}</Card.Header>
            <Card.Body className='p-0'>
                <blockquote className="blockquote mb-0 p-0 d-flex justify-content-around">
                    <p className='m-0'>
                        {'Почта: '}
                        {
                            isEditable ? <Form.Control type='text' name='email' onChange={organizerChangeInfo} value={organizer.email}></Form.Control>
                                : organizer.email
                        }
                        {' '}
                    </p>
                    <div className=''>
                        {'Номер телефона: '}
                        {
                            isEditable ? <Form.Control type='text' name='номерТелефона' onChange={organizerChangeInfo} value={organizer.номерТелефона}></Form.Control>
                                : organizer.номерТелефона
                        }
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                        <Button onClick={deleteOrganizer}>
                            Удалить
                        </Button>
                        <Button onClick={setEdit}>
                            Изменить
                        </Button>
                    </div>
                </blockquote>
            </Card.Body>
        </Card>
    );
}