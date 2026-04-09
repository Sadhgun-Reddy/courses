import { useState, useEffect } from 'react';
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
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [currentEmail, setCurrentEmail] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [formMessage, setFormMessage] = useState({ type: '', text: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // ✅ Add this block — redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async () => {
    if (!registerData.email) {
      setFormMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    setIsLoading(true);
    setFormMessage({ type: '', text: '' });
    try {
      const response = await fetch(URLS.sendStudentOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registerData.email }),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        setCurrentEmail(registerData.email);
        setResendTimer(60);
        setFormMessage({ type: 'success', text: data.message || 'OTP sent successfully' });
      } else {
        setFormMessage({ type: 'error', text: data.message || 'Failed to send OTP' });
      }
    } catch (error) {
      console.error(error);
      setFormMessage({ type: 'error', text: 'Failed to send OTP' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setOtpError('Please enter the OTP');
      return;
    }
    setIsLoading(true);
    setOtpError('');
    try {
      const response = await fetch(URLS.verifyStudentOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, otp: otp }),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpVerified(true);
        setOtpError('');
      } else {
        setOtpError(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error(error);
      setOtpError('Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setOtp('');
    setOtpError('');
    await handleSendOtp();
  };

  const getEmailSuffix = (email) => {
    if (!email) return '';
    return email.slice(-5);
  };

  const resetOtpFlow = () => {
    setIsOtpSent(false);
    setIsOtpVerified(false);
    setOtp('');
    setCurrentEmail('');
    setResendTimer(0);
    setOtpError('');
    setOtpSuccess('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (name === 'email' && isOtpSent) {
      resetOtpFlow();
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpVerified) {
      setFormMessage({ type: 'error', text: "Please verify your email with OTP first" });
      return;
    }
    if (registerData.password !== registerData.confirm) {
      setFormMessage({ type: 'error', text: "Passwords do not match" });
      return;
    }
    setFormMessage({ type: '', text: '' });
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
        setFormMessage({ type: 'success', text: data.message || "Student registered successfully" });
        setTimeout(() => {
          setIsPanelActive(false);
          resetOtpFlow();
        }, 1500);
      } else {
        setFormMessage({ type: 'error', text: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error(error);
      setFormMessage({ type: 'error', text: "An error occurred during registration" });
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setFormMessage({ type: 'error', text: data.message || "Login failed" });
      }
    } catch (error) {
      console.error(error);
      setFormMessage({ type: 'error', text: "An error occurred during login" });
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

            <div style={{ width: '100%', minHeight: '50px', marginBottom: '12px' }}>
              {formMessage.text && (
                <div style={{ 
                  padding: '11px 14px', 
                  borderRadius: '10px', 
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '500',
                  background: formMessage.type === 'success' ? 'rgba(245,166,35,0.12)' : 'rgba(220,53,69,0.12)',
                  color: formMessage.type === 'success' ? '#f5a623' : '#ff6b7a',
                  border: formMessage.type === 'success' ? '1px solid rgba(245,166,35,0.3)' : '1px solid rgba(220,53,69,0.3)',
                  letterSpacing: '0.1px',
                }}>
                  {formMessage.text}
                </div>
              )}
            </div>

            <div className="auth-fields">
              <FloatingInput label="Full Name"        name="fullName" value={registerData.fullName} onChange={handleRegisterChange} required />
              <FloatingInput label="Mobile Number"    name="mobile"   type="tel"      value={registerData.mobile}   onChange={handleRegisterChange} required />
              <FloatingInput label="Email Address"    name="email"    type="email"    value={registerData.email}    onChange={handleRegisterChange} required />
              
              {!isOtpSent ? (
                <button 
                  type="button" 
                  className="auth-button" 
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  style={{ marginBottom: '15px' }}
                >
                  <span>{isLoading ? 'Sending OTP...' : 'Send OTP'}</span>
                </button>
              ) : (
                <>
                  {!isOtpVerified ? (
                    <>
                      <div className="otp-info" style={{ marginBottom: '12px', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', fontSize: '13px' }}>
                        <span style={{ color: 'rgba(220,228,255,0.55)' }}>OTP sent to: </span>
                        <span style={{ fontWeight: '600', color: '#f0f4ff' }}>****{getEmailSuffix(currentEmail)}</span>
                        <p style={{ margin: '6px 0 0', color: 'rgba(245,166,35,0.8)', fontSize: '12px' }}>⏱ OTP is valid only for 5 minutes</p>
                      </div>
                      <FloatingInput 
                        label="Enter OTP" 
                        name="otp" 
                        type="text" 
                        value={otp} 
                        onChange={(e) => setOtp(e.target.value)} 
                        required 
                      />
                      {otpError && <p style={{ color: '#ff6b7a', fontSize: '12px', marginBottom: '10px', padding: '8px 12px', background: 'rgba(220,53,69,0.1)', border: '1px solid rgba(220,53,69,0.25)', borderRadius: '8px' }}>{otpError}</p>}
                      {otpSuccess && <p style={{ color: '#f5a623', fontSize: '12px', marginBottom: '10px', padding: '8px 12px', background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.25)', borderRadius: '8px' }}>{otpSuccess}</p>}
                      <div className="otp-actions" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button 
                          type="button" 
                          className="auth-button" 
                          onClick={handleVerifyOtp}
                          disabled={isLoading}
                          style={{ flex: 1 }}
                        >
                          <span>{isLoading ? 'Verifying...' : 'Verify OTP'}</span>
                        </button>
                        <button 
                          type="button" 
                          className="auth-button" 
                          onClick={handleResendOtp}
                          disabled={resendTimer > 0}
                          style={{ flex: 1, background: resendTimer > 0 ? '#ccc' : '' }}
                        >
                          <span>{resendTimer > 0 ? `Resend (${resendTimer}s)` : 'Resend OTP'}</span>
                        </button>
                      </div>
                      <button 
                        type="button" 
                        onClick={resetOtpFlow}
                        style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '15px', textDecoration: 'underline' }}
                      >
                        Change Email
                      </button>
                    </>
                  ) : (
                    <div className="otp-verified" style={{ marginBottom: '15px', padding: '11px 14px', background: 'rgba(245,166,35,0.12)', border: '1px solid rgba(245,166,35,0.3)', borderRadius: '10px', color: '#f5a623', fontSize: '13px', fontWeight: '600', textAlign: 'center' }}>
                      ✓ Email verified successfully
                    </div>
                  )}
                </>
              )}
              
              {isOtpVerified && (
                <>
                  <FloatingInput label="Address"          name="address"  type="text"     value={registerData.address}  onChange={handleRegisterChange} required />
                  <FloatingInput label="Password"         name="password" type="password" value={registerData.password} onChange={handleRegisterChange} required />
                  <FloatingInput label="Confirm Password" name="confirm"  type="password" value={registerData.confirm}  onChange={handleRegisterChange} required />
                </>
              )}
            </div>

            {isOtpVerified && (
              <button className="auth-button" type="submit">
                <span>Create Account</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            )}

            <div className="auth-mobile-switch">
              <span>Already have an account?</span>
              <button type="button" onClick={() => { setIsPanelActive(false); resetOtpFlow(); setFormMessage({ type: '', text: '' }); }}>Sign In</button>
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

            <div style={{ width: '100%', minHeight: '50px', marginBottom: '12px' }}>
              {formMessage.text && (
                <div style={{ 
                  padding: '11px 14px', 
                  borderRadius: '10px', 
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '500',
                  background: formMessage.type === 'success' ? 'rgba(245,166,35,0.12)' : 'rgba(220,53,69,0.12)',
                  color: formMessage.type === 'success' ? '#f5a623' : '#ff6b7a',
                  border: formMessage.type === 'success' ? '1px solid rgba(245,166,35,0.3)' : '1px solid rgba(220,53,69,0.3)',
                  letterSpacing: '0.1px',
                }}>
                  {formMessage.text}
                </div>
              )}
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