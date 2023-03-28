import React from 'react'
import '../../assets/style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const submitButton = async () => {
    try {
      if (email && password) {
        const user = {
          email: email,
          password: password
        }
        const res = await axios.post('http://localhost:5000/verification/login', user);
        console.log(res.data);
        if (res.status === 200) {
          alert("Login Successfull");
          navigate('/sidebar');
        }
        else {
          console.log(res);
        }
      }
      else {
        alert("Please enter all fields");
      }

    } catch (error) {
      console.log(error);

    }
  }



  const navigate = useNavigate();
  return (
    <>
      <div className='Header'>
        <img
          src="https://cdn.discordapp.com/attachments/814496393619832852/1089115898662629436/FinIQ_2.png"
          alt=''
          className='image'
        />
        <h2>Walchand College of Engineering</h2>
      </div>

      <div className='login-form'>
        <h2>Welcome to Verification Portal</h2>
        <div className='form'>
          <h2 style={{ textAlign: 'center', marginBlockStart: '0rem' }}>
            Sign in
          </h2>
          <div className='innerDiv'>
            <label htmlFor='username'>E-mail*</label>
            <input
              type='text'
              id='username'
              placeholder=' Enter your email'
              name='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='innerDiv'>
            <label htmlFor='password'>Password*</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=' Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='submitbtn' onClick={submitButton}>
            Login
          </button>
          <a
            href=''
            style={{ color: 'blue', textDecoration: 'none' }}
            onClick={() => {
              navigate('/forgotpassword')
            }}
          >
            Forgot Password
          </a>
        </div>
      </div>
    </>

  );
}

export default Login