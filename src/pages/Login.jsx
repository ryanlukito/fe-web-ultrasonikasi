import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:5000/auth/login', {
            username,
            password
        })
        setToken(res.data.token)
        localStorage.setItem('token', res.data.token)
        setMessage('Login Successsful!');
        navigate('/');
    } catch (err) {
        setMessage('Invalid Credentials!')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
        <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-80'>
            <h2 className='text-xl font-bold mb-4'>Login</h2>
            <input 
                type="text"
                placeholder='Username'
                className='border p-2 w-full mb-3'
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
            />
            <input 
                type="password"
                placeholder='Password'
                className='border p-2 w-full mb-3'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit" className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
                Login
            </button>
            {message && <p className='mt-3 text-sm'>{message}</p>}
            {token && (
                <p className='mt-2 text-xs break-words'>
                    <strong>JWT:</strong> {token}
                </p>
            )}
        </form>
    </div>
  )
}

export default Login