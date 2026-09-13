import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import useEcomstore from '../../store/ecom-store';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  //JavaScript
  const navigate = useNavigate()
  const actionLogin = useEcomstore((state) => state.actionLogin)
  const user = useEcomstore((state) => state.user)
  console.log('user form zustand', user)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnChange = (e) => {
    //code 
    //console.log(e.target.name,e.target.value)
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(form)

    // Send to Back

    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      roleRedirec(role)
      toast.success('Welcome Back')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }

  const roleRedirec = (role) => {
    if (role === 'admin') {
      navigate('/admin')
    } else {
      navigate(-1)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 '>
      <div className='w-full shadow-md bg-white p-8 max-w-md'>
        <h1 className='text-2xl text-center my-4 font-bold '>
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>

            <input
              placeholder='Email'
              className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent `}
              onChange={handleOnChange}
              name='email'
              type='email'
            />


            <input
              placeholder='Password'
              className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:border-transparent `}
              onChange={handleOnChange}
              name='password'
              type='password'
            />


            <button
              className='bg-blue-500 rounded-md w-full text-white font-bold py-2 shadow hover:bg-blue-700'>
              Login
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login