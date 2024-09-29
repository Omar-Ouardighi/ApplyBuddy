from langchain_openai import ChatOpenAI
from decouple import config

class ApplyBuddy:
    def __init__(self):
        self.openai_api_key = config('OPENAI_API_KEY')
        self.model = ChatOpenAI(model='gpt-4o-mini', api_key=self.openai_api_key)

    def generate_cover_letter(self, resume: str, job_description: str) -> str:
        template = """
Using my CV and the job description you provided, could you help me draft a compelling cover letter for this position? 
Please emphasize my motivation for applying and highlight my relevant skills and qualifications, avoiding unnecessary repetition of the job listing. The goal is to present a narrative that allows the reader to clearly 
understand my suitability without directly stating alignment. 
Additionally, I would like the letter to conclude with a confident and assertive closing statement that reinforces my readiness and enthusiasm for the role.
### Job Description:
{job_description}

### Candidate CV:
{cv}
        """
        prompt_text = template.format(
            job_description=job_description,
            cv=resume
        )
        return self.model.invoke(prompt_text).content

    def job_fit_analysis(self, resume: str, job_description: str) -> str:
        template = """
You are tasked with analyzing a candidate's CV in relation to a given job description.

1. **Skills Match**: Identify the skills required in the job description. Then, evaluate whether the candidate possesses these skills based on the CV provided. List matching skills and missing skills.

2. **Experience Match**: Compare the years and type of experience required for the job with the candidate’s experience as described in their CV. Provide feedback on whether the candidate has sufficient and relevant experience.

3. **Overall Assessment**: Provide a fit score between 0 to 100, based on how well the candidate matches the required skills and experience for the role.

### Job Description:
{job_description}

### Candidate CV:
{cv}

### Output:
- **Skills Match**: (List matching and missing skills)
- **Experience Match**: (Assess experience match)
- **Overall Fit Score**: (Between 0-100)
"""
        prompt_text = template.format(
            job_description=job_description,
            cv=resume
        )
        return self.model.invoke(prompt_text).content
