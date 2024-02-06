import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import AuthPageContain from '../components/FormCard';
import { CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroArea from '../components/HeroArea';
import FormCard from '../components/FormCard';

const GameSlotBooking = () => {
        const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => console.log(data);
    return (
        <HeroArea>
            <FormCard header="BOOK YOUR GAME">
                <Form onSubmit={handleSubmit(onSubmit)} style={{textAlign: 'start'}}>                
                    <Form.Group className="mb-3">
                        <Form.Label>Your ID</Form.Label>
                        <Form.Control type="number" />
                        <Form.Text className="text-muted">
                            Well never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password", {
                                required: 'This Is Required',
                            })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        BOOK NOW
                    </Button>
                </Form> 
            </FormCard>
        </HeroArea>
    );
};

export default GameSlotBooking;