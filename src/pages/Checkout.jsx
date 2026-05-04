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

  // Batch & slot selection from API
  const [batches, setBatches] = useState([]);
  const [batchesLoading, setBatchesLoading] = useState(true);
  const [batchesError, setBatchesError] = useState('');
  const [selectedBatchId, setSelectedBatchId] = useState(location.state?.batchId || '');
  const [selectedSlotId, setSelectedSlotId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null); // { startTime, endTime }

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [invoiceUrl, setInvoiceUrl] = useState(null);

  // Partial Payment states
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'partial'
  const [partialAmount, setPartialAmount] = useState('');
  const [partialError, setPartialError] = useState('');

  useEffect(() => {
    if (!course) {
      navigate('/courses');
    }
  }, [course, navigate]);

  // Fetch batches from API
  useEffect(() => {
    if (!course?._id) return;
    const fetchBatches = async () => {
      setBatchesLoading(true);
      setBatchesError('');
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(URLS.getBatchesByCourseId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : '',
          },
          body: JSON.stringify({ courseId: course._id }),
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setBatches(data.data);
        } else {
          setBatchesError('Could not load batch information.');
        }
      } catch {
        setBatchesError('Failed to fetch batches. Please try again.');
      } finally {
        setBatchesLoading(false);
      }
    };
    fetchBatches();
  }, [course?._id]);

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

  // Partial Payment calculations
  const minPartialAmount = Math.ceil(finalPriceValue * 0.5);
  const amountToPay = paymentType === 'partial' ? (Number(partialAmount) || 0) : finalPriceValue;

  const handleSlotSelect = (batch, slot) => {
    setSelectedBatchId(batch._id);
    setSelectedSlotId(slot._id);
    setSelectedSlot({ startTime: slot.startTime, endTime: slot.endTime });
  };

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

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in your billing details');
      return;
    }
    if (!selectedBatchId || !selectedSlotId) {
      alert('Please select a batch and time slot');
      return;
    }
    if (paymentType === 'partial') {
      if (!partialAmount) {
        setPartialError('Please enter an amount.');
        return;
      }
      if (Number(partialAmount) < minPartialAmount) {
        setPartialError(`Minimum payment required: ₹${minPartialAmount.toLocaleString('en-IN')}`);
        return;
      }
      if (Number(partialAmount) > finalPriceValue) {
        setPartialError(`Amount cannot exceed the total: ₹${finalPriceValue.toLocaleString('en-IN')}`);
        return;
      }
    }

    if (razorpayScriptLoaded && window.Razorpay) {
      setIsProcessing(true);
      try {
        const token = localStorage.getItem('token');

        const response = await fetch(URLS.createOrder, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            courseId: course._id,
            paymentType: paymentType,
            paidAmount: Number(amountToPay),
            batchId: selectedBatchId,
            startTime: selectedSlot?.startTime || '',
            endTime: selectedSlot?.endTime || '',
          }),
        });

        const data = await response.json();

        if (!data.success) {
          setIsProcessing(false);
          alert(data.message || 'Failed to create order on server');
          return;
        }

        const options = {
          key: 'rzp_test_ShfYcPKH5TchAo',
          amount: amountToPay * 100,
          currency: 'INR',
          name: 'VOLTEDZ',
          description: `Enroll: ${course.title}`,
          image: course.thumbnail ? `${URLS.base_url}${course.thumbnail}` : '/logo.png',
          order_id: data.orderId,
          handler: async function (response) {
            try {
              const verifyResponse = await fetch(URLS.updateTransaction, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  orderId: data.dbOrderId,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  batchId: selectedBatchId,
                  status: paymentType === 'partial' ? 'partial' : 'completed',
                }),
              });
              const verifyData = await verifyResponse.json();
              if (verifyData.success) {
                if (verifyData.data?.invoiceUrl) setInvoiceUrl(verifyData.data.invoiceUrl);
                setPaymentSuccess(true);
              } else {
                alert(verifyData.message || 'Payment verification failed on server.');
              }
            } catch (error) {
              console.error('Error verifying payment:', error);
              alert('An error occurred during payment verification.');
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: { name: formData.name, email: formData.email, contact: formData.phone },
          theme: { color: '#1f5bd6' },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          setIsProcessing(false);
          alert(`Payment failed: ${response.error.description}`);
        });
        rzp1.open();
      } catch (error) {
        setIsProcessing(false);
        console.error('Order creation error:', error);
        alert('An error occurred during checkout setup.');
      }
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
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
            {invoiceUrl && (
              <a
                href={invoiceUrl.startsWith('http') ? invoiceUrl : `${URLS.base_url}${invoiceUrl.startsWith('/') ? invoiceUrl.slice(1) : invoiceUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="checkout-btn secondary-btn"
                style={{ background: '#f4f4f4', color: '#333', textDecoration: 'none', border: '1px solid #ccc' }}
              >
                Download Invoice
              </a>
            )}
            <Link to="/profile" className="checkout-btn primary-btn">Go to Student Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  // Helper: days short label
  const formatDays = (days = []) => {
    if (!days.length) return '';
    if (days.length >= 5 && days.includes('Monday') && days.includes('Friday')) return 'Mon – Fri';
    if (days.length === 2 && days.includes('Saturday') && days.includes('Sunday')) return 'Sat & Sun';
    return days.map(d => d.slice(0, 3)).join(', ');
  };

  const getBatchLabel = (batch) => {
    if (batch.batchName) return batch.batchName;
    const typeMap = { regular: 'Regular Batch', online: 'Online Batch', custom: 'Special Batch' };
    return typeMap[batch.type] || batch.type.charAt(0).toUpperCase() + batch.type.slice(1);
  };

  const getAvailableSeats = (slot) => slot.memberLimit - slot.currentMembers;

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
        {/* ── LEFT: Billing + Batch ── */}
        <div className="checkout-left">
          <h2 className="checkout-section-title">Billing Details</h2>
          <div className="checkout-card billing-form">
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 9000000000" required />
            </div>
          </div>

          {/* ── Batch & Slot Selection ── */}
          <h2 className="checkout-section-title" style={{ marginTop: '30px' }}>Select Batch & Time Slot</h2>
          <div className="checkout-card">
            {batchesLoading ? (
              <div className="batch-loading">
                <div className="batch-loading-spinner"></div>
                <p>Loading available batches…</p>
              </div>
            ) : batchesError ? (
              <p className="batch-error-msg">{batchesError}</p>
            ) : batches.length === 0 ? (
              <p className="batch-error-msg">No batches available for this course currently.</p>
            ) : (
              <div className="batch-list">
                {batches.map((batch) => (
                  <div
                    key={batch._id}
                    className={`batch-card ${selectedBatchId === batch._id ? 'batch-card--active' : ''}`}
                  >
                    {/* Batch header */}
                    <div className="batch-card-header">
                      <div className="batch-card-title-row">
                        <span className="batch-name">{getBatchLabel(batch)}</span>
                        <span className={`batch-type-pill batch-type-pill--${batch.type}`}>
                          {batch.type.charAt(0).toUpperCase() + batch.type.slice(1)}
                        </span>
                      </div>
                      <div className="batch-days">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        {formatDays(batch.days)}
                      </div>
                    </div>

                    {/* Slots */}
                    <div className="slot-list">
                      <p className="slot-list-label">Available Time Slots:</p>
                      {batch.slots && batch.slots.length > 0 ? batch.slots.map((slot) => {
                        const avail = getAvailableSeats(slot);
                        const isFull = avail <= 0;
                        const isSelected = selectedSlotId === slot._id;
                        return (
                          <button
                            key={slot._id}
                            type="button"
                            disabled={isFull}
                            onClick={() => handleSlotSelect(batch, slot)}
                            className={`slot-card ${isSelected ? 'slot-card--selected' : ''} ${isFull ? 'slot-card--full' : ''}`}
                          >
                            <div className="slot-time">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                              </svg>
                              <strong>{slot.startTime}</strong>
                              <span className="slot-dash">–</span>
                              <strong>{slot.endTime}</strong>
                            </div>
                            <div className="slot-seats">
                              {isFull ? (
                                <span className="seat-tag seat-tag--full">Full</span>
                              ) : (
                                <span className={`seat-tag ${avail <= 5 ? 'seat-tag--low' : 'seat-tag--ok'}`}>
                                  {avail} seat{avail !== 1 ? 's' : ''} left
                                </span>
                              )}
                            </div>
                            {isSelected && (
                              <div className="slot-check">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            )}
                          </button>
                        );
                      }) : (
                        <p className="slot-list-label" style={{ color: '#aaa' }}>No slots configured.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected slot summary */}
            {selectedSlot && (
              <div className="selected-slot-summary">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1f5bd6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  Selected: <strong>{batches.find(b => b._id === selectedBatchId) ? getBatchLabel(batches.find(b => b._id === selectedBatchId)) : ''}</strong>
                  {' '}·{' '}
                  <strong>{selectedSlot.startTime} – {selectedSlot.endTime}</strong>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: Order Summary ── */}
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
                <div className={`promo-message ${promoMessage.type}`}>{promoMessage.text}</div>
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

              <hr className="checkout-divider" />

              {/* Payment Type Selection */}
              <div className="payment-options">
                <label className="payment-option-label">Choose Payment Plan:</label>
                <div className="payment-type-toggle">
                  <button
                    type="button"
                    className={`type-btn ${paymentType === 'full' ? 'active' : ''}`}
                    onClick={() => { setPaymentType('full'); setPartialError(''); }}
                  >
                    Full Payment
                  </button>
                  <button
                    type="button"
                    className={`type-btn ${paymentType === 'partial' ? 'active' : ''}`}
                    onClick={() => setPaymentType('partial')}
                  >
                    Partial Payment
                  </button>
                </div>

                {paymentType === 'partial' && (
                  <div className="partial-input-box mt-3">
                    <label>Enter Amount to Pay Now (Min 50%)</label>
                    <div className="input-with-symbol">
                      <span className="currency-symbol">₹</span>
                      <input
                        type="number"
                        value={partialAmount}
                        onChange={(e) => { setPartialAmount(e.target.value); setPartialError(''); }}
                        placeholder={`Min: ₹${minPartialAmount}`}
                      />
                    </div>
                    {partialError ? (
                      <p className="partial-error">{partialError}</p>
                    ) : (
                      <p className="partial-hint">Remaining balance: ₹{(finalPriceValue - (Number(partialAmount) || 0)).toLocaleString('en-IN')}</p>
                    )}
                  </div>
                )}
              </div>

              {paymentType === 'partial' && (
                <div className="total-row amount-to-pay mt-2">
                  <span>Amount to Pay Today</span>
                  <span className="highlight">₹{amountToPay.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <button
              className="checkout-btn submit-btn"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${amountToPay.toLocaleString('en-IN')} Now`}
            </button>
            <p className="secure-badge">🔒 Secure Checkout via Razorpay</p>
          </div>
        </div>
      </div>
    </div>
  );
}