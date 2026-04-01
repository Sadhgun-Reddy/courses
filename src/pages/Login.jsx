// Login.jsx
import { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', registerData);
    // Add registration logic here
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', loginData);
    // Add login logic here
  };

  const handleRegisterClick = () => setIsPanelActive(true);
  const handleLoginClick = () => setIsPanelActive(false);
  const handleMobileRegister = () => setIsPanelActive(true);
  const handleMobileLogin = () => setIsPanelActive(false);

  return (
    <div className={`auth-wrapper ${isPanelActive ? 'panel-active' : ''}`}>
      {/* Register Form */}
      <div className="auth-form-box auth-register-form">
        <form className="auth-form" onSubmit={handleRegisterSubmit}>
          <h1 className="auth-heading-1">Create Account</h1>
          <input
            className="auth-input"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={registerData.fullName}
            onChange={handleRegisterChange}
            required
          />
          <input
            className="auth-input"
            type="text"
            name="fullName"
            placeholder="Mobile No"
            value={registerData.fullName}
            onChange={handleRegisterChange}
            required
          />
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={registerData.email}
            onChange={handleRegisterChange}
            required
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            placeholder="Confirm Password"
            value={registerData.password}
            onChange={handleRegisterChange}
            required
          />
          <button className="auth-button mt-6" type="submit">Sign Up</button>
          <div className="auth-mobile-switch">
            <p>Already have an account?</p>
            <button type="button" onClick={handleMobileLogin}>Sign In</button>
          </div>
        </form>
      </div>

      {/* Login Form */}
      <div className="auth-form-box auth-login-form">
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <h1 className="auth-heading-1">Sign In</h1> 
          <input
            className="auth-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <div className="auth-input-group">
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
            />
            <a href="#" className="auth-link">Forgot your password?</a>
          </div>
          <button className="auth-button mt-6" type="submit">Sign In</button>
          <div className="auth-mobile-switch">
            <p>Don't have an account?</p>
            <button type="button" onClick={handleMobileRegister}>Sign Up</button>
          </div>
        </form>
      </div>

      {/* Sliding Panel */}
      <div className="auth-slide-panel-wrapper">
        <div className="auth-slide-panel">
          <div className="auth-panel-content auth-panel-content-left">
            <h1 className="auth-heading-1" style={{color:"#fff"}}>Welcome Back!</h1>
            <p className="auth-paragraph">Stay connected by logging in with your credentials and continue your experience</p>
            <button className="auth-button transparent-btn" type="button" onClick={handleLoginClick}>Sign In</button>
          </div>
          <div className="auth-panel-content auth-panel-content-right">
            <h1 className="auth-heading-1" style={{color:"#fff"}}>Hey There!</h1>
            <p className="auth-paragraph">Begin your amazing journey by creating an account with us today</p>
            <button className="auth-button transparent-btn" type="button" onClick={handleRegisterClick}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;