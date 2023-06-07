import { TeacherCard } from "./TeacherCard";
import { GetServer } from "../helpers/GetServer";
import { useEffect, useState } from "react";
import { StudnentCard } from "./StudentCard";
import CardGroup from 'react-bootstrap/CardGroup';
import { Button, Form, Row } from "react-bootstrap";
import { CreateStudent } from "./CreateStudent";

export const StudnentPlace = () => {
    const [students, setStudents] = useState([])
    const [searchStudents, setSearchStudents] = useState([])
    const [searchString, setSearchString] = useState('')
    const [isModalOpen, setModalOpen] = useState(false)
    const searchStringChange = (e) => {
        setSearchString(e.target.value)
    }
    useEffect(() => {
        fetch(GetServer() + "/api/student", { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setStudents(data)
            })
    }, [])

    useEffect(() => {
        if (searchString != '') {
            setSearchStudents(students.filter(x => x.фио.includes(searchString)
                || x.idКлассаNavigation?.номер == searchString
                || x.idКлассаNavigation?.буква == searchString
                || x.idКлассаNavigation?.номер + x.idКлассаNavigation?.буква == searchString
            ))
        } else {
            setSearchStudents(students)
        }
    }, [students, searchString])
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex align-items-stretch w-100">
                    <Button className="me-2" onClick={() => setModalOpen(!isModalOpen)}>Добавить</Button>
                    <Form.Control className="m-0" style={{ height: '50px' }} value={searchString} onChange={searchStringChange}></Form.Control>
                </div>
                {
                    isModalOpen ?
                        <CreateStudent setModalOpen={setModalOpen} />
                        :
                        null
                }
                {
                    searchStudents.map((student) =>
                        <StudnentCard key={student.id} student={student} />
                    )
                }
            </div>
        </div>
    )
}