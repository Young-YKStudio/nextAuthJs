import {signIn, signOut } from 'next-auth/react'
import axios from 'axios'
import Router from 'next/router'

const redirect = (path) => {
  Router.push(path)
}

// Checking Session
const checkSession = async (userData) => {
  const foundAccout = await axios.post('/api/account/findAccount', userData)
  if(foundAccout.data) {
    let savingData = {
      id: foundAccout.data.user._id,
      name: foundAccout.data.user.name,
      role: foundAccout.data.user.role,
    }
    await sessionStorage.setItem('userId', savingData.id)
    await sessionStorage.setItem('userName', savingData.name)
    await sessionStorage.setItem('userRole', savingData.role)
  }
  return foundAccout.data
}

const checkSessionAgain = async (userData) => {
  const foundAccout = await axios.post('/api/account/findAccount', userData)
  if(foundAccout.data) {
    let savingData = {
      id: foundAccout.data.user._id,
      name: foundAccout.data.user.name,
      role: foundAccout.data.user.role,
      image: foundAccout.data.user.image,
    }
    await sessionStorage.setItem('userId', savingData.id)
    await sessionStorage.setItem('userName', savingData.name)
    await sessionStorage.setItem('userRole', savingData.role)
    await sessionStorage.setItem('userImage', savingData.image)
  }

  return foundAccout.data
}

// Login
const login = async (userData) => {
  const request = await signIn('credentials', {
    redirect: false,
    email: userData.email,
    password: userData.password,
    callbackUrl: '/account/login'
  })
  if(request.data) {
    redirect('/')
  }
  return request.data
}

// Logout
const logout = async () => {
  await signOut()
  await sessionStorage.clear()
  redirect('/account/login')
}

// Register
const register = async (userData) => {
  const request = await axios.post('/api/account/register', userData)
  if(request.data) {
    const authSignIn = await signIn('credentials', {
      redirect: false,
      email: userData.email,
      password: userData.password,
      callbackUrl: `${window.location.origin}`
    })
    await sessionStorage.setItem('user', request.data.user)
    if(sessionStorage.user) {
      redirect('/')

    }
  }
  return request.data
}
// passwordReset

const authService = {
  checkSession,
  checkSessionAgain,
  login,
  logout,
  register
}

export default authService