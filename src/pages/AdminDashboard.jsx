import { useState, useEffect } from 'react';
import '../styles/dashboard.css';

const AdminDashboard = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    inProgress: 0,
    completed: 0
  });
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: ''
  });
  const [feedback, setFeedback] = useState('');
  const [reviewedBy, setReviewedBy] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');

  // Fetch all proposals
  useEffect(() => {
    fetchProposals();
  }, []);

  // Update stats when proposals change
  useEffect(() => {
    calculateStats();
  }, [proposals]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://project-service-server.onrender.com/api/proposals/admin/all');
      
      if (!response.ok) {
        throw new Error('Failed to fetch proposals');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProposals(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const stats = {
      total: proposals.length,
      pending: proposals.filter(p => p.status === 'pending').length,
      approved: proposals.filter(p => p.status === 'approved').length,
      rejected: proposals.filter(p => p.status === 'rejected').length,
      inProgress: proposals.filter(p => p.status === 'in-progress').length,
      completed: proposals.filter(p => p.status === 'completed').length
    };
    setStats(stats);
  };

  const filteredProposals = proposals.filter(proposal => {
    // Status filter
    if (filters.status !== 'all' && proposal.status !== filters.status) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        proposal.user.name.toLowerCase().includes(searchLower) ||
        proposal.user.email.toLowerCase().includes(searchLower) ||
        proposal.generatedProposal.title.toLowerCase().includes(searchLower) ||
        proposal.selectedTopics.some(topic => 
          topic.title.toLowerCase().includes(searchLower)
        )
      );
    }

    return true;
  }).sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));

  const handleStatusUpdate = async (proposalId, status) => {
    try {
      const response = await fetch(`https://project-service-server.onrender.com/api/proposals/admin/update/${proposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          feedback: feedback || 'No feedback provided',
          reviewedBy: reviewedBy || 'Admin'
        })
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setProposals(prev => prev.map(p => 
          p._id === proposalId ? data.data : p
        ));
        
        // Clear feedback form
        setFeedback('');
        setReviewedBy('');
        
        // Close modal if open
        if (selectedProposal && selectedProposal._id === proposalId) {
          setSelectedProposal(null);
        }

        alert(`Proposal ${status} successfully!`);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error updating proposal:', error);
      alert(`Failed to update proposal: ${error.message}`);
    }
  };

  const handleDeleteProposal = async (proposalId) => {
    if (!window.confirm('Are you sure you want to delete this proposal? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`https://project-service-server.onrender.com/api/proposals/${proposalId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setProposals(prev => prev.filter(p => p._id !== proposalId));
        alert('Proposal deleted successfully!');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
      alert(`Failed to delete proposal: ${error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b'; // amber
      case 'approved': return '#10b981'; // emerald
      case 'rejected': return '#ef4444'; // red
      case 'in-progress': return '#3b82f6'; // blue
      case 'completed': return '#8b5cf6'; // violet
      default: return '#6b7280'; // gray
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBulkAction = async (action) => {
    const selectedProposals = proposals.filter(p => 
      document.querySelector(`input[data-id="${p._id}"]`)?.checked
    );

    if (selectedProposals.length === 0) {
      alert('Please select at least one proposal');
      return;
    }

    if (action === 'delete') {
      if (!window.confirm(`Are you sure you want to delete ${selectedProposals.length} proposal(s)?`)) {
        return;
      }
    }

    try {
      const promises = selectedProposals.map(proposal => {
        if (action === 'delete') {
          return fetch(`https://project-service-server.onrender.com/api/proposals/${proposal._id}`, {
            method: 'DELETE'
          });
        } else {
          return fetch(`https://project-service-server.onrender.com/api/proposals/admin/update/${proposal._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: action,
              feedback: 'Bulk action',
              reviewedBy: 'Admin'
            })
          });
        }
      });

      await Promise.all(promises);
      await fetchProposals(); // Refresh data
      alert(`${selectedProposals.length} proposal(s) ${action === 'delete' ? 'deleted' : 'updated'} successfully!`);
    } catch (error) {
      console.error('Error performing bulk action:', error);
      alert('Failed to perform bulk action');
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading proposals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchProposals} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1 className="page-title">Admin Dashboard</h1>
          <p className="page-subtitle">
            Manage all project proposals submitted by users
          </p>
        </div>
        <button onClick={fetchProposals} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-content">
            <h3 className="stat-number">{stats.total}</h3>
            <p className="stat-label">Total Proposals</p>
          </div>
          <div className="stat-icon">📋</div>
        </div>

        <div className="stat-card pending">
          <div className="stat-content">
            <h3 className="stat-number">{stats.pending}</h3>
            <p className="stat-label">Pending Review</p>
          </div>
          <div className="stat-icon">⏳</div>
        </div>

        <div className="stat-card approved">
          <div className="stat-content">
            <h3 className="stat-number">{stats.approved}</h3>
            <p className="stat-label">Approved</p>
          </div>
          <div className="stat-icon">✅</div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-content">
            <h3 className="stat-number">{stats.inProgress}</h3>
            <p className="stat-label">In Progress</p>
          </div>
          <div className="stat-icon">🚀</div>
        </div>

        <div className="stat-card rejected">
          <div className="stat-content">
            <h3 className="stat-number">{stats.rejected}</h3>
            <p className="stat-label">Rejected</p>
          </div>
          <div className="stat-icon">❌</div>
        </div>

        <div className="stat-card completed">
          <div className="stat-content">
            <h3 className="stat-number">{stats.completed}</h3>
            <p className="stat-label">Completed</p>
          </div>
          <div className="stat-icon">🏆</div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="filters-section">
        <div className="filters-left">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search proposals..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filters-right">
          <div className="bulk-actions">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bulk-select"
            >
              <option value="pending">Mark as Pending</option>
              <option value="approved">Mark as Approved</option>
              <option value="rejected">Mark as Rejected</option>
              <option value="in-progress">Mark as In Progress</option>
              <option value="completed">Mark as Completed</option>
              <option value="delete">Delete Selected</option>
            </select>
            <button
              onClick={() => handleBulkAction(selectedStatus)}
              className="bulk-action-btn"
            >
              Apply to Selected
            </button>
          </div>
        </div>
      </div>

      {/* Proposals Table */}
      <div className="proposals-table-container">
        {filteredProposals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>No proposals found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <table className="proposals-table">
            <thead>
              <tr>
                <th className="select-col">
                  <input type="checkbox" className="select-all" />
                </th>
                <th>ID</th>
                <th>User</th>
                <th>Proposal Title</th>
                <th>Topics</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal) => (
                <tr key={proposal._id}>
                  <td className="select-col">
                    <input 
                      type="checkbox" 
                      data-id={proposal._id}
                      className="proposal-select"
                    />
                  </td>
                  <td className="proposal-id">
                    #{proposal._id.slice(-6)}
                  </td>
                  <td className="user-cell">
                    <div className="user-info">
                      <div className="user-name">{proposal.user.name}</div>
                      <div className="user-email">{proposal.user.email}</div>
                      {proposal.user.studentId && (
                        <div className="student-id">ID: {proposal.user.studentId}</div>
                      )}
                    </div>
                  </td>
                  <td className="proposal-title">
                    {proposal.generatedProposal.title}
                    <div className="proposal-meta">
                      <span className="meta-item">
                        📅 {formatDate(proposal.submissionDate)}
                      </span>
                    </div>
                  </td>
                  <td className="topics-cell">
                    <div className="topics-list">
                      {proposal.selectedTopics.map((topic, index) => (
                        <span key={index} className="topic-chip">
                          {topic.category}: {topic.title.substring(0, 20)}...
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="status-cell">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(proposal.status) }}
                    >
                      {proposal.status}
                    </span>
                  </td>
                  <td className="date-cell">
                    {formatDate(proposal.submissionDate)}
                  </td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        className="action-btn view-btn"
                        onClick={() => setSelectedProposal(proposal)}
                        title="View Details"
                      >
                        👁️
                      </button>
                      <button
                        className="action-btn approve-btn"
                        onClick={() => handleStatusUpdate(proposal._id, 'approved')}
                        title="Approve"
                      >
                        ✅
                      </button>
                      <button
                        className="action-btn reject-btn"
                        onClick={() => handleStatusUpdate(proposal._id, 'rejected')}
                        title="Reject"
                      >
                        ❌
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteProposal(proposal._id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Proposal Detail Modal */}
      {selectedProposal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Proposal Details</h2>
              <button 
                className="close-modal"
                onClick={() => setSelectedProposal(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* User Info Section */}
              <div className="detail-section">
                <h3>👤 User Information</h3>
                <div className="user-details-grid">
                  <div className="detail-item">
                    <label>Name</label>
                    <p>{selectedProposal.user.name}</p>
                  </div>
                  <div className="detail-item">
                    <label>Email</label>
                    <p>{selectedProposal.user.email}</p>
                  </div>
                  <div className="detail-item">
                    <label>Student ID</label>
                    <p>{selectedProposal.user.studentId || 'N/A'}</p>
                  </div>
                  <div className="detail-item">
                    <label>Department</label>
                    <p>{selectedProposal.user.department || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Selected Topics Section */}
              <div className="detail-section">
                <h3>🎯 Selected Topics (3)</h3>
                <div className="topics-grid">
                  {selectedProposal.selectedTopics.map((topic, index) => (
                    <div key={index} className="topic-detail-card">
                      <div className="topic-number">#{index + 1}</div>
                      <h4>{topic.title}</h4>
                      <div className="topic-meta">
                        <span className="category">{topic.category}</span>
                        <span className="difficulty">{topic.difficulty}</span>
                      </div>
                      <p className="topic-description">{topic.description}</p>
                      <div className="topic-technologies">
                        {topic.technologies?.map((tech, i) => (
                          <span key={i} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generated Proposal Section */}
              <div className="detail-section">
                <h3>📝 Generated Proposal</h3>
                <div className="proposal-details">
                  <div className="proposal-field">
                    <label>Title</label>
                    <p>{selectedProposal.generatedProposal.title}</p>
                  </div>
                  <div className="proposal-field">
                    <label>Description</label>
                    <p>{selectedProposal.generatedProposal.description}</p>
                  </div>
                  <div className="proposal-field">
                    <label>Objectives</label>
                    <ul>
                      {selectedProposal.generatedProposal.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="details-grid">
                    <div className="grid-item">
                      <label>Methodology</label>
                      <p>{selectedProposal.generatedProposal.methodology}</p>
                    </div>
                    <div className="grid-item">
                      <label>Timeline</label>
                      <p>{selectedProposal.generatedProposal.timeline}</p>
                    </div>
                    <div className="grid-item">
                      <label>Budget Estimate</label>
                      <p>{selectedProposal.generatedProposal.budgetEstimate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Feedback Section */}
              <div className="detail-section">
                <h3>💬 Admin Feedback</h3>
                {selectedProposal.adminFeedback ? (
                  <div className="feedback-display">
                    <div className="feedback-header">
                      <strong>Reviewed by:</strong> {selectedProposal.adminFeedback.reviewedBy}
                      <span className="feedback-date">
                        on {formatDate(selectedProposal.adminFeedback.reviewedAt)}
                      </span>
                    </div>
                    <div className="feedback-content">
                      {selectedProposal.adminFeedback.feedback}
                    </div>
                  </div>
                ) : (
                  <div className="no-feedback">
                    No feedback provided yet
                  </div>
                )}

                <div className="feedback-form">
                  <h4>Update Status & Add Feedback</h4>
                  <div className="form-group">
                    <label htmlFor="reviewedBy">Your Name</label>
                    <input
                      type="text"
                      id="reviewedBy"
                      value={reviewedBy}
                      onChange={(e) => setReviewedBy(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="feedback">Feedback</label>
                    <textarea
                      id="feedback"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide feedback to the user..."
                      rows="4"
                    />
                  </div>
                  <div className="status-actions">
                    <button
                      className="status-btn approve-btn"
                      onClick={() => handleStatusUpdate(selectedProposal._id, 'approved')}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="status-btn reject-btn"
                      onClick={() => handleStatusUpdate(selectedProposal._id, 'rejected')}
                    >
                      ❌ Reject
                    </button>
                    <button
                      className="status-btn progress-btn"
                      onClick={() => handleStatusUpdate(selectedProposal._id, 'in-progress')}
                    >
                      🚀 Mark In Progress
                    </button>
                    <button
                      className="status-btn complete-btn"
                      onClick={() => handleStatusUpdate(selectedProposal._id, 'completed')}
                    >
                      🏆 Mark Completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;