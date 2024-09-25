import React, { useState } from 'react'
// import Signup from './Signup'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        studentID: '',
        department: '',
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
        const {username, studentID, password, department, phone} = signupInfo;
        if(!username || !studentID || !password || !department || !phone){
            return handleError('All field are required')
        }
        try{
            const url = "http://localhost:5000/user/Signup";
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
                        navigate('/login')
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
            <label htmlFor='studentID'>StudentID</label>
            <input
                onChange={ handleChange}
                type='text'
                name='studentID'
                placeholder='Enter your Registration number..'
                value={signupInfo.studentID}
            />
        </div>
        <div>
            <label htmlFor='department'>Department</label>
            <input
                onChange={ handleChange}
                type='text'
                name='department'
                placeholder='Enter your department..'
                value={signupInfo.department}
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
            <Link to="/login">Login</Link>
       </span>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
