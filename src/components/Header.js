import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userStateAtom } from '../atoms/userStateAtom';

export const Header = () => {
    const navigator = useNavigate();
    const [userState, setUserState] = useRecoilState(userStateAtom)
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand onClick={() => navigator('/')} style={{ cursor: 'pointer' }}>«Средняя школа №1 г. Несвижа»</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => navigator('/events')}>Мероприятия</Nav.Link>
                    {
                        userState.role == 'Administrator'
                            ?
                            <NavDropdown title="Управление аккаунтами" id="basic-nav-dropdown">
                                <Nav.Link onClick={() => navigator('/students')}>Ученики</Nav.Link>
                                <Nav.Link onClick={() => navigator('/teachers')}>Учители</Nav.Link>
                            </NavDropdown>
                            :
                            null
                    }
                    {
                        userState.role == 'Administrator' || userState.role == 'Teacher'
                            ?
                            <NavDropdown title="Управление мероприятиями" id="basic-nav-dropdown">
                                <Nav.Link onClick={() => navigator('/organizers')}>Организаторы</Nav.Link>
                                <Nav.Link onClick={() => navigator('/create-event')}>Создать мероприятие</Nav.Link>
                            </NavDropdown>
                            :
                            null
                    }
                </Nav>
                <Nav>
                    {userState.isAuth
                        ?
                        <Nav.Link onClick={() => navigator('/profile')}>{userState.email}</Nav.Link>
                        :
                        <Nav.Link onClick={() => navigator('/login')}>Войти</Nav.Link>}

                </Nav>
            </Container>
        </Navbar>
    );
}