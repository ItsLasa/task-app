import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthProfile = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="text-center p-3">
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()} className="btn btn-primary">
          Sign in with Google
        </button>
      ) : (
        <div>
          
          <h5>Welcome, {user.name}</h5>
          <p>{user.email}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })} className="btn btn-danger">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthProfile;
