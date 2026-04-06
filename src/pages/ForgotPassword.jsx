import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { URLS } from '../Url';
import './Auth.css';

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

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // Steps: 1 = Email, 2 = Validate OTP, 3 = Reset Password
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // 6 digit OTP
  const [passwords, setPasswords] = useState({ newParam: '', confirmParam: '' });

  // Refs for OTP auto-focus
  const inputRefs = useRef([]);

  // Handle Step 1: Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(URLS.studentSendOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        setUserId(data.userInfo);
        setStep(2);
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred while sending OTP.');
      console.error(err);
    }
  };

  // Handle OTP Input Changes
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return; // Only allow numbers
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if a number is typed
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Move slightly left on backspace if current field is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter the fully 6-digit OTP.');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(URLS.studentCompareOtp, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: userId, emailOtp: otpString })
      });
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        setStep(3);
      } else {
        setError(data.message || 'Invalid OTP.');
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred during verification.');
      console.error(err);
    }
  };

  // Handle Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (passwords.newParam.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (passwords.newParam !== passwords.confirmParam) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch(URLS.studentResetPass, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: userId, 
          newpassword: passwords.newParam, 
          confirmpassword: passwords.confirmParam 
        })
      });
      const data = await response.json();
      setLoading(false);
      
      if (data.success) {
        alert(data.message || 'Password reset successfully');
        navigate('/login');
      } else {
        setError(data.message || 'Failed to reset password.');
      }
    } catch (err) {
      setLoading(false);
      setError('An error occurred while resetting password.');
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-orb auth-orb-1"></div>
        <div className="auth-orb auth-orb-2"></div>
        <div className="auth-orb auth-orb-3"></div>
        <div className="auth-grid-lines"></div>
      </div>

      {/* Override auth-wrapper specific for single-form alignment */}
      <div className="auth-wrapper" style={{ maxWidth: '450px', minHeight: 'auto' }}>
        <div className="auth-form-box" style={{ width: '100%', position: 'static', opacity: 1, pointerEvents: 'auto' }}>
          
          <form className="auth-form" onSubmit={
            step === 1 ? handleSendOTP :
            step === 2 ? handleVerifyOTP :
            handleResetPassword
          } style={{ padding: '48px 44px' }}>
            
            <div className="auth-form-header">
              <h1 className="auth-heading-1">
                {step === 1 && 'Reset Password'}
                {step === 2 && 'Verify Code'}
                {step === 3 && 'New Password'}
              </h1>
              <p className="auth-subtext">
                {step === 1 && 'Enter your verified email to receive a 6-digit code.'}
                {step === 2 && `We sent a code to ${email || 'your email'}.`}
                {step === 3 && 'Secure your account with a new password.'}
              </p>
            </div>

            {error && <div className="auth-error-msg" style={{color: '#ef4444', marginBottom: '16px', fontSize: '14px', fontWeight: 500}}>{error}</div>}

            <div className="auth-fields">
              {/* STEP 1: EMAIL */}
              {step === 1 && (
                <FloatingInput 
                  label="Email Address" 
                  name="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              )}

              {/* STEP 2: OTP */}
              {step === 2 && (
                <div className="auth-otp-container" style={{ margin: '10px 0 20px' }}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="auth-otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      required
                    />
                  ))}
                </div>
              )}

              {/* STEP 3: NEW PASSWORD */}
              {step === 3 && (
                <>
                  <FloatingInput 
                    label="New Password" 
                    name="newPassword" 
                    type="password" 
                    value={passwords.newParam} 
                    onChange={(e) => setPasswords({...passwords, newParam: e.target.value})} 
                    required 
                  />
                  <FloatingInput 
                    label="Confirm Password" 
                    name="confirmPassword" 
                    type="password" 
                    value={passwords.confirmParam} 
                    onChange={(e) => setPasswords({...passwords, confirmParam: e.target.value})} 
                    required 
                  />
                </>
              )}
            </div>

            <button className="auth-button" type="submit" disabled={loading} style={{ marginTop: '10px' }}>
              <span>
                {loading ? 'Processing...' : 
                 step === 1 ? 'Send Recovery Code' : 
                 step === 2 ? 'Verify Code' : 
                 'Reset Password'}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            {step === 1 && (
              <div className="auth-mobile-switch" style={{ marginTop: '24px' }}>
                <span>Remember your password?</span>
                <Link to="/login" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
              </div>
            )}

            {step === 2 && (
              <div className="auth-mobile-switch" style={{ marginTop: '24px' }}>
                <span>Didn't receive code?</span>
                <span style={{ color: '#F5A623', cursor: 'pointer', fontWeight: 600 }}>Resend</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
