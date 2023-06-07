import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { GetServer } from '../helpers/GetServer';
export const TeacherCard = (props) => {
    const [isEditable, setIsEditable] = useState(false)
    const [teacher, setTeacher] = useState(props.teacher)
    const [isMore, setIsMore] = useState(false)
    const setMore = (e) => {
        setIsMore(!isMore)
    }
    const MoreInfo = () => {
        return (
            <blockquote className="blockquote mb-0 p-0 d-flex flex-column">
                Подробная информация:
                <p className='m-0'>
                    {'Адрес: '}
                    {
                        teacher.адрес
                    }
                </p>
                <p className='m-0'>
                    {'Дата рождения: '}
                    {
                        teacher.датаРождения
                    }
                </p>
                <p className='m-0'>
                    {'Пол: '}
                    {
                        teacher.пол
                    }
                </p>
            </blockquote>
        )
    }
    const deleteTeacher = () => {
        const data = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        };
        fetch(GetServer() + `/api/teacher/${teacher.id}`, data)
        window.location.reload();
    }
    const setEdit = (e) => {
        if (isEditable) {

            const data = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(teacher),
                credentials: 'include',
            };

            fetch(GetServer() + `/api/teacher/${teacher.id}`, data)
            window.location.reload();
        }
        setIsEditable(!isEditable)
    }
    const teacherChangeInfo = (e) => {
        const { name, value } = e.target;
        setTeacher(prevStud => ({
            ...prevStud,
            [name]: value
        }))
    }
    return (
        <Card className='teacherCard w-100 m-0 mb-1 mt-1'>
            <Card.Header>{props.teacher.фио}</Card.Header>
            <Card.Body className='p-0'>
                <blockquote className="blockquote mb-0 p-0 d-flex justify-content-around">
                    <p className='m-0'>
                        {'Почта: '}
                        {
                            isEditable ? <Form.Control type='text' name='email' onChange={teacherChangeInfo} value={teacher.email}></Form.Control>
                                : teacher.email
                        }
                        {' '}
                    </p>
                    <p className='m-0'>
                        {'Номер телефона: '}
                        {
                            isEditable ? <Form.Control type='text' name='номерТелефона' onChange={teacherChangeInfo} value={teacher.номерТелефона}></Form.Control>
                                : '+' + teacher.номерТелефона
                        }
                        {' '}
                    </p>

                    <div className='d-flex flex-row justify-content-between'>
                        <Button onClick={deleteTeacher}>
                            Удалить
                        </Button>
                        <Button onClick={setMore}>
                            Подробнее
                        </Button>
                        <Button onClick={setEdit}>
                            Изменить
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