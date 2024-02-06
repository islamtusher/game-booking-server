import React, { useEffect, useState } from 'react';
import HeroArea from '../components/HeroArea';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import Select from 'react-select';
import InputError from '../components/InputError';
import getAccessToken from '../additional/getAccessToken';
import { toast } from 'react-toastify';

const GamesList = () => {
    const [newAdded, setNewAdded] = useState(false)
    const [games, setGames] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [selectedGameType, setSelectedGameType] = useState('')
    const [selectedGameSlot, setSelectedGameSlot] = useState('')
    const dummyData = [
        {
            "game_name": "Chess",
            "type": "Board Game",
            "board_number": 64,
            "max_players": 2,
            "slots": [
                {
                    "start_time": "2024-02-04T14:00:00",
                    "end_time": "2024-02-04T15:30:00"
                },
                {
                    "start_time": "2024-02-05T16:00:00",
                    "end_time": "2024-02-05T17:30:00"
                }
            ]
        },
        {
            "game_name": "Monopoly",
            "type": "Board Game",
            "board_number": 40,
            "max_players": 4,
            "slots": [
            {
                "start_time": "2024-02-04T16:00:00",
                "end_time": "2024-02-04T18:00:00"
            },
            {
                "start_time": "2024-02-06T14:00:00",
                "end_time": "2024-02-06T15:30:00"
            }
            ]
        },
        {
            "game_name": "Poker",
            "type": "Card Game",
            "board_number": null,
            "max_players": 6,
            "slots": [
            {
                "start_time": "2024-02-05T19:00:00",
                "end_time": "2024-02-05T21:00:00"
            },
            {
                "start_time": "2024-02-06T18:00:00",
                "end_time": "2024-02-06T20:00:00"
            }
            ]
        },
        {
            "game_name": "Among Us",
            "type": "Online Multiplayer",
            "board_number": null,
            "max_players": 10,
            "slots": [
            {
                "start_time": "2024-02-04T20:00:00",
                "end_time": "2024-02-04T22:00:00"
            },
            {
                "start_time": "2024-02-05T22:30:00",
                "end_time": "2024-02-06T00:30:00"
            }
            ]
        }
    ]
    const handleAddNewGame = () => {
        setModalShow(true)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
        control,
        setValue
    } = useForm();

    const token = getAccessToken()
    
    useEffect(() => { 
        if (token) {
            axios.get(`http://localhost:5000/games`, {
                headers :{'accessToken' :  token}
            })
            .then(function (resp) {
                const data = resp.data
                console.log(data)
                setGames(data)
            })
            .catch(function (error) {
                // const error = resp.response.data.error
                toast.error(error.message)
            }) 
        }
    },[newAdded])

    const onSubmit = (data) => {
        axios.post(`http://localhost:5000/game-register`, data, {
            headers :{'accessToken' :  token}
        })
            .then(function (resp) {
                if (resp.status === 200) {
                    setNewAdded(!newAdded)
                    reset()
                    setModalShow(false)
                    toast.success(' Game Register Success')
                }
            })
            .catch(function (error) {
                // handle error
                // const error = resp.response.data.error
                toast.error(error.message)
            })           
    }

    const handleGameDelete = (game_name) => {
        if (token) {
            axios.delete(`http://localhost:5000/games/${game_name}`, {
                headers : {'accessToken' :  token}
            })
            .then(function (resp) {
                if (resp.status === 200) {
                    const data = resp.data
                    setGames(data)
                    toast.success('Delete Successfully')
                }
            })
            .catch(function (error) {
                // const error = resp.response.data.error
                toast.error(error.message)
            }) 
        }
    }

    const slots = [
        { label: '10 am - 11 am', value: '10 am - 11 am' },
        { label: '11 am - 12 am', value: '11 am - 12 am' },
        { label: '12 pm - 01 pm', value: '12 pm - 01 pm' },
        { label: '01 pm - 02 pm', value: '01 pm - 02 pm' },
        { label: '03 pm - 04 pm', value: '03 pm - 04 pm' },
        { label: '04 pm - 05 pm', value: '04 pm - 05 pm' },
    ]

    return (
        <HeroArea >
            <div className='game-list-contain'>
                <div className='d-flex justify-content-between py-2'>                    
                    <h4>Available Games</h4>
                    <button onClick={handleAddNewGame} className='btn btn-primary'>Add New Game</button>
                </div>
                <table className="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">SL</th>
                            <th scope="col">Game Name</th>
                            <th scope="col">Max Players</th>
                            <th scope="col">Type</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            games?.map((game, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">1</th>
                                        <td>{game.game_name}</td>
                                        <td>{game.max_members}</td>
                                        <td>{game.type}</td>
                                        <td>
                                            <div className='d-flex align-items-center justify-content-center' style={{gap: '10px'}}>
                                                <svg enableBackground="new 0 0 32 32" width="20" height="20" id="Editable-line" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" id="XMLID_10_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
                                                    <circle cx="16" cy="16" fill="none" id="XMLID_12_" r="5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
                                                </svg>
                                                <svg className="feather feather-edit" fill="none" width="20" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                                <svg onClick={()=>handleGameDelete(game.game_name)} enableBackground="new 0 0 40 40"  width="20" height="20" id="Слой_1" version="1.1" viewBox="0 0 40 40" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                                    <g><path d="M28,40H11.8c-3.3,0-5.9-2.7-5.9-5.9V16c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1c0,2.2,1.8,3.9,3.9,3.9H28c2.2,0,3.9-1.8,3.9-3.9V16   c0-0.6,0.4-1,1-1s1,0.4,1,1v18.1C33.9,37.3,31.2,40,28,40z" /></g>
                                                    <g><path d="M33.3,4.9h-7.6C25.2,2.1,22.8,0,19.9,0s-5.3,2.1-5.8,4.9H6.5c-2.3,0-4.1,1.8-4.1,4.1S4.2,13,6.5,13h26.9   c2.3,0,4.1-1.8,4.1-4.1S35.6,4.9,33.3,4.9z M19.9,2c1.8,0,3.3,1.2,3.7,2.9h-7.5C16.6,3.2,18.1,2,19.9,2z M33.3,11H6.5   c-1.1,0-2.1-0.9-2.1-2.1c0-1.1,0.9-2.1,2.1-2.1h26.9c1.1,0,2.1,0.9,2.1,2.1C35.4,10.1,34.5,11,33.3,11z" /></g>
                                                    <g><path d="M12.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C13.9,34.6,13.4,35.1,12.9,35.1z" /></g>
                                                    <g><path d="M26.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C27.9,34.6,27.4,35.1,26.9,35.1z" /></g>
                                                    <g><path d="M19.9,35.1c-0.6,0-1-0.4-1-1V17.4c0-0.6,0.4-1,1-1s1,0.4,1,1v16.7C20.9,34.6,20.4,35.1,19.9,35.1z" /></g>
                                                </svg>
                                            </div>                                            
                                        </td>
                                    </tr>
                                )
                            })
                        }                       
                    </tbody>
                </table>
            </div>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                 <Form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add New Game
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                                   
                        <Form.Group className="mb-3">
                            <Form.Label>Game Name</Form.Label>
                            <Form.Control type="text"
                                {...register("game_name", {
                                    required: 'This Is Required',
                                })}
                            />
                            {errors?.game_name && <InputError message={errors.game_name?.message}/>}                    
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Game Type</Form.Label>                            
                            <Controller
                                control={control}
                                rules={{
                                    required: 'This Is Required',
                                }}
                                name="type"
                                render={() => (
                                    <Select
                                        placeholder='Select'
                                        isClearable={true}
                                        isSearchable={true}
                                        options={[
                                            { label: 'Single', value: 'single' },
                                            { label: 'Multi', value: 'multi' },
                                        ]}
                                        value={selectedGameType}
                                        onChange={(val) => {
                                            setSelectedGameType(val || "")
                                            setValue('type', val?.value || "")
                                        }}
                                    />
                                )}
                            />                             
                            {errors?.type && <InputError message={errors.type?.message}/>}                    
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Game Slot</Form.Label>                            
                            <Controller
                                control={control}
                                rules={{
                                    required: 'This Is Required',
                                }}
                                name="slot"
                                render={() => (
                                    <Select
                                        isMulti
                                        placeholder='Select'
                                        isClearable={true}
                                        isSearchable={true}                                        
                                        options={slots}
                                        value={selectedGameSlot}
                                        onChange={(val) => {
                                            setSelectedGameSlot(val || "")
                                            const value = val?.map((value) => {
                                                return value.value;
                                            });
                                            setValue("slot", value || "");
                                        }}
                                    />
                                )}
                            />                             
                            {errors?.slot && <InputError message={errors.slot?.message}/>}                    
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Max Members</Form.Label>
                            <Form.Control
                                type="number"
                                {...register("max_members", {
                                    required: 'This Is Required',
                                })}
                            />
                            {errors?.max_members && <InputError message={errors.max_members?.message}/>}
                        </Form.Group>                                        
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setModalShow(false)}>Close</Button>
                         <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </HeroArea>
    );
};

export default GamesList;