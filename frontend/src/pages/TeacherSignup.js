import React, { useState } from 'react'
// import Signup from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function TeacherSignup() {

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        phone: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);

    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const {username, email, password, phone} = signupInfo;
        if(!username || !email || !password || !phone){
            return handleError('All field are required')
        }
        try{
            const url = "http://localhost:5000/teacher/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success){
                    handleSuccess(message);
                    setTimeout(() => {
                        navigate('/TeacherLogin')
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <div>
            <label htmlFor='username'>Username</label>
            <input
                onChange={ handleChange}
                type='text'
                name='username'
                autoFocus
                placeholder='Enter your name..'
                value={signupInfo.username}
            />
        </div>
        <div>
            <label htmlFor='email'>Email</label>
            <input
                onChange={ handleChange}
                type='email'
                name='email'
                placeholder='Enter your email..'
                value={signupInfo.email}
            />
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input
                onChange={ handleChange}
                type='password'
                name='password'
                placeholder='Enter your password..'
                value={signupInfo.password}
            />
        </div>
        <div>
            <label htmlFor='phone'>Phone</label>
            <input
                onChange={ handleChange}
                type='text'
                name='phone'
                placeholder='Enter your phone number..'
                value={signupInfo.phone}
            />
        </div>
       <button type='submit'>Signup</button>
       <span>Already have an account ?
            <Link to="/TeacherLogin">Login</Link>
       </span>
      </form>
      <ToastContainer />
    </div>
  )
}



export default TeacherSignup
