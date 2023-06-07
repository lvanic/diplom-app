import { TeacherCard } from "./TeacherCard";
import { GetServer } from "../helpers/GetServer";
import { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { CreateTeacher } from "./CreateTeacher";

export const TeachersPlace = () => {
    const [teachers, setTeachers] = useState([])
    const [searchString, setSearchString] = useState('')
    const [searchTeachers, setSearchTeachers] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const searchStringChange = (e) => {
        setSearchString(e.target.value)
    }
    useEffect(() => {
        fetch(GetServer() + "/api/teacher")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTeachers(data)
            })
    }, [])
    useEffect(() => {
        if (searchString != '') {
            setSearchTeachers(teachers.filter(x => x.фио.includes(searchString)))
        } else {
            setSearchTeachers(teachers)
        }
    }, [teachers, searchString])
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex align-items-stretch w-100">
                    <Button className="me-2" onClick={() => setModalOpen(!isModalOpen)}>Добавить</Button>
                    <Form.Control placeholder="Поиск" className=" m-0" style={{ height: '50px' }} value={searchString} onChange={searchStringChange}></Form.Control>
                    {
                        isModalOpen ?
                            <CreateTeacher setModalOpen={setModalOpen} />
                            :
                            null
                    }
                </div>
                {
                    searchTeachers.map((teacher) =>
                        <TeacherCard key={teacher.id} teacher={teacher} />
                    )
                }
            </div>
        </div>
    )
}