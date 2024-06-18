/* eslint-disable no-unused-vars */
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
// import Sidebar from './components/Sidebar/Sidebar';
import SidebarItem from './components/Sidebar/SidebarItem';

const Layout = () => {
  return (
    <div className='p-4'>
      <Header />
      <div className='flex'>
        {/* Sidebar can be toggled based on screen size or state */}
        {/* <SidebarItem /> */}
        <div className='flex-grow'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
