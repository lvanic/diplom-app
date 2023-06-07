import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useLocation, useNavigate } from 'react-router-dom';

export const EventCard = (props) => {
    const navigator = useNavigate();
    const eventCardClick = (e) => {
        navigator('/events/' + props.event.id);
    }
    return (
        <Card className='eventCard' onClick={eventCardClick}>
            <Card.Header>{props.event.название}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {' '}
                        {props.event.описание}{' '}
                    </p>
                    <div className='d-flex align-items-center justify-content-between'>
                    <Card.Text className='text-muted'>
                        {props.event.деньНачала}({props.event.времяНачала} - {props.event.времяОкончания})
                    </Card.Text>
                    <Badge bg="secondary">
                        {props.event.типМероприятия}
                    </Badge>
                    </div>
                </blockquote>
            </Card.Body>
        </Card>
    );
}