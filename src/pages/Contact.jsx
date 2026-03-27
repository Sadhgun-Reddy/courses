import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', website: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', website: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-page">

      {/* ── Banner ── */}
      <div className="top_heading contact-top-heading">
        <div className="banner-wrapper container">
          <div className="banner-column">
            <div className="banner-content">
              <ul className="breadcrumbs">
                <li><Link  to="/">Home</Link></li>
                <li>Contact Us</li>
              </ul>
              <h1 className="page-title">Contact Us</h1>
            </div>
            <div className="banner-image">
              <img src="https://akademic.arrowtheme.com/wp-content/themes/akademic/images/page_title.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Intro text ── */}
      <div className="contact-intro-wrap">
        <div className="contact-intro-inner">
          <p>We are always ready to listen and support you in all questions about VOLTEDZ's courses and services. Please contact us through the channels below to get the fastest support!</p>
        </div>
      </div>

      {/* ── Location 1: San Francisco ── */}
      <div className="contact-locations-wrap">
        <div className="contact-locations-inner">

          <div className="contact-location-row contact-location-row--border">
            {/* Info */}
            <div className="contact-location-info">
              <h3 className="contact-location-title">Hyderabad — Head Office</h3>
              <p><strong>Address</strong>: 201, 2nd Floor, Star Meena Nivas, Near Asian Satyam Mall, Gurudwara Road, Ameerpet 500016.</p>
              <div className="contact-location-details">
                <p><strong>Phone:</strong> <a href="tel:+919010016664">+91 9010016664</a></p>
                <p><strong>Email:</strong> <a href="mailto:Voltedge.edu.in@gmail.com">Voltedge.edu.in@gmail.com</a></p>
                <p><strong>GSTIN:</strong> 36AZJPS6122K1ZY</p>
                <p><strong>Working hours:</strong></p>
                <ul>
                  <li>Monday – Friday: 8:00 AM to 5:00 PM</li>
                  <li>Saturday: 8:00 AM to 11:30 AM</li>
                </ul>
              </div>
              <a href="#support" className="contact-support-link">Send request online support</a>
            </div>
            {/* Map */}
            <div className="contact-map-col">
              <div className="contact-map-frame">
                <iframe
                  loading="lazy"
                  src="https://maps.google.com/maps?q=Ameerpet+Hyderabad&t=m&z=15&output=embed&iwloc=near"
                  title="Hyderabad Head Office"
                  aria-label="Hyderabad Head Office"
                />
              </div>
            </div>
          </div>

 

        </div>
      </div>

      {/* ── Contact Form ── */}
      <div className="contact-form-section" id="support">
        <div className="contact-form-inner">
          <div className="contact-form-box">
            <h3 className="contact-form-title">Request online support</h3>
            <p className="contact-form-desc">If you have questions or need urgent support, please fill in the form below and we will contact you again as soon as possible.</p>

            {submitted && (
              <div className="contact-success-msg">
                ✓ Your message has been sent successfully. We'll get back to you soon!
              </div>
            )}

            <form className="wpcf7-form" onSubmit={handleSubmit}>
              <div className="cf7-row">
                <div className="cf7-col">
                  <div className="cf7-label"><p>Name*</p></div>
                  <span className="cf7-wrap">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter name" required />
                  </span>
                </div>
                <div className="cf7-col">
                  <div className="cf7-label"><p>Email*</p></div>
                  <span className="cf7-wrap">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required />
                  </span>
                </div>
                <div className="cf7-col">
                  <div className="cf7-label"><p>Phone number*</p></div>
                  <span className="cf7-wrap">
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
                  </span>
                </div>
                <div className="cf7-col">
                  <div className="cf7-label"><p>Website</p></div>
                  <span className="cf7-wrap">
                    <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Enter website" />
                  </span>
                </div>
                <div className="cf7-col cf7-col--full">
                  <div className="cf7-label"><p>Message</p></div>
                  <span className="cf7-wrap">
                    <textarea name="message" value={formData.message} onChange={handleChange} cols="40" rows="10" />
                  </span>
                </div>
              </div>
              <p>
                <input type="submit" value="Send request" className="cf7-submit" />
              </p>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
