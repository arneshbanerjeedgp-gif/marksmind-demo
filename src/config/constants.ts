export interface OptionProps {
    value: string;
    label: string;
    sublabel?: string;
}

export interface QuestionProps {
    id: string;
    field: string;
    title: string;
    subtitle: string;
    type: 'grid' | 'list';
    gridColumns?: 2 | 3;
    options: OptionProps[];
}

export const ONBOARDING_QUESTIONS: QuestionProps[] = [
    {
        id: '1',
        field: 'class_level',
        title: 'Which class are you in?',
        subtitle: "We'll tailor your experience to your syllabus.",
        type: 'grid',
        gridColumns: 3,
        options: [
            { value: 'Class 8', label: 'Class 8' },
            { value: 'Class 9', label: 'Class 9' },
            { value: 'Class 10', label: 'Class 10' },
            { value: 'Class 11', label: 'Class 11' },
            { value: 'Class 12', label: 'Class 12' },
        ]
    },
    {
        id: '3',
        field: 'code_mix_lang',
        title: 'Answer Language',
        subtitle: 'What language do you mix when writing answers?',
        type: 'list',
        options: [
            { value: 'English Only', label: 'English Only', sublabel: 'Standard school English' },
            { value: 'English + Bengali', label: 'English + Bengali', sublabel: 'I mix Bangla when I write' },
            { value: 'English + Hindi', label: 'English + Hindi', sublabel: 'Hinglish style answers' },
        ]
    },
    {
        id: '4',
        field: 'tuition_type',
        title: 'How do you study?',
        subtitle: 'This helps us calibrate our recommendations.',
        type: 'grid',
        gridColumns: 2,
        options: [
            { value: 'School Only', label: 'School Only' },
            { value: 'Local Tutor', label: 'Local Tutor' },
            { value: 'Coaching + School', label: 'Coaching + School' },
            { value: 'No Classes', label: 'No Classes' },
        ]
    },
    {
        id: '5',
        field: 'acquisition_channel',
        title: 'How did you find us?',
        subtitle: 'Helps us improve how we reach students.',
        type: 'grid',
        gridColumns: 3,
        options: [
            { value: 'Google', label: 'Google' },
            { value: 'YouTube', label: 'YouTube' },
            { value: 'Friend', label: 'Friend' },
            { value: 'X', label: 'X (Twitter)' },
            { value: 'Other', label: 'Other' },
        ]
    },
    {
        id: '6',
        field: 'exam_timeline',
        title: "When's your next big exam?",
        subtitle: "We'll adjust urgency accordingly.",
        type: 'list',
        options: [
            { value: 'Tomorrow', label: 'Tomorrow', sublabel: 'Heads down today' },
            { value: 'This Week', label: 'This Week', sublabel: 'Within 7 days' },
            { value: 'Next Week', label: 'Next Week', sublabel: 'About a week out' },
            { value: 'Later / Not Sure', label: 'Later / Not Sure', sublabel: 'Just studying for now' },
        ]
    },
    {
        id: '7',
        field: 'weak_subject',
        title: 'Which subject needs the most work?',
        subtitle: "We'll start your diagnostic here.",
        type: 'grid',
        gridColumns: 2,
        options: [
            { value: 'English', label: 'English' },
            { value: 'Maths', label: 'Maths' },
            { value: 'Science', label: 'Science' },
            { value: 'Social Science', label: 'Social Science' },
            { value: 'Chemistry', label: 'Chemistry' },
        ]
    },
    {
        id: '8',
        field: 'target_score',
        title: "What's your target score?",
        subtitle: "Be ambitious — we'll build your path there.",
        type: 'grid',
        gridColumns: 2,
        options: [
            { value: '70%', label: '70%' },
            { value: '80%', label: '80%' },
            { value: '90%', label: '90%' },
            { value: 'Above 95%', label: 'Above 95%' },
        ]
    }
];

export const DIAGNOSTIC_PROMPTS: Record<string, string> = {
    'Science': 'Explain the process of Photosynthesis.',
    'Maths': 'Explain the Pythagorean theorem and its applications.',
    'English': "Discuss the main themes in Robert Frost's poetry.",
    'Social Science': 'Discuss the causes and effects of the French Revolution.',
    'Chemistry': 'What is fractional distillation?'
};
