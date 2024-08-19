import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StudentListPage from './pages/StudentListPage';
import AttendancePage from './pages/AttendancePage';
import BookListPage from './pages/BookListPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentListPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/books" element={<BookListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
