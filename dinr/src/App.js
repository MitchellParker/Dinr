import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Friends from './pages/friends';
import LogIn from './pages/login';
import SignOut from './pages/signout';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signout' element={<SignOut />} />
      </Routes>
    </Router>
  );
}

export default App;
