// ProposalPage.jsx
import '../styles/topics.css';
import "../styles/proposal.css"
import { useState, useEffect, useRef } from 'react';

export default function ProposalPage() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const printRef = useRef();

  // Load selected topics and user info from localStorage
  useEffect(() => {
    // Load selected topics
    const savedTopics = localStorage.getItem('selectedTopics');
    if (savedTopics) {
      try {
        const parsedTopics = JSON.parse(savedTopics);
        setSelectedTopics(parsedTopics);
      } catch (error) {
        console.error('Error parsing saved topics:', error);
        localStorage.removeItem('selectedTopics');
      }
    }

    // Get user info from localStorage
    const getUserInfo = () => {
      // Try to get from localStorage - you can adjust this based on your auth
      const savedUser = localStorage.getItem('userData') || localStorage.getItem('studentInfo');
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch (error) {
          console.error('Error parsing user info:', error);
        }
      }
      
      // Default mock data
      return {
        name: 'John Doe',
        studentId: 'STU001',
        department: 'Computer Science',
        semester: '8th Semester',
        email: 'john.doe@university.edu',
        phone: '+1234567890'
      };
    };

    setUserInfo(getUserInfo());
  }, []);

  const handleRemoveFromWishlist = (topicId) => {
    const updatedTopics = selectedTopics.filter(topic => topic._id !== topicId);
    setSelectedTopics(updatedTopics);
    if (updatedTopics.length > 0) {
      localStorage.setItem('selectedTopics', JSON.stringify(updatedTopics));
    } else {
      localStorage.removeItem('selectedTopics');
    }
    setShowPrintView(false);
  };

  const handleClearWishlist = () => {
    setSelectedTopics([]);
    localStorage.removeItem('selectedTopics');
    setShowPrintView(false);
  };

  const handleGenerateProposal = () => {
    if (selectedTopics.length === 0) {
      alert('Please select at least one topic to generate a proposal');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setShowPrintView(true);
      setIsGenerating(false);
    }, 500);
  };

  const handlePrintProposal = () => {
    if (!printRef.current) return;
    
    // Store current scroll position
    const scrollPosition = window.pageYOffset;
    
    // Clone the printable content
    const printContent = printRef.current.cloneNode(true);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Project Proposal - ${userInfo?.name || 'Student'}</title>
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              margin: 0;
              padding: 0;
              color: #000;
              line-height: 1.6;
            }
            .printable-proposal {
              padding: 1in;
            }
            .proposal-title {
              text-align: center;
              margin-bottom: 40px;
            }
            .proposal-title h1 {
              font-size: 15px;
              font-weight: bold;
              text-decoration: underline;
              margin: 0 0 10px 0;
            }
            .proposal-title p {
              font-size: 10px;
              margin: 5px 0;
              color: #333;
            }
            .student-info h2 {
              font-size: 8px;
              border-bottom: 2px solid #000;
              padding-bottom: 5px;
              margin: 0 0 15px 0;
            }
            .info-table {
              width: 100%;
              border-collapse: collapse;
            }
            .info-table td {
              padding: 6px 0;
              vertical-align: top;
              width: 25%;
            }
            .info-table strong {
              font-weight: bold;
            }
            .topics-section {
              margin-bottom: 10px;
            }
            .topics-section h2 {
              font-size: 10px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 5px;
              margin: 0 0 5px 0;
            }
            .topic-item {
              margin-bottom: 20px;
              padding: 10px;
              background: #f9f9f9;
              border-left: 4px solid #333;
              box-sizing: border-box;
            }
            .topic-item h3 {
              font-size: 12px;
              margin: 0 0 10px 0;
              color: #000;
            }
            .topic-details p {
              margin: 5px 0;
              color: #333;
            }
            .topic-details strong {
              font-weight: bold;
              color: #000;
            }
            .signature-section {
              display: flex;
              justify-content: space-between;
              margin-top: 60px;
              padding-top: 30px;
              border-top: 2px solid #000;
            }
            .signature-block {
              text-align: center;
              width: 45%;
            }
            .signature-block p {
              margin: 10px 0;
            }
            .signature-block strong {
              font-weight: bold;
            }
            @page {
              margin: 1in;
            }
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .printable-proposal {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
  };

  const handleSubmitToAdmin = () => {
    // For now, just show a message
    alert('Submit feature will be implemented with admin dashboard');
    
    // Clear selection after "submitting"
    handleClearWishlist();
    setShowPrintView(false);
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  console.log(userInfo)

  // Printable Proposal Component
  const PrintableProposal = () => (
    <div className="printable-proposal" ref={printRef}>
      <div className="proposal-title">
        <h1><u>PROJECT PROPOSAL</u></h1>
        <p>For Final Year Project Submission</p>
      </div>

      <div className="student-info">
        <h2>STUDENT INFORMATION</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td><strong>Full Name:</strong></td>
              <td>{userInfo?.fullName   || 'Student Name'}</td>
              <td><strong>Registration Number:</strong></td>
              <td>{userInfo?.studentId || 'STU001'}</td>
            </tr>
            <tr>
              <td><strong>Department:</strong></td>
              <td>{userInfo?.department || 'Computer Science'}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td colSpan="3">{userInfo?.email || 'student@university.edu'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="topics-section">
        <h2 style={{fontSize:"12px"}}>PROPOSED PROJECT TOPICS</h2>
        
        <div className="topics-list">
          {selectedTopics.map((topic, index) => (
            <div key={topic._id} className="topic-item">
              <h3>{index + 1}. {topic.title}</h3>
              <div className="topic-details">
                <p><strong>Description:</strong> {topic.description}</p>
                <p><strong>Technologies:</strong> {topic.technologies?.join(', ') || 'Not specified'}</p>
              </div>  
            </div>
          ))}
        </div>
      </div>

      <div className="signature-section">
        <div className="signature-block">
          <p>_________________________</p>
          <p><strong>Student's Signature</strong></p>
          <p>Date: {formatDate()}</p>
        </div>
        
        <div className="signature-block">
          <p>_________________________</p>
          <p><strong>Supervisor's Signature</strong></p>
          <p>Date: _______________</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="main-wishlist-cart-container">
      <div className="proposal-page-header">
        <h1>Project Proposal</h1>
        <p>
          {selectedTopics.length > 0 
            ? `You have selected ${selectedTopics.length} topic${selectedTopics.length !== 1 ? 's' : ''}`
            : 'No topics selected yet'}
        </p>
      </div>

      <div className="proposal-layout">
        {/* Left Column: Selected Topics */}
        <div className="proposal-left-column">
          <div className="wishlist-card">
            <div className="wishlist-header">
              <h3 className="wishlist-title">Selected Topics</h3>
              <p className="wishlist-subtitle">
                {selectedTopics.length} topic{selectedTopics.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            <div className="wishlist-content">
              {selectedTopics.length === 0 ? (
                <div className="empty-wishlist">
                  <div className="empty-icon">📝</div>
                  <p>No topics selected</p>
                  <span>Browse and add project topics from the Topics page</span>
                  <a href="/topics" className="browse-link">
                    🔍 Browse Topics
                  </a>
                </div>
              ) : (
                <>
                  <div className="selected-topics">
                    {selectedTopics.map((topic, index) => (
                      <div key={topic._id} className="selected-topic">
                        <div className="topic-number">{index + 1}</div>
                        <div className="selected-topic-content">
                          <h4 className="selected-topic-title">{topic.title}</h4>
                          <div className="selected-topic-meta">
                            <span className="topic-category">{topic.category}</span>
                            <span className="topic-difficulty">{topic.difficulty}</span>
                          </div>
                          <p className="topic-description">
                            {topic.description.length > 100 
                              ? `${topic.description.substring(0, 100)}...` 
                              : topic.description}
                          </p>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={() => handleRemoveFromWishlist(topic._id)}
                          title="Remove topic"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="wishlist-actions">
                    <button className="clear-btn" onClick={handleClearWishlist}>
                      Clear All Topics
                    </button>
                    <button 
                      className="generate-btn"
                      onClick={handleGenerateProposal}
                      disabled={selectedTopics.length === 0 || isGenerating}
                    >
                      {isGenerating ? 'Generating...' : '📄 Generate Proposal'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Proposal Preview/Print */}
        <div className="proposal-right-column">
          {showPrintView ? (
            <div className="proposal-preview-container">
              <div className="preview-controls">
                <h3>Proposal Preview</h3>
                <div className="control-buttons">
                  <button 
                    className="back-btn"
                    onClick={() => setShowPrintView(false)}
                  >
                    ← Back to Edit
                  </button>
                  <button 
                    className="print-btn"
                    onClick={handlePrintProposal}
                  >
                    🖨️ Print Proposal
                  </button>
                  <button 
                    className="submit-btn"
                    onClick={handleSubmitToAdmin}
                  >
                    📤 Submit to Admin
                  </button>
                </div>
              </div>
              
              <div className="preview-warning">
                <p>⚠️ This is a preview. Use "Print Proposal" to generate a printable version.</p>
              </div>
              
              <div className="preview-content">
                <PrintableProposal />
              </div>
              
              <div className="preview-actions">
                <button 
                  className="print-btn-large"
                  onClick={handlePrintProposal}
                  style={{marginBottom: '100px'}}
                >
                  🖨️ PRINT PROPOSAL
                </button>
                <p className="print-note">
                  After printing, submit the physical copy to your supervisor/department.
                </p>
              </div>
            </div>
          ) : (
            <div className="proposal-instructions">
              <div className="instructions-icon">📋</div>
              <h3>Generate Your Project Proposal</h3>
              <p>Create a formal proposal document for your selected topics</p>
              
              <div className="steps-container">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Select Topics</h4>
                    <p>Choose project topics from the Topics page</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Generate Proposal</h4>
                    <p>Click "Generate Proposal" to create your document</p>
                  </div>
                </div>
                
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Print & Submit</h4>
                    <p>Print and submit to your supervisor</p>
                  </div>
                </div>
              </div>
              
              <div className="current-status">
                <h4>Ready to Generate?</h4>
                <div className={`status-indicator ${selectedTopics.length > 0 ? 'ready' : 'not-ready'}`}>
                  {selectedTopics.length > 0 
                    ? `✅ ${selectedTopics.length} topic${selectedTopics.length !== 1 ? 's' : ''} selected`
                    : '⏳ No topics selected yet'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}