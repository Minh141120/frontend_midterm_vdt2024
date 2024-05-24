import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.css';
const baseURL = "http://localhost:8080/api/student";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const studentsPerPage = 10;

    useEffect(() => {
        axios.get(baseURL)
            .then(response => {
                setStudents(response.data);
                setPageCount(Math.ceil(response.data.length / studentsPerPage));
            })
            .catch(error => {
                console.error('There was an error fetching the students!', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${baseURL}/${id}`)
            .then(response => {
                const updatedStudents = students.filter(student => student.id !== id);
                setStudents(updatedStudents);
                setPageCount(Math.ceil(updatedStudents.length / studentsPerPage));
            })
            .catch(error => {
                console.error('There was an error deleting the student!', error);
            });
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const displayStudents = students.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);

    return (
        <div className="container">
            <h2 className="mt-5">Student List</h2>
            <Link to="/add" className="btn btn-primary mb-3">Add Student</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>School</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayStudents.map(student => (
                        <tr key={student.id}>
                            <td>{student.fullname}</td>
                            <td>{student.gender}</td>
                            <td>{student.school}</td>
                            <td className="table-actions">
                                <Link to={`/edit/${student.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(student.id)} className="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default StudentList;
