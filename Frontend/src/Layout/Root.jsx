import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router'
import Footer from '../Layout/Footer'


export default function Root() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer/>
    </div>
  )
}