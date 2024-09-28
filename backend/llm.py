from langchain_openai import ChatOpenAI
from langchain_core.messages import BaseMessage
from decouple import config

openai_api_key = config('OPENAI_API_KEY')

def generate_cover_letter(resume: str, job_description: str) -> str:
    model = ChatOpenAI(model='gpt-4o-mini', api_key=openai_api_key)
    template = """
Using my CV and the job description you provided, could you help me draft a compelling cover letter for this position in the same language as the job description? 
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

    return model.invoke(prompt_text).content


def job_fit_analysis(resume: str, job_description: str) -> str:
    model = ChatOpenAI(model='gpt-4o-mini', api_key=openai_api_key)
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
    return model.invoke(prompt_text).content

