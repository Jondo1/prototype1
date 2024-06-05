import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reservation from './pages/Reservation';
import Completed from './pages/Completed';
import Post from './pages/Post';
import RegisterSNS from './pages/RegisterSNS';
import CheckSNS from './pages/CheckSNS';
import Account from './pages/Account';
import LandingPage from './pages/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';
import AuthProvider from './context/AuthProvider';
import './App.css'; // 新しいスタイルシートを追加

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Route>
                    <Route path="/reservation" element={<PrivateRoute />}>
                        <Route path="/reservation" element={<Reservation />} />
                    </Route>
                    <Route path="/completed" element={<PrivateRoute />}>
                        <Route path="/completed" element={<Completed />} />
                    </Route>
                    <Route path="/post" element={<PrivateRoute />}>
                        <Route path="/post" element={<Post />} />
                    </Route>
                    <Route path="/register-sns" element={<PrivateRoute />}>
                        <Route path="/register-sns" element={<RegisterSNS />} />
                    </Route>
                    <Route path="/check-sns" element={<PrivateRoute />}>
                        <Route path="/check-sns" element={<CheckSNS />} />
                    </Route>
                    <Route path="/account" element={<PrivateRoute />}>
                        <Route path="/account" element={<Account />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
