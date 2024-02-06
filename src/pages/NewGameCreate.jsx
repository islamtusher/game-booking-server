import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { CardText } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeroArea from '../components/HeroArea';

const NewGameCreate = () => {
     const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => console.log(data);
    return (
        <HeroArea>
            <Form onSubmit={handleSubmit(onSubmit)}>                
                <Form.Group className="mb-3">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" />
                    <Form.Text className="text-muted">
                        Well never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
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

                <Form.Group className="mb-3">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control
                        type="text"
                            {...register("passwordConfirmation", {
                                required : 'This is Required',
                        })}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirmation?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>

                <CardText className='d-flex justify-content-between pt-2 '>
                    Have an account?
                    <Link to="/login">Login</Link>
                </CardText>
            </Form>
        </HeroArea>
    );
};

export default NewGameCreate;