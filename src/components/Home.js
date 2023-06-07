import React from 'react';
import { Container, Accordion, Button } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { we } from '../data/we';
import { achivment } from '../data/achivment';
export const Home = () => {
    return (
        <Container>
            <Accordion>
                <h1>Добро пожаловать в школу №1 города Несвиж!</h1>
                <p>
                    Мы предлагаем высококачественное образование и разнообразные возможности для развития вашего ребенка.
                </p>
                <p>
                    Наша школа расположена в прекрасном и историческом городе Несвиж, где каждый ученик может обрести знания и навыки для успешного будущего.
                </p>
                <p>
                    <Button variant="primary" href="/events">Мероприятия</Button>
                </p>
            </Accordion>
            <h2>Наши достижения</h2>
            <p>
                Наша школа гордится своими достижениями в области образования. Мы обеспечиваем высокий уровень преподавания и активно поддерживаем участие учеников в различных мероприятиях и конкурсах.
            </p>
            <div className='slide-container'>
                <Slide slidesToScroll={1} slidesToShow={3} indicators={true} cssClass='slide'>
                    {achivment.map((card, index) => (
                        <Col className='h-100' key={index}>
                            <Card className="p-3 h-100">
                                <Card.Img variant='top' src={card.path} />
                                <Card.Body >
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>
                                        {card.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                    )}
                </Slide>
            </div>
            <h2>Наши ученики</h2>
            <p>
                Ученики нашей школы проявляют активность и талант в различных областях. Мы поддерживаем их развитие и помогаем достичь своих целей.
            </p>
            <div className="row d-flex flex-row">
                <div className="col-md-4">
                    <img src="/images/we1.jpg" alt="Ученик 1" className="img-fluid rounded" />
                </div>
                <div className="col-md-4">
                    <img src="/images/we2.jpg" alt="Ученик 2" className="img-fluid rounded" />
                </div>
                <div className="col-md-4">
                    <img src="/images/we3.jpg" alt="Ученик 3" className="img-fluid rounded" />
                </div>
            </div>
        </Container>
    );
};