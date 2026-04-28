import React, { useState, useEffect } from 'react';
import './PurchaseHistory.css';
import Loader from '../components/Loader';

const PurchaseHistory = () => {
  // Temporary mock data since there is no API provided yet.
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const storedToken = localStorage.getItem('token');
    
    setTimeout(() => {
      if (!storedToken) {
        setHistory([]);
      } else {
        // Mock data to show design
        setHistory([
          {
            id: 'TXN-84729102',
            date: '2026-04-03',
            courseTitle: 'Data Science & AI',
            category: 'Technology',
            amount: 500,
            status: 'completed'
          },
          {
            id: 'TXN-93810294',
            date: '2026-03-25',
            courseTitle: 'Industrial Automation',
            category: 'Engineering',
            amount: 850,
            status: 'completed'
          }
        ]);
      }
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="dashboard-page-wrapper">
      <div className="purchase-history-container">
        <div className="dashboard-header">
          <h1>Purchase History</h1>
          <p>Review your past transactions and course enrollments.</p>
        </div>

        <div className="history-card">
          {loading ? (
             <Loader fullPage={false} text="Loading transactions..." />
          ) : history.length === 0 ? (
            <div className="history-empty-state">
              <div className="history-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                  <line x1="2" y1="10" x2="22" y2="10"></line>
                </svg>
              </div>
              <h3>No Transactions Found</h3>
              <p>You haven't made any purchases yet.</p>
            </div>
          ) : (
            <div className="history-table-wrapper">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx) => (
                    <tr key={tx.id}>
                      <td style={{ fontWeight: 600, color: '#334155' }}>{tx.id}</td>
                      <td>{tx.date}</td>
                      <td>
                        <div className="course-cell">
                          <div className="course-thumb-mini"></div>
                          <div>
                            <h4 className="course-title-mini">{tx.courseTitle}</h4>
                            <div className="course-category-mini">{tx.category}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ fontWeight: 700, color: '#111FA2' }}>₹{tx.amount}</td>
                      <td>
                        <span className={`status-badge ${tx.status}`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
