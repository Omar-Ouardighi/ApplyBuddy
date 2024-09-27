import React, { useState } from "react";
import jsPDF from "jspdf";

const CoverLetter = ({ coverLetter }) => {
  const [editedCoverLetter, setEditedCoverLetter] = useState(coverLetter);

  const handleCoverLetterChange = (e) => {
    setEditedCoverLetter(e.target.value);
  };

  // Function to generate the PDF
  const handleDownloadAsPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(11);
    doc.setFont("arial", "normal");
    
    // Split text into lines that fit the page width
    const lines = doc.splitTextToSize(editedCoverLetter, 180);
    
    // Add the lines to the PDF
    doc.text(lines, 10, 10);
    
    // Save the PDF
    doc.save("cover_letter.pdf");
  };

  return (
    <div className="container mt-4">
  <h2 className="mb-4 text-center">Generated Cover Letter</h2>
  
  <div className="card shadow-sm p-4">
    <div className="mb-4">
      <label className="form-label fw-bold">Edit Cover Letter</label>
      <textarea
        className="form-control"
        rows={30}
        value={editedCoverLetter}
        onChange={handleCoverLetterChange}
        placeholder="Make any necessary changes to your cover letter here..."
      />
    </div>

    <div className="d-grid">
          <button className="btn btn-primary mb-2" onClick={handleDownloadAsPDF}>
            Download as PDF
          </button>
    </div>
  </div>
</div>

  );
};

export default CoverLetter;
