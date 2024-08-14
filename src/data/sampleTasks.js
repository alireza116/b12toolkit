// src/data/sampleTasks.json
const sampleData = [
    {
        "description": "Provide Academic Advice to Students",
        "risks": [
            {
                "description": "Risk of Providing Outdated Information",
                "actions": [
                    {
                        "description": "Implement regular updates to the AI's knowledge base."
                    },
                    {
                        "description": "Set up a monitoring system to track and flag outdated advice."
                    }
                ]
            },
            {
                "description": "Risk of Confusing or Unclear Advice",
                "actions": [
                    {
                        "description": "Analyze feedback to identify patterns of confusion and refine responses accordingly."
                    }
                ]
            }
        ]
    },
    {
        "description": "Handle Mental Health Concerns",
        "risks": [
            {
                "description": "Risk of Missing Subtle Signs of Distress",
                "actions": [
                    {
                        "description": "Train AI to recognize indirect language that may indicate mental health issues."
                    },
                    {
                        "description": "Set protocols for escalating potential mental health concerns to human counselors."
                    }
                ]
            },
            {
                "description": "Risk of Providing Inadequate Support",
                "actions": [
                    {
                        "description": "Include disclaimers in responses, encouraging students to seek professional help if needed."
                    },
                    {
                        "description": "Monitor responses for accuracy and appropriateness in sensitive situations."
                    }
                ]
            }
        ]
    },
    {
        "description": "Assist International Students",
        "risks": [
            {
                "description": "Risk of Culturally Insensitive Advice",
                "actions": [
                    {
                        "description": "Review AI responses for cultural sensitivity and adjust the training data accordingly."
                    },
                    {
                        "description": "Provide clear explanations when advice may not apply to international students."
                    }
                ]
            },
            {
                "description": "Risk of Misinterpreting Legal or Visa Requirements",
                "actions": [
                    {
                        "description": "Include links to official resources and encourage verification of advice."
                    }
                ]
            }
        ]
    }
]


export default sampleData