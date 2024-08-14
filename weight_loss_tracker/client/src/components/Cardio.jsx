import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../utils/auth";
import { createCardio } from '../utils/API';
import Header from "./Header";
import cardioIcon from "../assets/images/cardio-w.png";

const Cardio = () => {
    const [cardioForm, setCardioForm] = useState({
        name: "",
        distance: "",
        duration: "",
        date: "",
    });
    const [startDate, setStartDate] = useState(new Date());
    const [message, setMessage] = useState("");
    const loggedIn = Auth.loggedIn();

    const handleCardioChange = (event) => {
        const { name, value } = event.target;
        setCardioForm({ ...cardioForm, [name]: value });
    };

    const handleDateChange = (date) => {
        setStartDate(date);
        handleCardioChange({
            target: { name: "date", value: date },
        });
    };

    const validateForm = (form) => {
        return form.name && form.distance && form.duration && form.date;
    };

    const handleCardioSubmit = async (event) => {
        event.preventDefault();

        // get token
        const token = loggedIn ? Auth.getToken() : null;
        if (!token) return false;

        // get user id
        const userId = Auth.getUserId();

        // cardio submit
        if (validateForm(cardioForm)) {
            try {
                // add userId to cardio form
                cardioForm.userId = userId;

                const response = await createCardio(cardioForm, token);

                if (!response.ok) {
                    throw new Error("something went wrong!");
                }

                setMessage("Cardio successfully added!");
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } catch (err) {
                console.error(err);
            }
        }

        // clear form input
        setCardioForm({
            name: "",
            distance: "",
            duration: "",
            date: "",
        });
    };

    if (!loggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="container my-5">
            <Header />
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Add Exercise</h2>
                            <form className="cardio-form" onSubmit={handleCardioSubmit}>
                                <div className="text-center mb-4">
                                    <img alt="cardio" src={cardioIcon} className="exercise-form-icon" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Running"
                                        value={cardioForm.name}
                                        onChange={handleCardioChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="distance">Distance (miles):</label>
                                    <input
                                        type="number"
                                        name="distance"
                                        id="distance"
                                        placeholder="0"
                                        value={cardioForm.distance}
                                        onChange={handleCardioChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Duration (minutes):</label>
                                    <input
                                        type="number"
                                        name="duration"
                                        id="duration"
                                        placeholder="0"
                                        value={cardioForm.duration}
                                        onChange={handleCardioChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">Date:</label>
                                    <DatePicker
                                        selected={startDate}
                                        value={cardioForm.date}
                                        onChange={handleDateChange}
                                        placeholderText="mm/dd/yyyy"
                                        className="form-control"
                                    />
                                </div>
                                <div className="text-center">
                                    <button
                                        className="btn btn-primary cardio-submit-btn"
                                        type="submit"
                                        disabled={!validateForm(cardioForm)}
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                            <p className="text-center mt-3 message">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cardio;

//  this Cardio component provides a user-friendly interface for adding new cardio exercises to the fitness tracker application. It handles form validation, data submission, and user authentication to ensure a smooth user experience.