import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export interface ResumeParserResult {
    skills: string[];
    experience: string[];
    education: string[];
    jobMatchScore: number;
    recommendations: string[];
}

export class ResumeParserService {
    async parseResume(resumeText: string, jobDescription: string): Promise<ResumeParserResult> {
        const prompt = `
        Analyze this resume and job description for compatibility:
        
        Resume: ${resumeText}
        
        Job Description: ${jobDescription}
        
        Provide a structured analysis with:
        1. Key skills extracted
        2. Relevant experience
        3. Education details
        4. Job match score (0-100)
        5. Recommendations for improvement`;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4",
        });

        // Parse the AI response
        const analysis = completion.choices[0].message.content;
        
        // Return structured data
        return {
            skills: extractSkills(analysis),
            experience: extractExperience(analysis),
            education: extractEducation(analysis),
            jobMatchScore: calculateMatchScore(analysis),
            recommendations: extractRecommendations(analysis)
        };
    }
}