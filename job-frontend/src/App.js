import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';
import JobPage from './components/JobPage';
import Viewdetails from './components/Viewdetails';
import Editjob from './components/Editjob';

export const server = 'https://aamish-job-listing.onrender.com/api/v1/user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/add-job' element={<JobPage />}></Route>
        <Route path='/edit-job/:id' element={<Editjob />}></Route>
        <Route path='/view-job-details/:id' element={<Viewdetails />}></Route>
        <Route path='/*' element={<Register />}></Route>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
