
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';

import RoleSelection from './pages/RoleSelection';

import Signup from './pages/Signup';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import UserBookList from './pages/UserBookList';
import PcList from './pages/PcList';

import Home from './pages/Home';
import TeacherSignup from './pages/TeacherSignup';
import TeacherLogin from './pages/TeacherLogin';
import TeacherDashboard from './pages/TeacherDashboard'
import FacaultyBorrowBook from './pages/FacaultyBorrowBook';

import Booklist from './pages/Booklist';

import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import CreateBook from './pages/CreateBook';
import BookDetails from './pages/BookDetails';
import AllBooks from './pages/AllBooks';
import UpdateBook from './pages/updateBook';
import DeleteBook from './pages/DeleteBook';
import BorrowBook from './pages/BorrowBook';
import BorrowedBooks from './pages/BorrowedBooks'
import FacaultyBorrowedBooks from './pages/FacaultyBorrowedbooks';

import CreatePC from './pages/CreatePC';
import ListPC from './pages/ListPC';
import UpdatePC from './pages/UpdatePC';
import DeletePC from './pages/DeletePC';

import UserList from './pages/UserList';
import AddUser from './pages/AddUser';

import TeacherList from './pages/TeacherList';
import AddTeacher from './pages/AddTeacher';

import { useState } from 'react';
import RefrshHandler from './RefrshHandler';






function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }
  return (
    <div className="App">
    <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={ <RoleSelection />} />
      {/* <Route path='/' element={ <Navigate to="/login" />} /> */}
      <Route path='/login' element={ <Login />} />
      <Route path='/TeacherLogin' element={ <TeacherLogin /> } />
      <Route path='/AdminLogin' element={ <AdminLogin />} />
      <Route path='/signup' element={ <Signup />} />
      <Route path='/TeacherSignup' element={ <TeacherSignup /> } />
      <Route path='/AdminSignup' element={ <AdminSignup />} />
      <Route path='/home' element={ <Home />} />
      <Route path='/admin-dashboard' element={<PrivateRoute element={<AdminDashboard />} />} />
      <Route path='/teacher-dashboard' element={<PrivateRoute element={<TeacherDashboard />} />} />
      <Route path='/teacher/books' element={<Booklist />} />
      <Route path='/api/borrowed' element={<FacaultyBorrowBook />} />
      


      <Route path='/student-dashboard' element={<PrivateRoute element={<StudentDashboard />} />} />
      <Route path='/user/books' element={<UserBookList />} />
      <Route path='/api/pc' element={<PcList />} />

      <Route path="/admin/create-book" element={<CreateBook />} />
      <Route path="/admin/book-details/:AccNo" element={<BookDetails />} />
      <Route path="/admin/all-books" element={<AllBooks />} />
      <Route path="/update-book" element={<UpdateBook />} />
      <Route path="/admin/delete-book" element={<DeleteBook />} />
      <Route path="/borrow" element={<BorrowBook />} />
      <Route path="/borrowed-books" element={<BorrowedBooks />} />
      <Route path='/api/facaultyborrowed-books' element={<FacaultyBorrowedBooks />} />

      <Route path="/admin/create-pc" element={<CreatePC />} />
      <Route path="/admin/list-pc" element={<ListPC />} />
      <Route path="/admin/update-pc/:id" element={<UpdatePC />} />
      <Route path="/admin/delete-pc/:id" element={<DeletePC />} />

      <Route path="/admin/user" element={<UserList />} />
      <Route path="/add-user" element={<AddUser />} />

      <Route path="/admin/teacher" element={<TeacherList />} />
      <Route path="/add-teacher" element={<AddTeacher />} />

    </Routes>
    </div>
  );
}

export default App;