import useAuth from '../useAuth.js'
import React from 'react'
import { Navigate } from 'react-router';

export default function RequireAuth({ children }) {
  const { authed } = useAuth();

  return authed === true 
    ? children 
    : <Navigate to="/login" replace />;
}