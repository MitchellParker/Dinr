import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Friends from './pages/friends';
import Login from './pages/login';
import SignOut from './pages/signout';
import { AuthProvider, } from './useAuth';
import RequireAuth from './components/requireAuth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <Friends />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signout" element={<SignOut />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
