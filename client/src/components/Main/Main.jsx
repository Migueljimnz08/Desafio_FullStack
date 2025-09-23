import React from "react";
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import AuthUser from "../../utils/ProtectedRoutes/ProtectedRoutes";

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' 
        element={
          <AuthUser>
            <Dashboard/>
          </AuthUser>} />
        <Route path='/*' element={<NotFound/>} />
      </Routes>
    </main>
  );
};
export default Main;