import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

  const toggleShow = () => setShowPassword((s) => !s);

return (
    <div className="flex h-screen items-center justify-center bg-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 border-t-4 border-green-600"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">
          Welcome Back
        </h2>
        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="border border-gray-300 rounded-lg p-2 w-full pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <button
            type="button"
            onClick={toggleShow}
            aria-pressed={showPassword}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-gray-600 hover:text-gray-800 focus:outline-none"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <IoMdEye/>
            ) : (
              <IoMdEyeOff/>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
        >
          Login
        </button>

        {message && (
          <p
            className={`mt-4 text-sm text-center ${
              message.includes('Successful')
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        {token && (
          <p className="mt-2 text-xs break-words bg-green-50 p-2 rounded text-gray-700">
            <strong>JWT:</strong> {token}
          </p>
        )}
      </form>
    </div>
  )
}

export default Login