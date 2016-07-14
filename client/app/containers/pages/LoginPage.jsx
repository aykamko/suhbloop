import React from 'react';

const LoginPage = () => {
  const params = {
    auth_origin_url: encodeURIComponent(window.location.href),
  };
  const query = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

  return (
    <div>
      <h2>Login With Github</h2>
      <button>
        <a href={`http://localhost:3000/auth/github?${query}`}>Login</a>
      </button>
    </div>
  );
};

export default LoginPage;
