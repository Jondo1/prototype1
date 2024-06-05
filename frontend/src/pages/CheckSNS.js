import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css';

const CheckSNS = () => {
    const [accounts, setAccounts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('/sns/accounts');
                setAccounts(response.data.accounts);
            } catch (err) {
                setError('Failed to fetch SNS accounts');
                console.error('Fetch Accounts Error:', err);
            }
        };

        fetchAccounts();
    }, []);

    const handleDelete = async (sns) => {
        try {
            await axios.delete(`/sns/delete/${sns}`);
            setAccounts(accounts.filter(account => account.sns !== sns));
        } catch (err) {
            setError('Failed to delete SNS account');
            console.error('Delete Account Error:', err);
        }
    };

    return (
        <div>
            <h2>SNS Accounts</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {accounts.map(account => (
                    <li key={account.sns}>
                        {account.sns}: {account.username}
                        <button onClick={() => handleDelete(account.sns)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CheckSNS;
