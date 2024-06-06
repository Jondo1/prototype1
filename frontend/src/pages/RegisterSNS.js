import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const RegisterSNS = () => {
    const [sns, setSns] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/sns/register', { sns, username, password });
            setSuccess(response.data.message);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Registration failed. Please try again.');
            }
            console.error('Registration Error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>SNS</label>
                <select value={sns} onChange={(e) => setSns(e.target.value)}>
                    <option value="">Select SNS</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                </select>
            </div>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterSNS;
