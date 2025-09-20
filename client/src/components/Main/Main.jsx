import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Login from "./Login/Login";

const Main = () => {
  return (
    <main className="main">
      <Routes>
        <Route path='/' element={<Login />} />
        {/* <Route path='/login' element={<Login/>} /> */}
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </main>
  );
};

export default Main;
