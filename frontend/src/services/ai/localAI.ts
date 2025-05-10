import natural from 'natural';
const classifier = new natural.BayesClassifier();

// Train the classifier with job-related responses
const trainClassifier = () => {
    classifier.addDocument('find job', 'jobSearch');
    classifier.addDocument('search jobs', 'jobSearch');
    classifier.addDocument('resume help', 'resume');
    classifier.addDocument('interview tips', 'interview');
    classifier.train();
};

const responses = {
    jobSearch: [
        "Here are some job search tips:",
        "• Update your profile",
        "• Use relevant keywords",
        "• Set up job alerts",
        "• Network professionally"
    ].join('\n'),
    resume: [
        "Here are some resume tips:",
        "• Keep it concise",
        "• Highlight achievements",
        "• Use action verbs",
        "• Proofread carefully"
    ].join('\n'),
    interview: [
        "Interview preparation tips:",
        "• Research the company",
        "• Prepare STAR answers",
        "• Dress professionally",
        "• Ask good questions"
    ].join('\n'),
    default: "I can help you with job searching, resume writing, and interview preparation. What would you like to know?"
};

export const generateLocalResponse = (message: string) => {
    const category = classifier.classify(message);
    return responses[category] || responses.default;
};