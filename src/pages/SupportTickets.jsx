import React, { useState, useEffect, useRef } from 'react';
import { URLS, base_url } from '../Url';
import Loader from '../components/Loader';
import './SupportTickets.css';

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ subject: '', description: '' });
  const [images, setImages] = useState([]);
  const [creatingTicket, setCreatingTicket] = useState(false);
  
  const fileInputRef = useRef(null);

  // Initial Fetch List
  useEffect(() => {
    fetchMyTickets();
  }, []);

  const fetchMyTickets = async () => {
    setLoadingList(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(URLS.getMyTickets, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ page: 1 })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setTickets(data.data);
      }
    } catch (err) {
      console.error("Error fetching tickets", err);
    }
    setLoadingList(false);
  };

  const fetchTicketDetails = async (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsCreating(false);
    setLoadingDetails(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(URLS.getTicketDetails, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ticketId })
      });
      const data = await response.json();
      if (data.success && data.data) {
        setTicketDetails(data.data);
      }
    } catch (err) {
      console.error("Error fetching ticket details", err);
    }
    setLoadingDetails(false);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) {
      alert("Please enter subject and description");
      return;
    }

    setCreatingTicket(true);
    try {
      const token = localStorage.getItem('token');
      const submitData = new FormData();
      submitData.append('subject', formData.subject);
      submitData.append('description', formData.description);
      images.forEach(img => {
        submitData.append('images', img); // Matches API expectation 'images'
      });

      const response = await fetch(URLS.createTicket, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });
      const data = await response.json();
      if (data.success) {
        alert("Ticket basically Created");
        setFormData({ subject: '', description: '' });
        setImages([]);
        setIsCreating(false);
        fetchMyTickets(); // Refresh list
        if (data.data && data.data._id) {
           fetchTicketDetails(data.data._id);
        }
      } else {
        alert(data.message || "Failed to create ticket");
      }
    } catch (err) {
      console.error("Error creating ticket", err);
      alert("Error creating ticket");
    }
    setCreatingTicket(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...fileArray]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="dashboard-page-wrapper">
      <div className="tickets-container">
        <div className="dashboard-header">
          <h1>Support Tickets</h1>
          <p>Get in touch with our support team or manage existing cases.</p>
        </div>

        <div className="tickets-layout">
          
          {/* LEFT SIDEBAR */}
          <div className="tickets-sidebar">
            <div className="tickets-sidebar-header">
              <h2>Your Inbox</h2>
              <button className="btn-new-ticket" onClick={() => { setIsCreating(true); setSelectedTicketId(null); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"></path>
                </svg>
                Create New Ticket
              </button>
            </div>
            
            <div className="tickets-list">
              {loadingList ? (
                <Loader fullPage={false} text="Loading tickets..." />
              ) : tickets.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>No tickets found.</div>
              ) : (
                tickets.map(ticket => (
                  <div 
                    key={ticket.ticketId || ticket._id} 
                    className={`ticket-list-item ${selectedTicketId === (ticket.ticketId || ticket._id) ? 'active' : ''}`}
                    onClick={() => fetchTicketDetails(ticket.ticketId || ticket._id)}
                  >
                    <div className="ticket-list-top">
                      <h4 className="ticket-list-subject">{ticket.subject}</h4>
                      <span className={`ticket-badge ${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="ticket-list-desc">{ticket.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT CONTENT PANE */}
          <div className="tickets-main">
            {isCreating ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="tickets-main-header">
                  <h3 className="tickets-main-title">Submit a New Request</h3>
                </div>
                <div className="tickets-content-area">
                  <form className="ticket-form" onSubmit={handleCreateSubmit}>
                    <div className="ticket-form-group">
                      <label>Subject</label>
                      <input 
                        type="text" 
                        className="ticket-input" 
                        placeholder="Brief summary of issue (e.g., Payment issue)"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div className="ticket-form-group">
                      <label>Description</label>
                      <textarea 
                        className="ticket-textarea" 
                        placeholder="Please describe the issue in detail..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="ticket-form-group">
                      <label>Attachments (Optional)</label>
                      <div className="file-upload-box" onClick={triggerFileInput}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '8px'}}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p style={{margin: 0, color: '#64748b', fontSize: '14px', fontWeight: 500}}>Click to browse or drag images here</p>
                        <input 
                          type="file" 
                          multiple 
                          accept="image/*" 
                          ref={fileInputRef} 
                          onChange={handleImageChange} 
                          style={{display: 'none'}} 
                        />
                      </div>
                      {images.length > 0 && (
                        <div className="selected-files-preview">
                          {images.map((file, i) => (
                            <div key={i} className="file-preview-item">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                              {file.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button type="submit" disabled={creatingTicket} style={{
                      padding: '14px 32px', background: '#111FA2', color: 'white', border: 'none', borderRadius: '50px', fontWeight: 700, cursor: 'pointer'
                    }}>
                      {creatingTicket ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                  </form>
                </div>
              </div>
            ) : ticketDetails ? (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="tickets-main-header">
                  <div>
                    <h3 className="tickets-main-title">{ticketDetails.subject}</h3>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>Ticket ID: {ticketDetails.ticketId}</div>
                  </div>
                  <span className={`ticket-badge ${ticketDetails.status}`}>
                    {ticketDetails.status}
                  </span>
                </div>
                
                <div className="tickets-content-area">
                  <div className="ticket-thread">
                    
                    {/* Initial User Message */}
                    <div className="ticket-message user">
                      <div className="message-bubble">
                        {ticketDetails.description}
                      </div>
                      {ticketDetails.attachments && ticketDetails.attachments.length > 0 && (
                        <div className="message-attachments">
                          {ticketDetails.attachments.map((attach, idx) => (
                            <a href={base_url + attach} target="_blank" rel="noreferrer" key={idx}>
                              <img src={base_url + attach} alt="attachment" className="message-attachment-img" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Admin Replies */}
                    {ticketDetails.replies && ticketDetails.replies.map((reply, index) => (
                      <div key={index} className="ticket-message admin">
                        <div className="message-bubble">
                          {reply.message}
                        </div>
                        {reply.attachments && reply.attachments.length > 0 && (
                          <div className="message-attachments">
                            {reply.attachments.map((attach, idx) => (
                              <a href={base_url + attach} target="_blank" rel="noreferrer" key={idx}>
                                <img src={base_url + attach} alt="attachment" className="message-attachment-img" />
                              </a>
                            ))}
                          </div>
                        )}
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', marginLeft: '4px' }}>Support Team</div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            ) : (
              <div className="ticket-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3>Select a conversation</h3>
                <p>Choose an item from your inbox or start a new request.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SupportTickets;
