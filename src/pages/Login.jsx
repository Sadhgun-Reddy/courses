import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import { URLS } from '../Url';

const EyeIcon = ({ open }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </>
    )}
  </svg>
);

// FIX 1: Add .has-value when value is non-empty.
// React controlled inputs don't reliably trigger :not(:placeholder-shown) in all
// browsers, so we drive the float purely via a CSS class on the input element.
const FloatingInput = ({ label, type = 'text', name, value, onChange, required }) => {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPass ? 'text' : 'password') : type;

  return (
    <div className="auth-float-group">
      <input
        className={`auth-float-input${value ? ' has-value' : ''}`}
        type={inputType}
        name={name}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        autoComplete="off"
      />
      <label className="auth-float-label">{label}</label>
      {isPassword && (
        <button
          type="button"
          className="auth-eye-btn"
          onClick={() => setShowPass(p => !p)}
          tabIndex={-1}
        >
          <EyeIcon open={showPass} />
        </button>
      )}
    </div>
  );
};

const Login = () => {
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [registerData, setRegisterData] = useState({ fullName: '', mobile: '', email: '', password: '', confirm: '', address: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirm) {
      alert("Passwords do not match");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', registerData.fullName);
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('phone', registerData.mobile);
      if (registerData.address) formData.append('address', registerData.address);

      const response = await fetch(URLS.studentRegister, { method: 'POST', body: formData });
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Student registered successfully");
        setIsPanelActive(false);
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URLS.studentLogin, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginData.email, password: loginData.password }),
      });
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Login successful");
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-orb auth-orb-3" />
        <div className="auth-grid-lines" />
      </div>

      <div className={`auth-wrapper ${isPanelActive ? 'panel-active' : ''}`}>

        {/* Register Form — uses auth-form--register for overflow scroll */}
        <div className="auth-form-box auth-register-form">
          <form className="auth-form auth-form--register" onSubmit={handleRegisterSubmit}>
            <div className="auth-form-header">
              <h1 className="auth-heading-1">Create Account</h1>
              {/* <p className="auth-subtext">Join thousands of learners today</p> */}
            </div>

            <div className="auth-fields">
              <FloatingInput label="Full Name"        name="fullName" value={registerData.fullName} onChange={handleRegisterChange} required />
              <FloatingInput label="Mobile Number"    name="mobile"   type="tel"      value={registerData.mobile}   onChange={handleRegisterChange} required />
              <FloatingInput label="Email Address"    name="email"    type="email"    value={registerData.email}    onChange={handleRegisterChange} required />
              <FloatingInput label="Address"          name="address"  type="text"     value={registerData.address}  onChange={handleRegisterChange} required />
              <FloatingInput label="Password"         name="password" type="password" value={registerData.password} onChange={handleRegisterChange} required />
              <FloatingInput label="Confirm Password" name="confirm"  type="password" value={registerData.confirm}  onChange={handleRegisterChange} required />
            </div>

            <button className="auth-button" type="submit">
              <span>Create Account</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <div className="auth-mobile-switch">
              <span>Already have an account?</span>
              <button type="button" onClick={() => setIsPanelActive(false)}>Sign In</button>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="auth-form-box auth-login-form">
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="auth-form-header">
              <div className="auth-badge">Welcome Back</div>
              <h1 className="auth-heading-1">Sign In</h1>
              <p className="auth-subtext">Access your learning dashboard</p>
            </div>

            <div className="auth-fields">
              <FloatingInput label="Email Address" name="email"    type="email"    value={loginData.email}    onChange={handleLoginChange} required />
              <FloatingInput label="Password"      name="password" type="password" value={loginData.password} onChange={handleLoginChange} required />
            </div>

            <div className="auth-forgot-row">
              <Link to="/forgot-password" className="auth-link">Forgot password?</Link>
            </div>

            <button className="auth-button" type="submit">
              <span>Sign In</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <div className="auth-mobile-switch">
              <span>Don't have an account?</span>
              <button type="button" onClick={() => setIsPanelActive(true)}>Sign Up</button>
            </div>
          </form>
        </div>

        {/* Sliding Panel */}
        <div className="auth-slide-panel-wrapper">
          <div className="auth-slide-panel">
            <div className="auth-panel-content auth-panel-content-left">
              <div className="auth-panel-inner">
                <div className="auth-panel-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/>
                  </svg>
                </div>
                <h2 className="auth-panel-heading">Welcome Back!</h2>
                <p className="auth-panel-text">Stay connected by logging in with your credentials and continue your experience</p>
                <div className="auth-panel-features">
                  <div className="auth-feature"><span className="auth-feature-dot" />Track your progress</div>
                  <div className="auth-feature"><span className="auth-feature-dot" />Access all courses</div>
                  <div className="auth-feature"><span className="auth-feature-dot" />Connect with educators</div>
                </div>
                <button className="auth-panel-btn" type="button" onClick={() => setIsPanelActive(false)}>Sign In</button>
              </div>
            </div>

            <div className="auth-panel-content auth-panel-content-right">
              <div className="auth-panel-inner">
                <div className="auth-panel-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h2 className="auth-panel-heading">Hey There!</h2>
                <p className="auth-panel-text">Begin your amazing journey by creating an account with us today</p>
                <div className="auth-panel-features">
                  <div className="auth-feature"><span className="auth-feature-dot" />500+ expert courses</div>
                  <div className="auth-feature"><span className="auth-feature-dot" />Industry certifications</div>
                  <div className="auth-feature"><span className="auth-feature-dot" />Live mentorship sessions</div>
                </div>
                <button className="auth-panel-btn" type="button" onClick={() => setIsPanelActive(true)}>Sign Up</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;