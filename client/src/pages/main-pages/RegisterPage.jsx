/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../UserContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/registration/register', {
        firstName: fname,
        lastName: lname,
        email,
        password,
        company:"661651acb79eaeccd5a3681c",
      })
      setUser(data.user)
      navigate('/')

    } catch (error) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        console.error('Request error:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  }


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={handleSubmit}>
          <input type='text' placeholder='John' value={fname} onChange={(e) => setFname(e.target.value)} />
          <input type='text' placeholder='Doe' value={lname} onChange={(e) => setLname(e.target.value)} />
          <input type='email' placeholder='your@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type='password' placeholder='Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Allredy a member? <Link className='underline text-black' to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage