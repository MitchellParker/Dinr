import useAuth from '../useAuth.js'
import React from 'react'
import { Navigate } from 'react-router';

// react function component for pages that require logging in
// wraps around that page, if not logged in redirects the user
export default function RequireAuth({ children }) {
  const { authed } = useAuth();
  return authed ? children : <Navigate to="/login" replace />;
}