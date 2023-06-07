import { useEffect, useState } from "react"
import { GetServer } from "../helpers/GetServer"
import { EventCard } from "./EventCard"
import Pagination from 'react-bootstrap/Pagination';
import { useLocation } from "react-router-dom";
import { Card, Form } from "react-bootstrap";

export const EventPlace = () => {
    const [filter, setFilter] = useState('none')
    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)))
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(1)
    const [isDisabledFirst, setIsDisabledFirst] = useState(false)
    const [isDisabledSecond, setIsDisabledSecond] = useState(false)
    const [events, setEvents] = useState([])
    const [selected, setSelected] = useState(-1)
    const location = useLocation();
    const setOlder = (e) => {
        if (selected != 0) {
            setDateStart(new Date(0))
            setDateEnd(new Date())
            setSelected(0)
        } else {
            setDateStart(new Date())
            setDateEnd(new Date(new Date().setMonth(new Date().getMonth() + 1)))
            setSelected(-1)
        }
    }
    const setFuture = (e) => {
        if (selected != 1) {
            setDateStart(new Date())
            setDateEnd(new Date("2100"))
            setSelected(1)
        } else {
            setDateStart(new Date())
            setDateEnd(new Date(new Date().setMonth(new Date().getMonth() + 1)))
            setSelected(-1)
        }
    }
    const dateStartChange = (e) => {
        setDateStart(new Date(e.target.value))
    }
    const dateEndChange = (e) => {
        setDateEnd(new Date(e.target.value))
    }
    const filterChange = (e) => {

    }
    useEffect(() => {
        if (location.search != '') {
            setPage(Number(location.search.split('=')[1]))
        }
    }, [])

    useEffect(() => {
        const start = `${dateStart.getFullYear()}-${dateStart.getMonth() + 1}-${dateStart.getDate()}`
        const end = `${dateEnd.getFullYear()}-${dateEnd.getMonth() + 1}-${dateEnd.getDate()}`
        fetch(GetServer() + `/api/event?page=${page}&filter=${filter}&startDate=${start}&endDate=${end}`)
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.events)
                setTotal(data.total)
            })

        if (page == 1) {
            setIsDisabledFirst(false)
        }
        else if (page == 2) {
            setIsDisabledFirst(false)
        } else {
            setIsDisabledFirst(true)
        }

        if (page == total - 1) {
            setIsDisabledSecond(false)
        }
        else if (page == total) {
            setIsDisabledSecond(false)
        }
        else {
            setIsDisabledSecond(true)
        }
    }, [page, total, dateStart, dateEnd])

    const paginationClick = (index) => {

        if (index == -4) {
            setPage(total)
        }
        else if (index == -1) {
            setPage(1)
        }
        else if (index == -2) {
            if (page > 1)
                setPage(page - 1)
        }
        else if (index == -3) {
            if (page < total)
                setPage(page + 1)
        }
        else {
            setPage(index)
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center" style={{ width: '50%' }}>
                <Card className="mb-3">
                    <Card.Body className="p-0">
                        <Card.Header>Фильтры</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0 d-flex flex-column">
                                <div className="d-flex">
                                    <div>
                                        <Form.Label placeholder="Начиная с:" >Начиная:</Form.Label>
                                        <Form.Control value={dateStart.toISOString().split('T')[0]} type="date" onChange={dateStartChange} />
                                    </div>
                                    <div>
                                        <Form.Label placeholder="Заканчивая с:" >Заканчивая:</Form.Label>
                                        <Form.Control value={dateEnd.toISOString().split('T')[0]} type="date" onChange={dateEndChange} />
                                    </div>
                                </div>
                                <div>
                                    <Form.Group className="d-flex justify-content-between">
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label placeholder="Прошедшие" >Прошедшие</Form.Label>
                                            <input checked={selected == 0} type="radio" name="datacheck" onClick={setOlder} />
                                        </div>
                                        <div className="d-flex flex-column align-items-center">
                                            <Form.Label placeholder="Будущие>" >Будущие</Form.Label>
                                            <input checked={selected == 1} type="radio" name="datacheck" onClick={setFuture} />
                                        </div>
                                    </Form.Group>
                                </div>
                            </blockquote>
                        </Card.Body>
                    </Card.Body>
                </Card>
                {
                    events.map((event) =>
                        <EventCard key={event.id} event={event} />
                    )
                }
                <Pagination>
                    <Pagination.First onClick={() => paginationClick(-1)} />
                    <Pagination.Prev onClick={() => paginationClick(-2)} />

                    {isDisabledFirst ?
                        <>
                            <Pagination.Item onClick={() => paginationClick(1)}>{1}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item onClick={() => paginationClick(page - 1)}>{page - 1}</Pagination.Item>
                        </> : page == 2 ?
                            <Pagination.Item onClick={() => paginationClick(1)}>{1}</Pagination.Item>
                            :
                            null}

                    <Pagination.Item active>{page}</Pagination.Item>

                    {isDisabledSecond ?
                        <>
                            <Pagination.Item onClick={() => paginationClick(page + 1)}>{page + 1}</Pagination.Item>
                            <Pagination.Ellipsis />
                            <Pagination.Item onClick={() => paginationClick(total)}>{total}</Pagination.Item>
                        </> : page == total - 1 ?
                            <Pagination.Item onClick={() => paginationClick(total)}>{total}</Pagination.Item>
                            :
                            null
                    }

                    <Pagination.Next onClick={() => paginationClick(-3)} />
                    <Pagination.Last onClick={() => paginationClick(-4)} />
                </Pagination>
            </div>
        </div>
    )
}