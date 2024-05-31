/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
// import Sidebar from './components/Sidebar/Sidebar'
import SidebarItem from './components/Sidebar/SidebarItem';

const Layout = () => {
  return (
    <div className='p-4 '>
      <Header />
      {/* <SidebarItem /> */}
      <Outlet />
    </div>
  )
}

export default Layout
