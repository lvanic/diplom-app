import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { GetServer } from '../helpers/GetServer';

export const StudnentCard = (props) => {
    const [isEditable, setIsEditable] = useState(false)
    const [isMore, setIsMore] = useState(false)
    const [student, setStudent] = useState(props.student)
    const setMore = (e) => {
        setIsMore(!isMore)
    }
    const deleteStudent =() => {
        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };
        fetch(GetServer() + `/api/student/${student.id}`, data)
        window.location.reload();
    }
    const setEdit = (e) => {
        if (isEditable) {

            const data = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
                credentials: 'include',
            };

            fetch(GetServer() + `/api/student/${student.id}`, data)
            window.location.reload();
        }
        setIsEditable(!isEditable)
    }
    const studentChangeInfo = (e) => {
        const { name, value } = e.target;
        setStudent(prevStud => ({
            ...prevStud,
            [name]: value
        }))
    }
    const MoreInfo = () => {
        return (
            <blockquote className="blockquote mb-0 p-0 d-flex flex-column">
                Подробная информация:
                <p className='m-0'>
                    {'Адрес: '}
                    {
                        student.адрес
                    }
                </p>
                <p className='m-0'>
                    {'Дата рождения: '}
                    {
                        student.датаРождения
                    }
                </p>
                <p className='m-0'>
                    {'Пол: '}
                    {
                        student.пол
                    }
                </p>
            </blockquote>
        )
    }
    return (
        <Card className='teacherCard w-100 m-0 mb-1 mt-1'>
            <Card.Header>{student.фио}</Card.Header>
            <Card.Body className='p-0'>
                <blockquote className="blockquote mb-0 p-0 d-flex justify-content-around">
                    <p className='m-0'>
                        {'Почта: '}
                        {
                            isEditable ? <Form.Control type='text' name='email' onChange={studentChangeInfo} value={student.email}></Form.Control>
                                : student.email
                        }
                        {' '}
                    </p>
                    <p className='m-0'>
                        {'Пароль: '}
                        {
                            isEditable ? <Form.Control type='text' name='пароль' onChange={studentChangeInfo} value={student.пароль}></Form.Control>
                                : student.пароль
                        }
                    </p>
                    <div className=''>
                        {'Номер телефона: '}
                        {
                            isEditable ? <Form.Control type='text' name='номерТелефона' onChange={studentChangeInfo} value={student.номерТелефона}></Form.Control>
                                : student.номерТелефона
                        }
                    </div>
                    <div className='d-flex flex-row justify-content-between'>
                        <Button onClick={deleteStudent}>
                            Удалить
                        </Button>
                        <Button onClick={setEdit}>
                            Изменить
                        </Button>
                        <Button onClick={setMore}>
                            Подробнее
                        </Button>
                    </div>
                </blockquote>
                {
                    isMore ? <MoreInfo /> : null
                }
            </Card.Body>
        </Card>
    );
}