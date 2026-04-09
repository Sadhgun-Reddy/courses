import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './Checkout.css';
import { URLS } from '../Url';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || null;

  // Get user from localStorage
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout' } });
    }
  }, [user, navigate]);

  // Form states pre-filled from user
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });
  
  const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);
  
  useEffect(() => {
    if (!razorpayScriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => setRazorpayScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, [razorpayScriptLoaded]);

  if (!course || !user) return null;

  // Calculate pricing
  const basePrice = course.price || 25000;
  const finalPriceValue = course.discountedPrice 
    ? course.discountedPrice 
    : basePrice - Math.floor((basePrice * discountPercent) / 100);
  const discountAmount = basePrice - finalPriceValue;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoMessage({ text: 'Please enter a promo code.', type: 'error' });
      return;
    }
    
    if (promoCode.toUpperCase() === 'VOLTEDZ10') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'Promo code applied! You got 10% off.', type: 'success' });
    } else if (promoCode.toUpperCase() === 'VOLTEDZ20') {
      setDiscountPercent(20);
      setPromoMessage({ text: 'Promo code applied! You got 20% off.', type: 'success' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ text: 'Invalid promo code.', type: 'error' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill in your billing details");
      return;
    }
    if (!selectedBatchId) {
      alert("Please select a batch");
      return;
    }

    if (razorpayScriptLoaded && window.Razorpay) {
      setIsProcessing(true);
      const options = {
        key: 'rzp_test_SaYtbTomCHS1WJ',
        amount: finalPriceValue * 100,
        currency: 'INR',
        name: 'VOLTEDZ',
        description: `Enroll: ${course.title}`,
        image: course.thumbnail ? `${base_url}${course.thumbnail}` : '/logo.png',
        handler: function (response) {
          setPaymentSuccess(true);
          setIsProcessing(false);
          // Here you would typically verify payment and enroll user
        },
        prefill: { 
          name: formData.name, 
          email: formData.email, 
          contact: formData.phone 
        },
        theme: { color: '#1f5bd6' }
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        setIsProcessing(false);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp1.open();
    }
  };

  if (paymentSuccess) {
    return (
      <div className="checkout-page page-padding">
        <div className="checkout-success">
          <div className="success-icon">✓</div>
          <h2>Payment Successful!</h2>
          <p>You have successfully enrolled in <strong>{course.title}</strong>.</p>
          <p>We've sent a receipt and further instructions to <strong>{formData.email}</strong>.</p>
          <Link to="/profile" className="checkout-btn primary-btn mt-4">Go to Student Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-padding">
      <div className="cd-banner">
        <div className="cd-banner-inner">
          <ul className="cd-breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><span>Checkout</span></li>
          </ul>
        </div>
      </div>

      <div className="checkout-container">
        <div className="checkout-left">
          <h2 className="checkout-section-title">Billing Details</h2>
          <div className="checkout-card billing-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="John Doe" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="john@example.com" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleInputChange} 
                placeholder="+91 9000000000" 
                required 
              />
            </div>

            {/* Batch Selection */}
            <div className="form-group">
              <label>Select Batch *</label>
              <select 
                value={selectedBatchId} 
                onChange={(e) => setSelectedBatchId(e.target.value)}
                required
                className="batch-select"
              >
                <option value="">-- Choose a batch --</option>
                {course.batchDetails && course.batchDetails.map((batch) => (
                  <option key={batch._id} value={batch._id}>
                    {batch.batchName || batch.type} ({batch.days?.join(', ')}) - {batch.slots?.[0]?.startTime} to {batch.slots?.[0]?.endTime}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <h2 className="checkout-section-title">Order Summary</h2>
          <div className="checkout-card order-summary-card">
            <div className="checkout-course-preview">
              <img 
                src={course.thumbnail ? `${URLS.base_url}${course.thumbnail}` : '/placeholder.jpg'} 
                alt={course.title} 
                className="checkout-course-img" 
              />
              <div className="checkout-course-info">
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructorDetails?.[0]?.name || 'Expert'}</p>
                <div className="checkout-course-badge">{course.duration || 'Course'}</div>
              </div>
            </div>

            <hr className="checkout-divider" />

            <div className="checkout-promo-box">
              <label>Have a promo code?</label>
              <div className="promo-input-group">
                <input 
                  type="text" 
                  value={promoCode} 
                  onChange={(e) => setPromoCode(e.target.value)} 
                  placeholder="e.g. VOLTEDZ10"
                />
                <button type="button" onClick={handleApplyPromo} className="apply-btn">Apply</button>
              </div>
              {promoMessage.text && (
                <div className={`promo-message ${promoMessage.type}`}>
                  {promoMessage.text}
                </div>
              )}
            </div>

            <hr className="checkout-divider" />

            <div className="checkout-totals">
              <div className="total-row">
                <span>Base Price</span>
                <span>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="total-row discount">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Total Amount</span>
                <span>₹{finalPriceValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button 
              className="checkout-btn submit-btn" 
              onClick={handlePayment} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${finalPriceValue.toLocaleString('en-IN')} Now`}
            </button>
            <p className="secure-badge">🔒 Secure Checkout via Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
}