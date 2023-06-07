import { TeacherCard } from "./TeacherCard";
import { GetServer } from "../helpers/GetServer";
import { useEffect, useState } from "react";
import { StudnentCard } from "./StudentCard";
import CardGroup from 'react-bootstrap/CardGroup';
import { Button, Form, Row } from "react-bootstrap";
import { CreateStudent } from "./CreateStudent";
import { CreateOrganizer } from "./CreateOrganizer";
import { OrganizerCard } from "./OrganizerCard";

export const OrganizersPlace = () => {
    const [organizers, setOrganizers] = useState([])
    const [searchOrganizers, setSearchOrganizers] = useState([])
    const [searchString, setSearchString] = useState('')
    const [isModalOpen, setModalOpen] = useState(false)
    const searchStringChange = (e) => {
        setSearchString(e.target.value)
    }
    useEffect(() => {
        fetch(GetServer() + "/api/organizer", { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOrganizers(data)
            })
    }, [])

    useEffect(() => {
        if (searchString != '') {
            setSearchOrganizers(organizers.filter(x => x.фио.includes(searchString)
            ))
        } else {
            setSearchOrganizers(organizers)
        }
    }, [organizers, searchString])
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center w-100">
                <div className="d-flex align-items-stretch w-100">
                    <Button className="me-2" onClick={() => setModalOpen(!isModalOpen)}>Добавить</Button>
                    <Form.Control className="mt-1" style={{ height: '50px' }} value={searchString} onChange={searchStringChange}></Form.Control>
                </div>
                {
                    isModalOpen ?
                        <CreateOrganizer setModalOpen={setModalOpen} />
                        :
                        null
                }
                {
                    searchOrganizers.map((organizer) =>
                        <OrganizerCard key={organizers.id} organizer={organizer} />
                    )
                }
            </div>
        </div>
    )
}