import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from '../components/StudentForm';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then((response) => setStudents(response.data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  const addStudent = (student) => {
    if (currentStudent) {
      axios.put(`http://localhost:5000/api/students/${currentStudent._id}`, student)
        .then((response) => {
          setStudents(students.map((s) =>
            s._id === response.data._id ? response.data : s
          ));
          setCurrentStudent(null);
        })
        .catch((error) => console.error('Error updating student:', error));
    } else {
      axios.post('http://localhost:5000/api/students', student)
        .then((response) => setStudents([...students, response.data]))
        .catch((error) => console.error('Error adding student:', error));
    }
  };

  const editStudent = (id) => {
    const student = students.find((s) => s._id === id);
    setCurrentStudent(student);
  };

  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/api/students/${id}`)
      .then(() => setStudents(students.filter((s) => s._id !== id)))
      .catch((error) => console.error('Error deleting student:', error));
  };

  return (
    <div>
      <h1>Student List</h1>
      <StudentForm initialValues={currentStudent} onSubmit={addStudent} />
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.classLevel}
            <button onClick={() => editStudent(student._id)}>Edit</button>
            <button onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentListPage;
