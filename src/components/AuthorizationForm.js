import React, { useState } from 'react';
import { Nav, Form, Button } from 'react-bootstrap';
import { GetServer } from '../helpers/GetServer';
import { useRecoilState } from 'recoil';
import { userStateAtom } from '../atoms/userStateAtom';
import { useNavigate } from 'react-router-dom';

export const AuthorizationForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userState, setUserState] = useRecoilState(userStateAtom)
    const navigator = useNavigate()
    const Authorization = async (e) => {
        if (email != '' && password != '') {
            const requestOption = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password }),
                credentials: 'include'
            }
            fetch(GetServer() + '/api/authorization', requestOption).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setUserState({ ...userState, isAuth: true, role: data.role, email: data.email })
                        navigator('/events')
                    })
                }
                else {
                    alert('Неверный логин или пароль!')
                }
            })
        }
    }

    return (
        <Nav className='justify-content-center'>
            <Form className='w-25-sm-  p-3'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder={'Email'} id='auth-email' onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="button" className='mt-2' onClick={Authorization}>
                    Войти
                </Button>
            </Form>
        </Nav>
    );
}
