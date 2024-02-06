import { useForm } from "react-hook-form";
import { Button, CardText, Form } from "react-bootstrap";
import FormCard from "../components/FormCard";
import axios from 'axios';
import InputError from '../components/InputError';
import getAccessToken from "../additional/getAccessToken";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


const Login = () => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError
    } = useForm();
       
    const onSubmit = (data) => {
        axios.post('http://localhost:5000/login', data)
            .then(function (resp) {
                reset()
                const data = resp.data
                if (resp.status === 200) {
                    reset();
                    if (data.token) {
                        localStorage.setItem('accessToken', data.token);                    
                        navigate(from, { replace: true });
                        toast.success('Login Successfully');
                    }
                }
            })
            .catch(function (resp) {
                // handle error
                const error = resp.response.data.error
                setError(error.type, { type: "", message: error.message })  
                toast.error(error.message);
            })
    }
    return (
        <div id="auth-page">
            <FormCard header="LOGIN UP">  
                <Form onSubmit={handleSubmit(onSubmit)}>
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

                    <Button variant="primary" type="submit">
                        Login
                    </Button>

                    <CardText className='d-flex justify-content-between pt-2 '>
                        Don't Have any account?
                        <Link to="/sign-up">Register</Link>
                    </CardText>
                </Form>
            </FormCard>
        </div>        
    );
};

export default Login;