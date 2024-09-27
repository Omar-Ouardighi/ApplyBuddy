import React from "react";
import ReactMarkdown from 'react-markdown';

const JobFitAnalysis = ({ jobFitAnalysis }) => {
  return (
    <div className="container mt-4">
  <h2 className="mb-4 text-center">Job Fit Analysis</h2>
  
  <div className="card shadow-sm">
    <div className="card-body">
      <h5 className="card-title">Assessment Overview</h5>
      <p className="card-text">
        Based on the analysis of your CV and the job description, here is a summary of your job fit:
      </p>
      
      {/* Job Fit Assessment Text */}
      <div className="border rounded p-3 bg-light">
      <ReactMarkdown>
              {jobFitAnalysis}
        </ReactMarkdown>
      </div>
    </div>
  </div>
</div>
  );
};

export default JobFitAnalysis;
