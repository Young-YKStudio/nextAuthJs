import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { signIn } from 'next-auth/react'

const Register = () => {

  const [ registerForm, setRegisterForm ] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const { name, email, password, passwordConfirm } = registerForm
  // const { pathname } = Router

  const formChangeHandler = (e) => {
    setRegisterForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const redirectTo = (path) => {
    Router.push(path)
  }

  const loginUser = async () => {
    const response = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`
    })

    response.error ? console.log(response.error) : redirectTo('/')
  }

  const submitHandler = async () => {
    const request = await axios.post('/api/account/register', registerForm)
    console.log(request)
  }

  return (
    <section className='w-screen h-screen bg-indigo-100 flex items-center justify-center text-indigo-900'>
      <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
        <div className='flex justify-center border-b border-indigo-300 pb-4 mb-4'>
          <h1 className='font-bold text-2xl'>Register</h1>
        </div>
        <div className='flex flex-col gap-1 text-sm mb-2' >
          <div className='flex flex-col gap-2 mb-2'>
            <label htmlFor='name'>
              Name
            </label>
            <input type='text' value={name} name='name' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='email'>
              Email
            </label>
            <input type='email' value={email} name='email' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='password'>
              Password
            </label>
            <input type='password' value={password} name='password' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='passwordConfirm'>
              Confirm Password
            </label>
            <input type='password' value={passwordConfirm} name='passwordConfirm' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full' onClick={submitHandler}>Register</button>
          <p className='text-xs'>back to <button onClick={() => redirectTo('/account/login')} className='font-bold hover:text-indigo-500'>login</button></p>
        </div>
      </div>
    </section>
  );
}
export default Register;