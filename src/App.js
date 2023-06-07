import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { EventInfo } from './components/EventInfo';
import { EventPlace } from './components/EventPlace';
import { Header } from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TeachersPlace } from './components/TeachersPlace';
import { Footer } from './components/Footer';
import { AuthorizationForm } from './components/AuthorizationForm';
import { useLayoutEffect } from 'react';
import { GetServer } from './helpers/GetServer';
import { useRecoilState } from 'recoil';
import { userStateAtom } from './atoms/userStateAtom';
import { CreateEvent } from './components/CreateEvent';
import { StudnentPlace } from './components/StudentsPlace';
import { CreateOrganizer } from './components/CreateOrganizer';
import { Profile } from './components/Profile';
import { Home } from './components/Home';
import { OrganizersPlace } from './components/OrganizersPlace';
import { Support } from './components/Support';
function App() {
  const [userState, setUserState] = useRecoilState(userStateAtom)
  useLayoutEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    };
    fetch(GetServer() + '/api/Authorization/auto', requestOptions)
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserState({ ...userState, isAuth: true, role: data.role, email: data.email })
          })
        }
      })
      document.addEventListener('keydown', handleF1KeyPress);
    return () => {
      document.removeEventListener('keydown', handleF1KeyPress);
    }
  }, [])
  function handleF1KeyPress(event) {
    if (event.key === 'F1') {
      event.preventDefault(); // Предотвращаем стандартное поведение браузера для клавиши F1
      window.open('/support');
      console.log('Отображение справки');
    }
  }
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventPlace />} />
        <Route path="/events/:id" element={<EventInfo />} />
        <Route path="/teachers" element={<TeachersPlace />} />
        <Route path="/login" element={<AuthorizationForm />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/students" element={<StudnentPlace />} />
        <Route path="/organizers" element={<OrganizersPlace />} />
        {/* <Route path="/create-organizer" element={<CreateOrganizer />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
