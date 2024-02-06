import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import AuthPageContain from '../components/FormCard';
import { CardText } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormCard from '../components/FormCard';
import axios from 'axios';
import InputError from '../components/InputError';
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm();
    

    const onSubmit = (data) => {
        console.log(data)
        if (data.password !== data.passwordConfirmation) {
            setError("passwordConfirmation", {
                type: "",
                message: "Conformation Password is not matches",
            })
            return
        }
        axios.post('http://localhost:5000/register', data)
            .then(function (resp) {
                reset()
                const data = resp.data
                if (resp.status === 200) {
                    if (data.token) {
                        localStorage.setItem('accessToken', data.token) 
                        navigate(from, {replace: true});
                        toast.success('Successfully Register')
                    }
                }
            })
            .catch(function (resp) {
                // handle error
                const error = resp.response.data.error
                setError(error.type, { type: "", message: error.message }) 
                toast.error(error.message)
            })           
    }
    return (
        <div id="auth-page">
            <FormCard header="SIGN UP">  
                <Form onSubmit={handleSubmit(onSubmit)}>                
                    <Form.Group className="mb-3">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text"
                            {...register("student_name", {
                                required: 'This Is Required',
                            })}
                        />
                        {errors.student_name && <InputError message={errors.student_name?.message}/>}                    
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control type="number"
                            {...register("student_id", {
                                required: 'This Is Required',
                            })}
                        />
                        {errors.student_id && <InputError message={errors.student_id?.message}/>}                    
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            {...register("password", {
                                required: 'This Is Required',
                            })}
                        />
                        {errors.password && <InputError message={errors.password?.message}/>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control
                            type="password"
                                {...register("passwordConfirmation", {
                                    required : 'This is Required',
                            })}
                        />
                        {errors.passwordConfirmation && <InputError message={errors.passwordConfirmation?.message}/>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>

                    <CardText className='d-flex justify-content-between pt-2 '>
                        Have an account?
                        <Link to="/login">Login</Link>
                    </CardText>
                </Form>
            </FormCard>
        </div>
    );
};

export default SignUp;