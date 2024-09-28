import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import CoverLetter from "./components/CoverLetter";
import JobFitAnalysis from "./components/JobFitAnalysis";


const App = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [jobFitAnalysis, setjobFitAnalysis] = useState("");

  return (
    <div>
      <nav className="navbar navbar-dark ">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto d-flex align-items-center" href="/">
            <i className="bi bi-robot me-2" style={{ fontSize: '4rem' }}></i> 
            <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>Apply Buddy
            </span>
          </a>
        </div>
      </nav>
       <FileUpload setCoverLetter={setCoverLetter} setJobFitAnalysis={setjobFitAnalysis} />

      {coverLetter && <CoverLetter coverLetter={coverLetter} />}
      {jobFitAnalysis && <JobFitAnalysis jobFitAnalysis={jobFitAnalysis} />} 
    </div>
  );
};

export default App;
