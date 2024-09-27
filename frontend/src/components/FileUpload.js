import React, { useState } from "react";
import axios from "axios";
import {PacmanLoader} from "react-spinners";

const FileUpload = ({ setCoverLetter, setJobFitAnalysis }) => {
  const [cvFile, setCvFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showOptions, setShowOptions] = useState(false); // To display choice buttons
  const [loading, setLoading] = useState(false);

  const handleCvChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleJobDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cvFile && jobDescription) {
      setShowOptions(true); // Show options after successful upload
    } else {
      alert("Please upload CV and paste the job description.");
    }
  };

  const handleCoverLetterGeneration = async () => {
    const formData = new FormData();
    formData.append("cv_pdf", cvFile);
    formData.append("job_description", jobDescription);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/generate-cover-letter",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCoverLetter(response.data.cover_letter);
      setJobFitAnalysis("");
      setShowOptions(false); // Hide options after action
    } catch (error) {
      alert("Error generating cover letter:", error);
    } finally {
      setLoading(false);
    }   
  };

  const handleJobFitAnalysis = async () => {
    const formData = new FormData();
    formData.append("cv_pdf", cvFile);
    formData.append("job_description", jobDescription);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/job-fit-analysis/",
        formData,
        {
            headers: {
              "Content-Type": "multipart/form-data",
            },
        }
      );
      setJobFitAnalysis(response.data.job_fit_analysis);
      setCoverLetter("");
      setShowOptions(false); // Hide options after action
    } catch (error) {
      alert("Error performing job fit analysis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-3 ">
    <div className="card shadow-sm">
    
    <div className="card-body">
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="cvUpload" className="form-label fw-bold">
            Upload CV (PDF only)
          </label>
          <input
            className="form-control"
            type="file"
            id="cvUpload"
            accept=".pdf"
            onChange={handleCvChange}
          />
          <div className="form-text">Only PDF files are allowed.</div>
        </div>

        <div className="mb-4">
          <label htmlFor="jobDescription" className="form-label fw-bold">
            Paste Job Description
          </label>
          <textarea
            className="form-control"
            id="jobDescription"
            rows="10"
            value={jobDescription}
            onChange={handleJobDescriptionChange}
            placeholder="Paste the job description here..."
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>

      {/* Display choice options after form submission */}
      {showOptions && (
        <div className="container mt-4">
            <div className="row text-center">
            <div className="col-md-6 mb-3">
                <button 
                className="btn btn-success w-100 py-2" 
                onClick={handleCoverLetterGeneration}
                disabled={loading}>
                {loading ?         
                    <PacmanLoader color="#ffffff" loading={loading} size={20} />                   
                 : (
                  "Generate Cover Letter"
                )}
                </button>
            </div>
            <div className="col-md-6 mb-3">
                <button 
                className="btn btn-info w-100 py-2" 
                onClick={handleJobFitAnalysis}
                disabled={loading}>
                    {loading ?         
                    <PacmanLoader color="#ffffff" loading={loading} size={20} />                   
                 : (
                  " Perform Job Fit Analysis"
                )}              
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
};

export default FileUpload;
