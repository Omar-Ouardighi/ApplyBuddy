# Lazy-Apply-AI

Lazy Apply AI is a full-stack web application designed to simplify the job application process. The app allows users to upload their resumes (CV) and job descriptions, then generates tailored cover letters or performs a job fit analysis based on the user's profile.

## Features

- **Cover Letter Generation**: Automatically generates a tailored cover letter based on the job description and resume.
- **Job Fit Analysis**: Provides an assessment of how well your CV matches the job description.

## Tech Stack

- **Frontend**: React, Bootstrap 5
- **Backend**: FastAPI, Python 3.12
- **Containerization**: Docker

## Installation
### Using Docker

To run both the backend and frontend with Docker, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/lazy-apply-ai.git
    cd lazy-apply-ai
    ```
2. Build the Docker images:
    ```bash
    docker-compose build
    ```

3. Run the containers:
    ```bash
    docker-compose up
    ```
    Open your browser and go to:
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend: [http://localhost:8000](http://localhost:8000)

4. To stop the containers:
    ```bash
    docker-compose down
    ```

## Usage

1. **Upload CV**: Upload your resume in PDF format.
2. **Paste Job Description**: Paste the job description to either generate a cover letter or perform job fit analysis.
3. **Choose Action**:
    - Generate a customized cover letter.
    - Get a job fit analysis to determine how well you match the job.
4. **Download Cover Letter**: Once generated, you can modify or download your cover letter in PDF.