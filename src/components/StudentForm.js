import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const baseURL = "http://localhost:8080/api/student";

const StudentForm = () => {
    const [student, setStudent] = useState({ fullname: '', gender: '', school: '' });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`${baseURL}/${id}`)
                .then(response => {
                    setStudent(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the student!', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            axios.put(`${baseURL}`, student)
                .then(response => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('There was an error updating the student!', error);
                });
        } else {
            axios.post(`${baseURL}`, student)
                .then(response => {
                    navigate('/');
                })
                .catch(error => {
                    console.error('There was an error creating the student!', error);
                });
        }
    };

    return (
        <div className="container">
            <h2 className="mt-5">{id ? 'Edit Student' : 'Add Student'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fullname"
                        value={student.fullname}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>School</label>
                    <input
                        type="text"
                        className="form-control"
                        name="school"
                        value={student.school}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">{id ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default StudentForm;
