import dedent from "dedent";

export default {
  IDEA: dedent`
    As a coaching teacher:
    - The user wants to learn a topic.
    - Generate 5–7 short course title ideas based on the topic.
    - Ensure titles are relevant to the input.
    - Return a JSON array of strings.
    - Do not include any explanation or extra text.
  `,

  COURSE: dedent`
    You are a course content generator.

    Based on the following list of topics, generate one complete course.

    The course should include:
    - Course Title (string)
    - Course Description (4–5 lines)
    - A random Course Banner Image from:
      ['/banner1.png','/banner2.png','/banner3.png','/banner4.png','/banner5.png','/banner6.png']
    - A category from one of these: ["Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity"]

    The course should contain 5–8 chapters. Each chapter must have:
    - Chapter Title
    - A list of 2–4 topics:
      - Each topic should have:
        - Title
        - Explanation (5–8 lines)
        - Optional code sample (or null)
        - Optional example (or null)

    Also generate:
    - 10 quizzes with: question, options [a, b, c, d], correctAns
    - 10 flashcards with: front, back
    - 10 Q&A pairs with: question, answer

    Return the output as **valid JSON only** in this structure:

    {
      "courseTitle": "Intro to Python",
      "description": "Learn Python from scratch...",
      "banner_image": "/banner3.png",
      "category": "Tech & Coding",
      "chapters": [
        {
          "chapterTitle": "Variables and Data Types",
          "content": [
            {
              "topic": "Creating Variables",
              "explanation": "Variables store data in memory...",
              "code": "x = 5",
              "example": "x = 5 stores the value 5 in x"
            }
          ]
        }
      ],
      "quiz": [...],
      "flashcards": [...],
      "qa": [...]
    }

    Do not add markdown, backticks, or extra explanation. Just return valid JSON.
  `
};




