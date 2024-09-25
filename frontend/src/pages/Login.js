import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';
// import Login from './Login';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        studentID: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);

    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { studentID, password } = loginInfo;
        if( !studentID || !password ) {
            return handleError('All field is required')
        }
        try{
            const url = "http://localhost:5000/user/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { message, success, jwtToken, username, department, phone, error } = result;
            if(success){
                    handleSuccess(message);
                    localStorage.setItem('token', jwtToken);
                    localStorage.setItem('loggedInUser', username, department, phone);
                    setTimeout(() => {
                        navigate('/student-dashboard')
                    }, 1000)
            } else if(error){
                const details = error?.details[0].message;
                handleError(details);
            } else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (err) {
                handleError(err);
        }
    }

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
            <label htmlFor='studentID'>StudentID</label>
            <input
                onChange={ handleChange}
                type='text'
                name='studentID'
                placeholder='Enter your Registration number..'
                value={loginInfo.studentID}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
                onChange={ handleChange}
                type='password'
                name='password'
                placeholder='Enter your password..'
                value={loginInfo.password}
            />
        </div>
       <button type='submit'>Login</button>
       <span>Don't have an account ?
            <Link to="/signup">Signup</Link>
       </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
